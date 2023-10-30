from datetime import datetime

from sqlalchemy import Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql.expression import text
from sqlalchemy.types import TIMESTAMP

from app.database import Base
from models.todo_tag import TodoTagModel
from models.user import UserModel

class TagModel(Base):
    __tablename__ = "tag"

    tag_id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(32), nullable=False, unique=True)
    user_id: Mapped[str] = mapped_column(                                       # user情報
        Integer, ForeignKey('user.user_id'), nullable=False
    )
    user: Mapped["UserModel"] = relationship(
        UserModel, back_populates="tags"
    )
    deleted: Mapped[bool] = mapped_column(                                      # 論理削除
        Boolean, nullable=False, default=False, server_default="False"
    )
    todos: Mapped[list["TodoModel"]] = relationship(
        "TodoModel", secondary=TodoTagModel.__tablename__, back_populates="tags"
    )
    created_at: Mapped[datetime] = mapped_column(                               # 作成時刻
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("NOW()"),
    )
    updated_at: Mapped[datetime] = mapped_column(                               # 更新時刻
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("NOW()"),
        onupdate=text("NOW()"),
    )