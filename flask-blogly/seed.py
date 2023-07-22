from models import User, db, Post, Tag, PostTag
from app import app

db.drop_all()
db.create_all()

User.query.delete()

# Create seed users
m0 = User(first_name="Don", last_name="Caring", img_url="/static/m0.jpeg")
m1 = User(first_name="Kenny", last_name="Phi", img_url="/static/m1.jpeg")
m2 = User(first_name="Matt", last_name="Jacobs", img_url="/static/m2.jpeg")
m3 = User(first_name="Nick", last_name="Johnson", img_url="/static/m3.jpeg")
f0 = User(first_name="Charlotte", last_name="Panache", img_url="/static/f0.jpeg")
f1 = User(first_name="Becky", last_name="Hangar", img_url="/static/f1.jpeg")
f2 = User(first_name="Sasha", last_name="Monet", img_url="/static/f2.jpeg")

# Add to session and commit users
user_list = [m0, m1, m2, m3, f0, f1, f2]
db.session.add_all(user_list)
db.session.commit()

# create seed posts for users
p0 = Post(title="test post 0", content="this is just a test post", user_id="4")
p1 = Post(title="test post 1", content="this is just a test post", user_id="1")
p2 = Post(title="test post 2", content="this is just a test post", user_id="1")
p3 = Post(title="test post 3", content="this is just a test post", user_id="1")
p4 = Post(title="test post 4", content="this is just a test post", user_id="2")
p5 = Post(title="test post 5", content="this is just a test post", user_id="3")
p6 = Post(title="test post 6", content="this is just a test post", user_id="4")

# Add posts to sessions and commit
post_list=[p1, p2, p3, p4, p5, p6, p0]
db.session.add_all(post_list)
db.session.commit()

# create tags
t0 = Tag(name="Zip")
t1 = Tag(name="Zap")
t2 = Tag(name="Zoodle")
t3 = Tag(name="Nip")
t4 = Tag(name="Nap")
t5 = Tag(name="Noodle")

# add tags and commit
tag_list=[t0, t1, t2, t3, t4, t5]
db.session.add_all(tag_list)
db.session.commit()

# Create PostTag associations
a0 = PostTag(tag_id=1, post_id=1)
a1 = PostTag(tag_id=1, post_id=2)
a2 = PostTag(tag_id=1, post_id=3)
a3 = PostTag(tag_id=2, post_id=1)
a4 = PostTag(tag_id=3, post_id=1)
a5 = PostTag(tag_id=4, post_id=2)
a6 = PostTag(tag_id=5, post_id=2)
a7 = PostTag(tag_id=2, post_id=2)
a8 = PostTag(tag_id=3, post_id=3)
a9 = PostTag(tag_id=4, post_id=4)

# Add to session and commit
assoc_list = [a0, a1, a2, a3, a4, a5, a6, a7, a8, a9]
db.session.add_all(assoc_list)
db.session.commit()