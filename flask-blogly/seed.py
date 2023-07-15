from models import User, db
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

# Add to session
user_list = [m0, m1, m2, m3, f0, f1, f2]
db.session.add_all(user_list)

# Commit
db.session.commit()