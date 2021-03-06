"""empty message

Revision ID: 19a02c2d0582
Revises: 
Create Date: 2019-11-28 00:26:11.547646

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '19a02c2d0582'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Seats',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('SeatName', sa.String(), nullable=True),
    sa.Column('is_reserved', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('Seats')
    # ### end Alembic commands ###
