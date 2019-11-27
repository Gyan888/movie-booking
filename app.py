#!/usr/bin/env python

import os
from flask import Flask, render_template,jsonify
from flask_sqlalchemy import SQLAlchemy
from config import Config
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin



app = Flask(__name__,template_folder='build',static_folder='build/static')
app.config.from_object(Config)
db = SQLAlchemy(app)
ma = Marshmallow()
from models.seats import *


@app.route('/seats',methods=['GET'])
@cross_origin()
def getSeats():
    allSeats=Seats.query.all()    
    result=seatSchema.jsonify(allSeats)  
    return result

@app.route('/seats',method=['PUT'])    
@cross_origin()
def updateSeats():
    

@app.route("/")
def index():
    return render_template('index.html')

    


if __name__ == "__main__":    
    seatSchema=SeatSchema(many=True)    
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)

