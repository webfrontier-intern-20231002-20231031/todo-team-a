"""create tables

Revision ID: b5291a0e213e
Revises: 64c2273795e0
Create Date: 2023-10-26 18:56:18.179462

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b5291a0e213e'
down_revision = '64c2273795e0'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('todo',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('title', sa.String(length=256), nullable=False),
                    sa.Column('tag', sa.Integer(), nullable=True),
                    sa.Column('completed', sa.Boolean(),
                              server_default='False', nullable=False),
                    sa.Column('deleted', sa.Boolean(),
                              server_default='False', nullable=False),
                    sa.Column('created_at', sa.TIMESTAMP(timezone=True),
                              server_default=sa.text('NOW()'), nullable=False),
                    sa.Column('updated_at', sa.TIMESTAMP(timezone=True),
                              server_default=sa.text('NOW()'), nullable=False),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_index(op.f('ix_todo_id'), 'todo', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('todo_tag')
    op.drop_index(op.f('ix_todo_todo_id'), table_name='todo')
    op.drop_table('todo')
    op.drop_index(op.f('ix_tag_tag_id'), table_name='tag')
    op.drop_table('tag')
    # ### end Alembic commands ###
