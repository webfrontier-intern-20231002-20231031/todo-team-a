from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_

from app import database
from crud import user
from schemas.schema import UserSchemaBase

# ヒロセさんのモジュール
from models.user import UserModel
from pydantic import BaseModel

router = APIRouter()

@router.post("/")
def create(user_schema: UserSchemaBase, db: Session = Depends(database.get_db)):
    user_account = db.query(UserModel).filter(UserModel.email == user_schema.email).first()
    if user_account:                                                                            # 既に登録されてる場合
                # このメッセージもいわゆる"情報の与えすぎ"に該当する可能性あり
                raise HTTPException(
                    status_code=401, detail="Email already registered")
    user_id = user.create(db, user_schema)
    return user_id


@router.post("/login")
def login(user_schema: UserSchemaBase, db: Session = Depends(database.get_db)):
    user_account = db.query(UserModel).filter(UserModel.email == user_schema.email).first()
    if user_account:                                                                            # 既に登録されてる場合
        raise HTTPException(status_code=401, detail="Email already registered")                 # このメッセージもいわゆる"情報の与えすぎ"に該当する可能性あり
    user_id = user.create(db, user_schema)
    return user_id

# ヒロセさんのコード


class LoginResponse(BaseModel):
    id: int
    name : str

@router.post("/login", response_model=LoginResponse)
def read(user_schema: UserSchemaBase, db: Session = Depends(database.get_db)):
    user_account = db.query(UserModel).filter(and_(UserModel.email == user_schema.email, UserModel.password == user_schema.password)).first()

    id = user_account.user_id

    if not user_account:                                                                        # 登録されてない場合
        raise HTTPException(status_code=401, detail="Email or password is incorrect")

    return {"id": user_account.user_id, "name": user_account.user_name}
