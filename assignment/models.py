from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


# Define the data schema for the male human measurements in backend:
class Measurement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    height = db.Column(db.Float, nullable=True)
    age = db.Column(db.Integer, nullable=True)
    weight = db.Column(db.Float, nullable=True)
    waist = db.Column(db.Float, nullable=True)
