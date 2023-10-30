from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_

from app import database
from crud import user
from schemas.schema import UserSchemaBase

# ヒロセさんのモジュール
from models.user import UserModel

router = APIRouter()

@router.post("/")
def create(user_schema: UserSchemaBase, db: Session = Depends(database.get_db)):
    user_account = db.query(UserModel).filter(UserModel.email == user_schema.email).first()
    if user_account:                                                                            # 既に登録されてる場合
        raise HTTPException(status_code=401, detail="Email already registered")
    user.create(db, user_schema)
    return

# ヒロセさんのコード
@router.post("/login")
def read(user_schema: UserSchemaBase, db: Session = Depends(database.get_db)):
    user_account = db.query(UserModel).filter(and_(UserModel.email == user_schema.email, UserModel.password == user_schema.password)).first()

    id = user_account.user_id

    if not user_account:                                                                        # 登録されてない場合
        raise HTTPException(status_code=401, detail="Email or password is incorrect")

    return {"id": id}