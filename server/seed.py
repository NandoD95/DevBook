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
            password = "password"
        )
        u2 = User(
            name = "Jane Doe",
            email = "jane123@aol.com",
            username = "jane.d",
            password = "password"
        )

        db.session.add_all([u1, u2])

        u1posts = Post(
            content = "this is my first post",
            user_id = u1,
            language_used = "React"
        )

        u2posts = Post(
            content = "this is my second post",
            user_id = u2,
            language_used = "Python"
        )
        
        db.session.add_all([u1posts, u2posts])

        u1projects = Project(
            name = "my first project",
            description = "using react naive and flask sql i built my first full stack dev application",
            link = "https://github.com/NandoD95/PenPrez",
            user_id = u1
        )

        db.session.add_all([u1projects])

        u2fav = Favorite(
            project_id = u1projects,
            user_id = u2
        )

        db.session.add_all([])
        db.session.commit()
