from models import Pet, db
from app import app

db.drop_all()
db.create_all()

p0 = Pet(name="joseph", age="10", species="cat")
p1 = Pet(name="able", age="8", species="porcupine")
p2 = Pet(name="jimmy", age="9", species="cat")
p3 = Pet(name="susan", age="12", species="dog")
p4 = Pet(name="spiney pete", age="15", species="dog")
p5 = Pet(name="clawster", age="1", species="cat")
p6 = Pet(name="dumbo", age="2", species="porcupine")
p7 = Pet(name="one", age="15", species="dog")

all_pets = [p0, p1, p2, p3, p4, p5, p6, p7]

db.session.add_all(all_pets)
db.session.commit()