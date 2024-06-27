#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Post, Project, Favorite

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        print("Deleting all records...")
        User.query.delete()  
        db.session.commit()

        print("Creating Users...")
        u1 = User(
            name = "John Smith"
            email = "john123@aol.com"
            username = "john.s"
            password = "password"
        )
