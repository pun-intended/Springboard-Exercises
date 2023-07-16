"""
Models for Blogly.

User - id, first name, last name, img url

"""
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

def connect_db(app):
    """Connect to database"""
    db.app = app
    db.init_app(app)

class User(db.Model):
    __tablename__ = "users"

    user_id = db.Column(db.Integer, 
                   primary_key = True, 
                   autoincrement = True)
    first_name = db.Column(db.String,
                           nullable = False)
    last_name = db.Column(db.String,
                          nullable = False)
    img_url = db.Column(db.String)

class Post(db.Model):
    __tablename__ = "posts"

    post_id = db.Column(db.Integer, 
                   primary_key = True, 
                   autoincrement = True)
    title = db.Column(db.String,
                      nullable = False)
    content = db.Column(db.String,
                        nullable = False)
    created_at = db.Column(db.DateTime, 
                           nullable = False,
                           default = datetime.utcnow)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.user_id'),
                        nullable=False)
    user = db.relationship("User", backref="posts")
    