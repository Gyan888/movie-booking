from app import db,ma

class Seats(db.Model):
    __tablename__ = 'Seats'

    id = db.Column(db.Integer, primary_key=True)
    SeatName = db.Column(db.String())
    is_reserved=db.Column(db.Boolean, default=False, nullable=False)

    def __repr__(self):
        return '<SeatName {}>'.format(self.SeatName)
    
    def __init__(self,SeatName):
        self.SeatName=SeatName
        

class SeatSchema(ma.Schema):
    class Meta:
        fields = ('SeatName', 'is_reserved')