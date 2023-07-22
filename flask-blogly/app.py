"""Blogly application."""

from flask import Flask, redirect, render_template, request
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post, Tag, PostTag

app = Flask(__name__)
app.app_context().push()
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
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
    user = User.query.get_or_404(user_id)
    return render_template("user.html", user=user)

@app.route("/users/<user_id>/edit", methods=['GET', 'POST'])
def edit_user(user_id):
    """Show user edit form or process user edit form"""
    user = User.query.get_or_404(user_id)
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
    User.query.filter_by(user_id=user_id).delete()
    db.session.commit()
    return redirect("/users")

@app.route('/users/<user_id>/posts/new', methods=['GET', 'POST'])
def new_post(user_id):
    """Show post creation page or process user post submission"""
    user = User.query.get_or_404(user_id)
    tags = Tag.query.all()
    if (request.method == "POST"):
        tag_ids = request.form.getlist('tags')
        title = request.form['title']
        content = request.form['content']
        user_id = user_id
        post = Post(title=title, content=content, user_id=user_id)
        db.session.add(post)
        db.session.commit()
        for tag_id in tag_ids:
            post_tag = PostTag(post_id=post.post_id, tag_id=tag_id)
            db.session.add(post_tag)
        db.session.commit()
        return redirect(f'/users/{user_id}')
    else:
        return render_template('post_submission.html', user=user, tags=tags)
    

@app.route('/posts/<post_id>')
def show_post(post_id):
    """Display the post associated with given post_id"""
    post = Post.query.get_or_404(post_id)
    return render_template('post.html', post=post)

@app.route('/posts/<post_id>/edit', methods=['GET', 'POST'])
def edit_post(post_id):
    """Edit post on user page"""
    tags = Tag.query.all()
    post = Post.query.get(post_id)
    post_tags = post.tags
    if (request.method == "POST"):
        tag_ids = request.form.getlist('tags') 
        post.title = request.form['title']
        post.content = request.form['content']
        # Delete PostTags that are no longer in the 
        for tag in post_tags:
            if tag.tag_id not in tag_ids:
                PostTag.query.filter(PostTag.post_id==post.post_id, PostTag.tag_id==tag.tag_id).delete()
                db.session.commit()
        for tagid in tag_ids:
            post_tag = PostTag(post_id=post.post_id, tag_id=tagid)
            db.session.add(post_tag)
        db.session.add(post)
        db.session.commit()
        return redirect(f'/posts/{post_id}')
    else:
        id_list = []
        for post_tag in post_tags:
            id_list.append(post_tag.tag_id)
        return render_template('edit_post.html', post=post, ids=id_list, tags=tags)


@app.route('/posts/<post_id>/delete', methods=['POST'])
def delete_post(post_id):
    """Delete post from user page"""
    # TODO - make this more efficient
    post = Post.query.get(post_id)
    user_id = post.user.user_id
    post.query.filter_by(post_id=post_id).delete()
    db.session.commit()
    return redirect(f'/users/{user_id}')

@app.route("/tags")
def list_tags():
    """Show all existing tags"""
    tags = Tag.query.all()
    return render_template("tags.html", tags=tags)

@app.route("/tags/<tag_id>")
def show_details(tag_id):
    """Show posts associated with given tag"""
    tag = Tag.query.get(tag_id)
    posts = tag.posts
    return render_template("tag_details.html", posts=posts, tag=tag)

@app.route("/tags/new", methods=['GET', 'POST'])
def create_tag():
    """Show and process form for tag creation"""
    if (request.method == "POST"):
        name = request.form['name']
        tag = Tag(name=name)
        db.session.add(tag)
        db.session.commit()
        return redirect("/tags")
    else:
        return render_template("create_tag.html")


@app.route("/tags/<tag_id>/edit", methods=['GET', 'POST'])
def edit_tag(tag_id):
    tag = Post.query.get(tag_id)
    if (request.method == "POST"):
        tag.name = request.form['name']
        db.session.add(tag)
        db.session.commit()
        return redirect("/tags")
    else:
        return render_template("create_tag.html", tag=tag)

@app.route("/tags/<tag_id>/delete", methods=['POST'])
def delete_tag(tag_id):
    Tag.query.filter_by(id=tag_id).delete()
    db.session.commit()
    return redirect("/tags")
"""
TODO
ADD tests
Add bootstrap to tags, pages


TESTING:
fix previous tests
add 4 new tests
"""