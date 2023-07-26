"""Flask app for Cupcakes"""
from flask import Flask, redirect, render_template, request, jsonify, Response
from models import Cupcake, db, connect_db
# from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.app_context().push()

app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = "alphabetsoup"
# debug = DebugToolbarExtension(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

@app.route("/", methods=["GET"])
def show_all_cupcakes():
    return render_template("index.html")

@app.route('/api/cupcakes', methods=["GET", "POST"])
def get_cupcakes():
    if request.method == "GET":
        cupcakes = Cupcake.query.all()
        serialized = [cup.serialize() for cup in cupcakes]
        return jsonify(cupcakes=serialized)
    else:
        flavor = request.json["flavor"]
        size = request.json["size"]
        rating = request.json["rating"]
        image = request.json["image"]
        cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)
        db.session.add(cupcake)
        db.session.commit()
        return jsonify(cupcake=cupcake.serialize()), 201


@app.route('/api/cupcakes/<cupcake_id>', methods=["GET", "POST", "PATCH"])
def get_cupcake(cupcake_id):
    """Get post or patch a given cupcake"""
    if request.method == "GET":
        cupcake = Cupcake.query.get_or_404(cupcake_id)
        return jsonify(cupcake=cupcake.serialize())
    elif request.method == "DELETE":
        Cupcake.query.filter_by(id=cupcake_id).delete()
        db.session.commit()
        return jsonify({"message": "Deleted"})
    elif request.method == "PATCH":
        cupcake = Cupcake.query.get_or_404(cupcake_id)
        cupcake.flavor = request.json.get("flavor", cupcake.flavor)
        cupcake.image = request.json.get("image", cupcake.image)
        cupcake.rating = request.json.get("rating", cupcake.rating)      
        cupcake.size = request.json.get("size", cupcake.size)
        return jsonify(cupcake=cupcake.serialize())


@app.route("/api/cupcakes/<cupcake_id>", methods=["DELETE"])
def delete_cupcake(cupcake_id):
    """Delete a cupcake from the database"""
    Cupcake.query.filter_by(id=cupcake_id).delete()
    db.session.commit()
    return jsonify(message= "Deleted")
