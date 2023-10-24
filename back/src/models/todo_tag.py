from datetime import datetime

from sqlalchemy import Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql.expression import text
from sqlalchemy.types import TIMESTAMP

from app.database import Base


# class TodoTagModel(Base):
#     __tablename__ = "todo_tag"

#     todo_id: Mapped[int] = mapped_column(
#         Integer, ForeignKey("todo.id"), primary_key=True
#     )
#     tag_id: Mapped[int] = mapped_column(Integer, ForeignKey("tag.id"), primary_key=True)

#     created_at: Mapped[datetime] = mapped_column(
#         TIMESTAMP(timezone=True),
#         nullable=False,
#         server_default=text("DATETIME('now', 'localtime')"),
#     )

#     updated_at: Mapped[datetime] = mapped_column(
#         TIMESTAMP(timezone=True),
#         nullable=False,
#         server_default=text("DATETIME('now', 'localtime')"),
#     )

class TodoTagModel(Base):
    __tablename__ = "todo_tag"

    todo_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("todo.todo_id"), primary_key=True
    )
    tag_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("tag.tag_id"), primary_key=True
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