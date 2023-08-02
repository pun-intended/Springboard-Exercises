from flask import Flask, redirect, render_template, request, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from forms import SignUpForm, LoginForm, FeedbackForm
from models import User, Feedback, db, connect_db
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.app_context().push()
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = "alphabetsoup"

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///flask-auth'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

@app.route("/")
def show_registration():
    """Redirect user to registration page"""
    return redirect("/register")

@app.route("/register", methods=["GET", "POST"])
def handle_registration():
    """Show registration form and process registration requests"""
    if session["username"]:
        return redirect(f"/users/{session['username']}")
    form = SignUpForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        user = User.register(username, password, email, first_name, last_name)
        db.session.add(user)
        db.session.commit()
        flash(message="Registered successfully")
        return redirect("/login")
    else:
        return render_template("register.html", form=form)

@app.route("/login", methods=["GET", "POST"])
def handle_login():
    """Show login form and process login requests"""
    if session["username"]:
        return redirect(f"/users/{username}")
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        user = User.authenticate(username, password)
        if user:
            session['username'] = user.username
            return redirect(f'/users/{username}')
        else:
            form.username.errors = ["Invalid username or password"]
            return render_template("login.html", form = form)
    else:
        return render_template("login.html", form = form)

@app.route('/logout', methods=["GET"])
def handle_logout():
    """Log user out of session"""
    session.pop('username')
    return redirect('/')


@app.route("/secret")
def show_success_message():
    """Show 'Secret' page"""
    if session['username']:
        return "You made it!"
    else:
        flash("Sorry, you are not ready to see this")
        redirect('/')

# ---------------------------

@app.route("/users/<username>", methods=["GET"])
def show_user(username):
    user = User.query.get_or_404({username})
    return render_template("user.html", user=user)

@app.route("/users/<username>/delete", methods=["POST"])
def delete_user(username):
    user = User.query.get_or_404({username})
    if user and session['username'] == username:
        user.delete()
        db.session.commit()
        session.pop('username')
    return redirect("/")

@app.route("/users/<username>/feedback/add", methods=["GET", "POST"])
def add_feedback(username):
    form = FeedbackForm()
    if session['username'] == username:
        if form.validate_on_submit():
            title = form.title.data
            content = form.content.data
            fb = Feedback(title=title, content=content, username=username)
            db.session.add(fb)
            db.session.commit()
            return redirect(f'/users/{username}')
        else:
            return render_template("feedback.html", form=form, username=username)
    else:
        flash("You do not have permission to view this page")
        return redirect('/')

@app.route("/feedback/<feedback_id>/update", methods=["GET", "POST"])
def edit_feedback(feedback_id):
    feedback = Feedback.query.get_or_404(feedback_id)
    form = FeedbackForm(obj = feedback)
    print(request.method)
    if feedback.username == session['username']:
        if form.validate_on_submit():
            feedback.title = form.title.data
            feedback.content = form.content.data
            db.session.commit()
            username = session['username']
            return redirect(f'/users/{username}')
        else:
            return render_template("update_feedback.html", feedback = feedback, form=form)
    else:
        return redirect('/')

@app.route("/feedback/<feedback_id>/delete", methods=["POST"])
def delete_feedback(feedback_id):
    feedback = Feedback.query.get_or_404(feedback_id)
    if feedback and session['username'] == feedback.username:
        Feedback.query.filter_by(id=feedback_id).delete()
        db.session.commit()
    else:
        flash("You do not have permission to delete this")
    return redirect('/')




