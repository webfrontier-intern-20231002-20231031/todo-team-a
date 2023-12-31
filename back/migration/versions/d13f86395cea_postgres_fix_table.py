"""postgres: fix table

Revision ID: d13f86395cea
Revises: 1d2f43a2d4a7
Create Date: 2023-10-31 00:05:24.588897

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd13f86395cea'
down_revision = '1d2f43a2d4a7'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=256), nullable=False),
    sa.Column('password', sa.String(length=256), nullable=False),
    sa.Column('user_name', sa.String(length=256), server_default='unknown', nullable=False),
    sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.text('NOW()'), nullable=False),
    sa.Column('updated_at', sa.TIMESTAMP(timezone=True), server_default=sa.text('NOW()'), nullable=False),
    sa.PrimaryKeyConstraint('user_id')
    )
    op.create_index(op.f('ix_user_user_id'), 'user', ['user_id'], unique=False)
    op.create_table('tag',
    sa.Column('tag_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=32), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('deleted', sa.Boolean(), server_default='False', nullable=False),
    sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.text('NOW()'), nullable=False),
    sa.Column('updated_at', sa.TIMESTAMP(timezone=True), server_default=sa.text('NOW()'), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('tag_id'),
    sa.UniqueConstraint('name')
    )
    op.create_index(op.f('ix_tag_tag_id'), 'tag', ['tag_id'], unique=False)
    op.create_table('todo',
    sa.Column('todo_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=256), nullable=False),
    sa.Column('completed', sa.Boolean(), server_default='False', nullable=False),
    sa.Column('deleted', sa.Boolean(), server_default='False', nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.text('NOW()'), nullable=False),
    sa.Column('updated_at', sa.TIMESTAMP(timezone=True), server_default=sa.text('NOW()'), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_id'], ),
    sa.PrimaryKeyConstraint('todo_id')
    )
    op.create_index(op.f('ix_todo_todo_id'), 'todo', ['todo_id'], unique=False)
    op.create_table('todo_tag',
    sa.Column('todo_id', sa.Integer(), nullable=False),
    sa.Column('tag_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.text('NOW()'), nullable=False),
    sa.Column('updated_at', sa.TIMESTAMP(timezone=True), server_default=sa.text('NOW()'), nullable=False),
    sa.ForeignKeyConstraint(['tag_id'], ['tag.tag_id'], ),
    sa.ForeignKeyConstraint(['todo_id'], ['todo.todo_id'], ),
    sa.PrimaryKeyConstraint('todo_id', 'tag_id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('todo_tag')
    op.drop_index(op.f('ix_todo_todo_id'), table_name='todo')
    op.drop_table('todo')
    op.drop_index(op.f('ix_tag_tag_id'), table_name='tag')
    op.drop_table('tag')
    op.drop_index(op.f('ix_user_user_id'), table_name='user')
    op.drop_table('user')
    # ### end Alembic commands ###
