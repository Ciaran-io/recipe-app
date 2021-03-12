import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from recipe_scrapers import scrape_me
from werkzeug.security import generate_password_hash, check_password_hash
if os.path.exists("env.py"):
    import env


scraper = scrape_me(
    'https://www.allrecipes.com/recipe/158968/spinach-and-feta-turkey-burgers/')

scraper = scrape_me(
    'https://www.feastingathome.com/tomato-risotto/', wild_mode=True)


craper.title()
scraper.total_time()
scraper.yields()
scraper.ingredients()
scraper.instructions()
scraper.image()
scraper.host()
scraper.links()
scraper.nutrients()  # if available
