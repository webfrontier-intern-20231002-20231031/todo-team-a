from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Boolean, DateTime, Integer, String
from sqlalchemy.types import TIMESTAMP
from sqlalchemy.sql.expression import text

from datetime import datetime

from app.database import Base

class UserModel(Base):
    __tablename__ = "user"

    email: Mapped[str] = mapped_column(String(256), primary_key=True, nullable=False) 
    password: Mapped[str] = mapped_column(String(256), nullable=False)
    todos: Mapped[list["TodoModel"]] = relationship("TodoModel", back_populates="user")     # 逆引きがしやすくなるよう
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("NOW()"),
    )
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("NOW()"),
        onupdate=text("NOW()"),
    )