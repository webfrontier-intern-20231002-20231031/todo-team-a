from datetime import datetime
from pydantic import BaseModel, ConfigDict


class TodoSchemaBase(BaseModel):
    completed: bool | None = None
    deleted: bool | None = None
    created_at: datetime | None = None
    updated_at: datetime | None = None
    model_config = ConfigDict(from_attributes=True)


class TagSchemaBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class UserSchemaBase(BaseModel):
    email: str
    password: str


class TodoTagSchema(TagSchemaBase):
    tag_id: int | None = None               # ここの値がある場合は、既にあるタグを割り振っている
    name: str | None = None             # ここの値がある場合は、新規でタグを作成する必要がある


class TagTodoSchema(TodoSchemaBase):
    todo_id: int
    title: str


class TodoSchema(TagTodoSchema):
    tags: list[TodoTagSchema] | None = []


class CreateTodoSchema(TodoSchemaBase):
    title: str
    tags: list[TodoTagSchema] | None = []


class UpdateTodoSchema(TodoSchemaBase):
    title: str | None = None
    tags: list[TodoTagSchema] | None = []


class TagSchema(TodoTagSchema):
    todos: list[TagTodoSchema] | None = []


class CreateUpdateTagSchema(TagSchemaBase):
    name: str
