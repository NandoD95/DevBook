from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    posts = db.relationship('Post', back_populates='user')
    projects = db.relationship('Project', back_populates='user')
    favorites = db.relationship('Favorite', back_populates='users')

    def __repr__(self):
        return f'<User {self.username}>'

class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    language_used = db.Column(db.String, nullable=True)
    # created_at = db.Column(db.DateTime, server_default=func.now())

    user = db.relationship('User', back_populates='posts')
    serialize_rules = ('-users.posts')
    
class Project(db.Model, SerializerMixin):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    link = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='projects')
    favorites = db.relationship('Favorite', back_populates='projects')
    serialize_rules = ('-users.projects')

class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)

    users = db.relationship('User', back_populates='favorites')
    projects = db.relationship('Project', back_populates='favorites')
    serialize_rules = ('-users.favorite', '-projects.favorite')

