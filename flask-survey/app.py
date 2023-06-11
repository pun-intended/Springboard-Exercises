from flask import Flask, request, render_template, redirect, flash
import surveys

app = Flask(__name__)
app.config['SECRET_KEY'] = "thegooseisloose"

responses = []

@app.route('/')
def get_home():
    return render_template("base.html")

@app.route('/questions/<int:num>')
def get_question(num):
    if (num != len(responses)):
        return redirect(f'/invalid/{num}')
    if (len(responses) >= len(surveys.satisfaction_survey.questions)):
        return redirect("/thankyou")
    else:
        question = surveys.satisfaction_survey.questions[num]
        return render_template("question.html", question = question)

@app.route('/answer', methods=["POST"])
def add_answer():
    ans = request.form['ans']
    responses.append(ans)
    num = len(responses)
    return redirect(f"/questions/{num}")

@app.route('/questions/')
def go_to_question():
    num = len(responses)
    return redirect(f'/questions/{num}')

@app.route('/invalid/<int:num>')
def invalid_redirect(num):
    if (num > len(responses)):
        msg = "Please complete the survery questions in order"
    elif (num < len(responses)):
        msg = "This response has already been completed"
    else:
        msg = "This is not a valid question page"
    flash(msg)
    return redirect('/questions/')

@app.route('/thankyou')
def thank_you():
    return render_template("thankyou.html")
