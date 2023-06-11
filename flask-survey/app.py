from flask import Flask, request, render_template
import surveys

app = Flask(__name__)

responses = []

@app.route('/')
def get_home():
    return render_template("base.html")

@app.route('/questions/<num>')
def get_question(num):
    question = surveys.satisfaction_survey.questions[num]
    return render_template("question.html", question = question)
