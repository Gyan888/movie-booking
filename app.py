#!/usr/bin/env python

import os
from flask import Flask, render_template,jsonify
from flask_sqlalchemy import SQLAlchemy
from config import Config




app = Flask(__name__,template_folder='build',static_folder='build/static')
app.config.from_object(Config)
db = SQLAlchemy(app)

from models.seats import *


@app.route('/seats',methods=['GET'])
def getSeats():
    allSeats=Seats.query.all()
    print(allSeats)     
    result=seatSchema.dump(allSeats)  
    print (result)
    return jsonify(result.data)


@app.route("/")
def index():
    return render_template('index.html')

    


if __name__ == "__main__":
    seatSchema=SeatSchema(many=True)
    seatSchema=SeatSchema()
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)

