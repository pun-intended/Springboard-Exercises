"""Blogly application."""

from flask import Flask, redirect, render_template, request
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User

app = Flask(__name__)
app.app_context().push()
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "alphabetsoup"

debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

@app.route("/")
def go_to_home():
    """Redirect to list of users"""
    return redirect("/users")

@app.route("/users")
def show_landing_page():
    """Show directory of all users"""
    users = User.query.all()
    return render_template("index.html", users=users)

@app.route("/users/new", methods=['GET', 'POST'])
def create_user():
    """Show user creation form or process user creation request"""
    if (request.method == "POST"):
        first_name = request.form["firstName"]
        last_name = request.form["lastName"]
        img_url = request.form["imgUrl"]

        new_user = User(first_name=first_name, last_name=last_name, img_url=img_url)
        db.session.add(new_user)
        db.session.commit()
        return redirect("/users")
    else:
        return render_template("signup.html")

@app.route("/users/<user_id>")
def show_user(user_id):
    """User page with details"""
    user = User.query.get(user_id)
    return render_template("user.html", user=user)

@app.route("/users/<user_id>/edit", methods=['GET', 'POST'])
def edit_user(user_id):
    """Show user edit form or process user edit form"""
    user = User.query.get(user_id)
    if (request.method == "POST"):
        user.first_name = request.form["firstName"]
        user.last_name = request.form["lastName"]
        user.img_url = request.form["imgUrl"]
        db.session.add(user)
        db.session.commit()
        return redirect("/users")
    else:
        return render_template("edit.html", user=user)

@app.route("/users/<user_id>/delete", methods=['POST'])
def delete_user(user_id):
    """Delete user details"""
    User.query.filter_by(id=user_id).delete()
    db.session.commit()
    return redirect("/users")



"""
TODO
HTML base templates 
pages for:
user listing - Show all users
New user form - create a user
User detail page - show name of usser
edit user page - Edit user details

ROUTES:
GET/
GET/users
GET /users/new
POST /users/new
GET /users/[user-id]
GET /users/[user-id]/edit
POST /users/[user-id]/edit
POST /users/[user-id]/delete

TESTING:
Test at least 4 routes
"""