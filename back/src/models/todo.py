from datetime import datetime

from sqlalchemy import Boolean, DateTime, Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql.expression import text
from sqlalchemy.types import TIMESTAMP

from app.database import Base

from models.tag import TagModel
from models.todo_tag import TodoTagModel
from models.user import UserModel


class TodoModel(Base):
    __tablename__ = "todo"

    todo_id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True) # 主キー
    title: Mapped[str] = mapped_column(String(256), nullable=False)             # タイトル
    completed: Mapped[bool] = mapped_column(                                    # フラグ
        Boolean, nullable=False, default=False, server_default="False"
    )
    deleted: Mapped[bool] = mapped_column(                                      # 論理削除
        Boolean, nullable=False, default=False, server_default="False"
    )
    user_email: Mapped[str] = mapped_column(                                    # user情報
        String(256), ForeignKey('user.email'), nullable=False
    )
    user: Mapped["UserModel"] = relationship(
        UserModel, back_populates="todos"
    )
    tags: Mapped[list["TagModel"]] = relationship(
        TagModel, secondary=TodoTagModel.__tablename__, back_populates="todos"
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
