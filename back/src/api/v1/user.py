from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app import database
from crud import user
from schemas.schema import UserSchemaBase
from models.user import UserModel

router = APIRouter()

@router.post("/")
def create(user_schema: UserSchemaBase, db: Session = Depends(database.get_db)):
    user_account = db.query(UserModel).filter(UserModel.email == user_schema.email).first()
    if user_account:                                                                            # 既に登録されてる場合
        raise HTTPException(status_code=401, detail="Email already registered")
    user.create(db, user_schema)
    return