"""Blogly application."""

from flask import Flask, redirect, render_template, request
from models import db, connect_db, Users

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

@app.route("/")
def go_to_home():
    """Redirect to list of users"""
    return redirect("/users")

@app.route("/users")
def show_landing_page():
    """Show directory of all users"""
    return render_template("index.html")

@app.route("/users/new", methods=['GET', 'POST'])
def create_user():
    """Show user creation form or process user creation request"""
    if (request.method == "POST"):
        # TODO process request
    else:
        return render_template("signup.html")

@app.route("/users/<user_id>")
def show_user():
    """User page with details"""
    # Render user page with details
    return render_template("user.html")

@app.route("/users/<user_id>/edit", methods=['GET', 'POST'])
def edit_user():
    """Show user edit form or process user edit form"""
    if (request.method == "POST"):
        # TODO process request
    else:
        return render_template("edit.html")

@app.route("/users/<user_id>/delete", methods=['POST'])
def delete_user():
    """Delete user details"""
    # TODO process user delete request



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