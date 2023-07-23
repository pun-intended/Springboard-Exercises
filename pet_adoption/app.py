from flask import Flask, redirect, render_template, request
from flask_debugtoolbar import DebugToolbarExtension
from models import Pet, db, connect_db
from forms import AddPetForm, EditPet



app = Flask(__name__)
app.app_context().push()
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = "alphabetsoup"
debug = DebugToolbarExtension(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

@app.route('/')
def show_pets():
    """List all pets in database"""
    pets = Pet.query.all()
    return render_template("pet_list.html", pets=pets)

@app.route('/add', methods=["POST", "GET"])
def add_pet():
    """Add pet to database"""
    form = AddPetForm()
    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        age = form.age.data
        pet = Pet(name=name, species=species, age=age)
        db.session.add(pet)
        db.session.commit()
        return redirect('/')
    else:
        return render_template("add_pet.html", form=form)
    
@app.route('/<pet_id>',  methods=["POST", "GET"])
def show_details(pet_id):
    """Display pet details and form for editing photo, notes and availability"""
    pet = Pet.query.get_or_404(pet_id)
    form = EditPet(obj=pet)
    if form.validate_on_submit():
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data
        pet.available = form.available.data
        db.session.add(pet)
        db.session.commit()
        return redirect(f'/{pet_id}')
    else:
        return render_template("pet_details.html", form=form, pet=pet)