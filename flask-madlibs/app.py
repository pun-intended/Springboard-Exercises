from flask import Flask, request, render_template
import stories

app = Flask(__name__)

@app.route('/')
def get_story():
    story_prompts = stories.story.prompts
    return render_template("index.html", prompts_list=story_prompts)
    #return "found page"

@app.route("/story")
def display_story():
    new_story = stories.story.generate(request.args)
    return render_template("story.html", story=new_story)


"""
TODO
- import  story
- create inputs on page based on prompts in story
- navigate to completed story on form submission
"""