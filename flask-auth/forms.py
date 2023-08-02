from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Length, Email

class SignUpForm(FlaskForm):
    username = StringField("Username", validators=[InputRequired(message="Must provide a username"), 
                                                   Length(max=20, message="Limit - 20 characters")], )
    password = PasswordField("Password", validators=[InputRequired(message="Must provide a password")])
    email = StringField("Email Address", validators=[InputRequired("Must provide an email address"), 
                                                     Length(max=50, message="Limit 50 characters"),
                                                     Email(message="Must provide a valid email address")])
    first_name = StringField("First Name", validators=[InputRequired("Must provide a first name"), 
                                                       Length(max=30, message="Limit 30 characters")])
    last_name = StringField("Last Name", validators=[InputRequired("Must provide a last name"), 
                                                     Length(max=30, message="Limit 30 characters")])

class LoginForm(FlaskForm):
    username = StringField("Username", validators=[InputRequired("Must input a username")])
    password = PasswordField("Password", validators=[InputRequired("Must input a password")])

class FeedbackForm(FlaskForm):
    title = StringField("Title", validators=[InputRequired(message = "* Required")])
    content = StringField("Feedback", validators=[InputRequired(message="* Required")])