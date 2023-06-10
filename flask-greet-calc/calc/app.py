from flask import Flask, request
import operations

app = Flask(__name__)

@app.route("/math/<func>")
def calculate(func):
    (a, b) = request.args.get('a', type=int), request.args.get('b', type=int)
    math_func = ops[func]
    return f"{math_func(a, b)}"

@app.route('/add')
def add():
    (a, b) = request.args.get('a', type=int), request.args.get('b', type=int)
    return f"{operations.add(a, b)}"


@app.route('/sub')
def sub():
    (a, b) = request.args.get('a', type=int), request.args.get('b', type=int)
    return f"{operations.sub(a, b)}"

@app.route('/mult')
def mult():
    (a, b) = request.args.get('a', type=int), request.args.get('b', type=int)
    return f"{operations.mult(a, b)}"

@app.route('/div')
def div():
    (a, b) = request.args.get('a', type=int), request.args.get('b', type=int)
    return f"{int(operations.div(a, b))}"

ops = {
    'add': operations.add,
    'sub': operations.sub,
    'mult': operations.mult,
    'div': operations.div
}