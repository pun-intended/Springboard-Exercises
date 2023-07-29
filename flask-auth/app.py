from flask import Flask, redirect, render_template, request
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.app_context().push()
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = "alphabetsoup"

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///db-name'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

debug = DebugToolbarExtension(app)

@app.route("/")
def show_registration():
    """Redirect user to registration page"""
    return redirect("/register")

@app.route("/register", methods=["GET", "POST"])
def handle_registration():
    """Show registration form and process registration requests"""
    return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def handle_login():
    """Show login form and process login requests"""
    return render_template("login.html")

@app.route("/secret")
def show_success_message():
    """Show 'Secret' page"""
    return "You made it!"

# ---------------------------

@app.route("/users/<username>", methods=["GET"])
def method():
    return render_template()

@app.route("/users/<username>/delete", methods=["POST"])
def method():
    return render_template()

@app.route("/users/<username>/feedback/add", methods=["GET", "POST"])
def method():
    return render_template()

@app.route("/feedback/<feedback-id>/update", methods=["GET", "POST"])
def method():
    return render_template()

@app.route("/feedback/<feedback-id>/delete", methods=["POST"])
def method():
    return render_template()




