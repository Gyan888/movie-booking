#!/usr/bin/env python

import os
from flask import Flask, render_template,jsonify,request
from flask_sqlalchemy import SQLAlchemy
from config import Config
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin
from flask_mail import Mail, Message


app = Flask(__name__,template_folder='build',static_folder='build/static')
app.config.from_object(Config)
db = SQLAlchemy(app)
mail = Mail(app)
ma = Marshmallow()
from models.seats import *


@app.route('/seats',methods=['GET'])
@cross_origin()
def getSeats():
    allSeats=Seats.query.all()    
    result=seatSchema.jsonify(allSeats)  
    return result



@app.route('/seats',methods=['PUT'])    
@cross_origin()
def updateSeats():
    data=request.json['data'];
    fields=request.json['field']
    msg = Message('Hello {}'.format(fields['name']), sender = Config.MAIL_USERNAME, recipients = [fields['email']])    
    for i in Seats.query.filter(Seats.SeatName.in_(data)).all():
        i.is_reserved=True
        db.session.add(i)
        db.session.commit()
    msg.body= 'your seat {}  booked Thanks!'.format(",".join(data))
    mail.send(msg)
    return jsonify({"status":200,"data":"success"})
    
    

@app.route("/")
def index():
    return render_template('index.html')

    


if __name__ == "__main__":    
    seatSchema=SeatSchema(many=True)    
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)

