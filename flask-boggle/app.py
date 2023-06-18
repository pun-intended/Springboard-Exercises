from boggle import Boggle

from flask import Flask, redirect, render_template, session, request, jsonify
import boggle

game = Boggle()
app = Flask(__name__)
app.config["SECRET_KEY"] = "tendigitsecretkey"


@app.route("/")
def create_game():
    """Initialize a game, creating new board, and clearing scores"""
    session["board"] = game.make_board() 
    session['score'] = 0
    session['used'] = []
    try:
        session['num_plays'] += 1
    except KeyError:
        session['best_score'] = 0
        session['num_plays'] = 1
    return redirect("/play")

@app.route("/play")
def play_game():
    """display the current game board for playing"""
    return render_template('board.html', board=session["board"])

@app.route("/validate", methods=["POST"])
def validate_guess():
    """validate the user's guess, and return result.  increment score if valid"""
    used_set = session['used']
    board = session['board']
    guess = request.get_json()["guess"]
    if(guess in used_set):
        result="used already"
    else:    
        result = game.check_valid_word(board, guess)
        used_set.append(guess)
    score = session['score']
    if (result == "ok"):
        score += len(guess)
        session['score'] = score
    response = jsonify({"result": result, "score": score})
    return response

@app.route("/finish")
def save_plays():
    """display the user's best score and games played"""
    final_score = session['score']
    session['best_score'] = max(final_score, session['best_score'])
    return f"<h1> best score - {final_score} in {session['num_plays']} plays"

    


"""
TODO
- add countdown timer
- refresh score
- provide messages about guess
"""