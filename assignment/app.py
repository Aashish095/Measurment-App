from flask import Flask, request, jsonify, render_template
from models import Measurement

from flask_migrate import Migrate
from flask_cors import CORS
from models import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///measurements.db'

migrate = Migrate(app, db)
CORS(app)
db.init_app(app)

@app.before_first_request
def create_table():
    db.create_all()


@app.route('/measurements', methods=['POST'])
def get_measurement():
    """
    this api is basically work to get the waist measurement when we provide height age weight
    and if we it doesn't exist it create its own
    :return:
    """
    try:
        data = request.json
        height = data.get('height')
        age = data.get('age')
        weight = data.get('weight')
        waist_measurement = data.get('waist_measurement')
        print(height, age, weight, waist_measurement)
        if height and age and weight:
            # Search for existing measurements
            waist_measurement_float = None
            height_float = float(height)
            age_int = int(age.split('.')[0])
            weight_float = float(weight)
            if waist_measurement:
                waist_measurement_float = float(waist_measurement)
            measurements = Measurement.query.filter_by(height=height_float, age=age_int, weight=weight_float).all()

            if measurements:
                # If existing measurements found, filter by waist measurement if provided
                if waist_measurement_float:
                    waist_measurements = [measurement.waist for measurement in measurements if
                                          measurement.waist == float(waist_measurement)]
                else:
                    waist_measurements = [measurement.waist for measurement in measurements]
            else:
                # If no existing measurements found, add new measurement to database
                if waist_measurement:
                    measurement = Measurement(height=height_float, age=age_int, weight=weight_float, waist=waist_measurement_float)
                    db.session.add(measurement)
                    db.session.commit()
                    waist_measurements = [waist_measurement]
                else:
                    return jsonify(message='Invalid input'), 400

            return jsonify(waist_measurements=waist_measurements, message='Success')
        else:
            return jsonify(message='Invalid input'),400
    except Exception as e:
        print(e)
        return jsonify(message=str(e)), 400


@app.route('/')
def index():
    return render_template("/out/index.html")

if __name__ == '__main__':
    app.run()
