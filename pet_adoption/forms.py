from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SelectField, IntegerField 
from wtforms.validators import NumberRange, Optional, InputRequired, URL

class AddPetForm(FlaskForm):
    """Form for adding a pet to the database"""
    name = StringField("Name", validators=[InputRequired(message="Pet must have a name")])
    species = SelectField("Species", 
                          choices=[('cat', 'Cat'), ('dog', 'Dog'), ('porcupine', 'Porcupine')],
                          validators=[InputRequired("Must select a species")])
    photo_url = StringField("Photo Url", validators=[URL(message="invalid Image URL"), Optional()])
    age = IntegerField("Age", 
                       validators=[NumberRange(min=0, max=30, message="Age must be between 0 and 30")])
    notes = StringField("Notes")

class EditPet(FlaskForm):
    """Form for editing photo, notes, and availability of a pet"""
    photo_url = StringField("Photo Url", validators=[URL(message="invalid Image URL"), Optional()])
    notes = StringField("Notes")
    available = BooleanField("Available")