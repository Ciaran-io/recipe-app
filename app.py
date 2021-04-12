import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
import json
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
if os.path.exists("env.py"):
    import env

app = Flask(__name__)
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)


@app.route("/base")
def base():
    return render_template('base.html')


@app.route("/")
def index():
    breakfast_data = []
    with open("data/breakfast-recipe.json", "r") as json_data:
        breakfast_data = json.load(json_data)

    lunch_data = []
    with open("data/lunch-recipe.json", "r") as json_data:
        lunch_data = json.load(json_data)

    snacks_data = []
    with open("data/snacks-recipe.json", "r") as json_data:

        snacks_data = json.load(json_data)

    return render_template("index.html", breakfast_recipe=breakfast_data, snacks_recipe=snacks_data, lunch_recipe=lunch_data)


@app.route("/recipes")
def recipes():
    breakfast_data = []
    with open("data/breakfast-recipe.json", "r") as json_data:
        breakfast_data = json.load(json_data)

    lunch_data = []
    with open("data/lunch-recipe.json", "r") as json_data:
        lunch_data = json.load(json_data)

    snacks_data = []
    with open("data/snacks-recipe.json", "r") as json_data:
        snacks_data = json.load(json_data)

    return render_template("recipes.html", breakfast_recipe=breakfast_data, snacks_recipe=snacks_data, lunch_recipe=lunch_data)


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        # check if username already exists in database
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            flash("username already exists")
            return redirect(url_for("register"))

        register = {
            "username": request.form.get("username").lower(),
            "password": generate_password_hash(request.form.get("password"))
        }
        mongo.db.users.insert(register)

        # put the new user into session cookie
        session["user"] = request.form.get("username").lower()
        flash("Registration Successfull")
        return redirect(url_for("profile", username=session["user"]))
    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # check id username exists in database
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            # ensure hashed password matches user input
            if check_password_hash(existing_user["password"], request.form.get("password")):
                session["user"] = request.form.get("username").lower()
                flash("Welcome, {}".format(request.form.get("username")))
                return redirect(url_for("profile", username=session["user"]))
            else:
                # invalid password hash
                flash(
                    "The username or password you have entered does not match our records. Please double-check and try again.")
                return redirect(url_for("login"))
        else:
            # username doesn't exist
            flash("The username or password you have entered does not match our records. Please double-check and try again.")
            return redirect(url_for("login"))

    return render_template("login.html")


@app.route("/profile/<username>", methods=["GET", "POST"])
def profile(username):
    # retrieve the session user's username from database
    username = mongo.db.users.find_one(
        {"username": session["user"]})["username"]

    if session["user"]:
        return render_template("profile.html", username=username)

    return redirect(url_for("login"))


# logout
@app.route("/logout")
def logout():
    # remove user session cookies
    session.pop("user")
    return redirect(url_for("index"))


# create user recipe from mongodb
@app.route("/create_recipes", methods=["GET", "POST"])
def create_recipes():
    if request.method == "POST":
        recipe = {
            "recipe_name": request.form.get("recipe_name"),
            "recipe_description": request.form.get("recipe_description"),
            "recipe_ingredients": request.form.get("recipe_ingredients"),
            "recipe_cooking_instructions": request.form.get("recipe_cooking_instructions"),
            "created_by": session["user"]
        }
        mongo.db.recipes.insert_one(recipe)
        flash("Your new recipe is added")
        return redirect(url_for("my_recipes"))

    return render_template("create_recipes.html")


# edit recipe
@app.route("/edit_recipe/<recipe_id>", methods=["GET", "POST"])
def edit_recipe(recipe_id):
    if request.method == "POST":
        submit = {
            "recipe_name": request.form.get("recipe_name"),
            "recipe_description": request.form.get("recipe_description"),
            "recipe_ingredients": request.form.get("recipe_ingredients"),
            "recipe_cooking_instructions": request.form.get("recipe_cooking_instructions"),
            "edited_by": session["user"]
        }
        mongo.db.recipes.update({"_id": ObjectId(recipe_id)}, submit)
        flash("Your recipe has been updated")
        return redirect(url_for("my_recipes"))

    recipe = mongo.db.recipes.find_one({"_id": ObjectId(recipe_id)})
    return render_template("edit_recipe.html", recipe=recipe)

# delete recipe from database


@app.route("/delete_recipe/<recipe_id>")
def delete_recipe(recipe_id):
    mongo.db.recipes.delete_one({"_id": ObjectId(recipe_id)})
    flash("Your recipe has been removed")
    return redirect(url_for("my_recipes"))

# display user recipes from mongodb


@app.route("/my_recipes")
def my_recipes():
    recipe = mongo.db.recipes.find()
    return render_template("my_recipes.html", recipe=recipe)


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
