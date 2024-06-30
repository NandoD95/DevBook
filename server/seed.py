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
        Post.query.delete()
        Project.query.delete()
        Favorite.query.delete()
        db.session.commit()

        print("Creating Users...")
        u1 = User(
            name = "John Smith",
            email = "john123@aol.com",
            username = "john.s",
            _password_hash = "password"
        )
        u2 = User(
            name = "Jane Doe",
            email = "jane123@aol.com",
            username = "jane.d",
            _password_hash = "password"
        )

        db.session.add_all([u1, u2])
        db.session.commit()

        print("Creating Post...")
        u1posts = Post(
            content = "this is my first post",
            user_id = u1.id,
            language_used = "React"
        )

        u2posts = Post(
            content = "this is my second post",
            user_id = u2.id,
            language_used = "Python"
        )
        
        db.session.add_all([u1posts, u2posts])
        db.session.commit()

        print("Creating Projects...")
        u1projects = Project(
            name = "my first project",
            description = "using react naive and flask sql i built my first full stack dev application",
            link = "https://github.com/NandoD95/PenPrez",
            user_id = u1.id
        )

        db.session.add_all([u1projects])
        db.session.commit()

        print("Creating Favorites...")
        u2fav = Favorite(
            project_id = u1projects.id,
            user_id = u2.id
        )

        db.session.add_all([u2fav])
        db.session.commit()

        print("Seed Created Successfully...")
