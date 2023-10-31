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
        raise HTTPException(status_code=401, detail="Email already registered")                 # このメッセージもいわゆる"情報の与えすぎ"に該当する可能性あり
    user_id = user.create(db, user_schema)
    return user_id


@router.post("/login")
def login(user_schema: UserSchemaBase, db: Session = Depends(database.get_db)):
    user_account = db.query(UserModel).filter(UserModel.email == user_schema.email).first()
    if not user_account:                                                                            # 既に登録されてる場合
        raise HTTPException(status_code=401, detail="Invalid JSON format")
    if user_schema.password != user_account.password:
        raise HTTPException(status_code=401, detail="Invalid JSON format")
    user_id = user.create(db, user_schema)
    return user_id