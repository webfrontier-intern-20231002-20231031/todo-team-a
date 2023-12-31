from sqlalchemy.orm import Session

from models.tag import TagModel
from models.todo import TodoModel
from schemas.schema import CreateTodoSchema, UpdateTodoSchema

from .tag import get_by_id as get_tag_by_id, get_by_name


def create(db: Session, create_todo_schema: CreateTodoSchema):
    todo_model = TodoModel(**create_todo_schema.model_dump(exclude_unset=True))
    db.add(todo_model)
    db.commit()
    db.refresh(todo_model)
    return todo_model


def get_by_id(db: Session, todo_id: int) -> TodoModel | None:
    return db.query(TodoModel).filter(TodoModel.deleted == False).filter(TodoModel.todo_id == todo_id).first()


def get(db: Session, skip: int = 0, limit: int = 100) -> list[TodoModel]:
    # deletednがFalseのものだけ取得する
    return db.query(TodoModel).filter(TodoModel.deleted == False).offset(skip).limit(limit).all()


def update(
    db: Session, todo_model_id: int, update_todo_schema: UpdateTodoSchema
) -> TodoModel | None:
    todo_model = db.query(TodoModel).filter(TodoModel.todo_id == todo_model_id).first() # todoに紐づいているtagを抜き出し、あとで比較するために保持する
    if todo_model is None:
        return todo_model
    update_todo_schema_obj = update_todo_schema.model_dump(exclude_unset=True)
    update_tags = []
    for key, value in update_todo_schema_obj.items():
        if key == "tags":
            for tag in value:
                if "tag_id" in tag:
                    tag_model = get_tag_by_id(db, tag["tag_id"])
                    update_tags.append(tag_model)
                    print("request : ", tag)
                elif "name" in tag:
                    tag_model = get_by_name(db, tag["name"])
                    if tag_model is None:                                               # 同じtagが登録されていなかった場合
                        tag_model = TagModel(**tag)
                        update_tags.append(tag_model)
        else:
            setattr(todo_model, key, value)

    print("update_tags : ", set(update_tags))
    print("todo_model.tag : ", set(todo_model.tags))
    for new_tag in list(set(update_tags) - set(todo_model.tags)):
        todo_model.tags.append(new_tag)
    for remove_tag in list(set(todo_model.tags) - set(update_tags)):                    # 既に中間テーブルで登録されているtagの
        todo_model.tags.remove(remove_tag)

    db.add(todo_model)
    db.commit()
    db.refresh(todo_model)
    return todo_model


def delete(db: Session, todo_model_id: int) -> int | None:
    todo_model = db.query(TodoModel).get(todo_model_id)
    if todo_model is None:
        return None
    todo_model.deleted = True
    db.commit()
    return todo_model_id
