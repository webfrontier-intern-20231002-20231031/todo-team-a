from sqlalchemy.orm import Session

from models.user import UserModel
from schemas.schema import UserSchemaBase


def create(db: Session, create_user_schema: UserSchemaBase):
    user_model = UserModel(**create_user_schema.model_dump(exclude_unset=True))
    db.add(user_model)
    db.commit()
    db.refresh(user_model)
    return user_model.user_id