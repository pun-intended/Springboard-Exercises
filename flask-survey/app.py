from flask import Flask, request, render_template, redirect, flash, session
import surveys

app = Flask(__name__)
app.config['SECRET_KEY'] = "thegooseisloose"

@app.route('/')
def get_home():
    return render_template("start.html")

@app.route('/questions/<int:num>')
def get_question(num):
    resp = session['responses']

    if (num != len(resp)):
        return redirect(f'/invalid/{num}')
    if (len(resp) >= len(surveys.satisfaction_survey.questions)):
        return redirect("/thankyou")
    else:
        question = surveys.satisfaction_survey.questions[num]
        return render_template("question.html", question = question)

@app.route('/answer', methods=["POST"])
def add_answer():
    ans = request.form['ans']
    resp = session['responses']
    resp.append(ans)
    session['responses'] = resp
    num = len(resp)
    return redirect(f"/questions/{num}")

@app.route('/questions/')
def go_to_question():
    resp = session['responses']
    num = len(resp)
    return redirect(f'/questions/{num}')

@app.route('/invalid/<int:num>')
def invalid_redirect(num):
    resp = session['responses']
    if (num > len(resp)):
        msg = "Please complete the survery questions in order"
    elif (num < len(resp)):
        msg = "This response has already been completed"
    else:
        msg = "This is not a valid question page"
    flash(msg)
    return redirect('/questions/')

@app.route('/thankyou')
def thank_you():
    return render_template("thankyou.html")

@app.route('/start_survey')
def start_survey():
    session['responses'] = []
    return redirect('/questions')
