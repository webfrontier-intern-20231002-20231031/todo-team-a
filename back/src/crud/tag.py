from sqlalchemy.orm import Session

from models.tag import TagModel
from schemas.schema import CreateUpdateTagSchema


def create(db: Session, create_update_tag_schema: CreateUpdateTagSchema) -> TagModel:
    tag_model = TagModel(**create_update_tag_schema.model_dump())
    db.add(tag_model)
    db.commit()
    db.refresh(tag_model)
    return tag_model


def get_by_id(db: Session, tag_model_id: int) -> TagModel | None:
    return db.query(TagModel).filter(TagModel.deleted == False).filter(TagModel.tag_id == tag_model_id).first()


def get_by_name(db: Session, name: str) -> TagModel | None:
    # 一度論理削除された同じnameのtagも、これで再作成できるようになる
    # 同じnameであるなら、[true -> false]に変更の方がいいかもしれない
    return db.query(TagModel).filter(TagModel.deleted == False).filter(TagModel.name == name).first()


def get(db: Session, skip: int = 0, limit: int = 100) -> list[TagModel]:
    return db.query(TagModel).filter(TagModel.deleted == False).offset(skip).limit(limit).all()


def update(db: Session, tag_model_id: int, create_update_tag_schema: CreateUpdateTagSchema) -> TagModel:
    tag_model = db.query(TagModel).filter(TagModel.id == tag_model_id).first()
    create_update_tag_schema_obj = create_update_tag_schema.model_dump(exclude_unset=True)
    for key, value in create_update_tag_schema_obj.items():
        setattr(tag_model, key, value)
    db.add(tag_model)
    db.commit()
    db.refresh(tag_model)
    return tag_model


def delete(db: Session, tag_model_id: int) -> int | None:
    tag_model = db.query(TagModel).get(tag_model_id)
    if tag_model is None:
        return None
    tag_model.deleted = True
    db.commit()
    return tag_model_id
