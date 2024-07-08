from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, DateTime, func
from sqlalchemy.orm import relationship
from sqlalchemy.orm import backref
from sqlalchemy.orm import validates

from config import db, bcrypt

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    posts = db.relationship('Post', back_populates='user')
    projects = db.relationship('Project', back_populates='user')
    favorites = db.relationship('Favorite', back_populates='users')

    serialize_rules = ('-projects.user', '-favorites', '-posts.user')

    
    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise ValueError('Username cannot be empty')
        elif len(username) > 25:
            raise ValueError('Username cannot be longer than 25 characters')
        elif User.query.filter_by(username=username).first():
            raise ValueError('Username already exists')
        return username

    @validates('email')
    def validate_email(self, key, email):
        if not email:
            raise ValueError('Email cannot be empty')
        elif '@' not in email:
            raise ValueError('Invalid email, must contain an @')
        return email

    def __repr__(self):
        return f'<User {self.username}, {self.email}>'



class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    language_used = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, server_default=func.now())

    user = db.relationship('User', back_populates='posts')
    serialize_rules = ('-user.posts',)

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'image_url': self.image_url,
            'user_id': self.user_id,
            'language_used': self.language_used
        }

    @validates('content')
    def validate_content(self, key, content):
        if not content:
            raise ValueError('Content cannot be empty')
        elif len(content) > 500:
            raise ValueError('Content cannot be longer than 500 characters')
        return content

    @validates('language_used')
    def validate_language_used(self, key, language_used):
        if not language_used:
            raise ValueError('Language used cannot be empty')
        elif len(language_used) > 25:
            raise ValueError('Language used cannot be longer than 25 characters')
        return language_used


 
class Project(db.Model, SerializerMixin):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    link = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='projects')
    favorites = db.relationship('Favorite', back_populates='projects')
    serialize_rules = ('-user.projects','-favorites')

    # Example of accessing projects related to a user:
    # user = User.query.get(user_id)  # Assuming user_id is known
    # if user:
    #     projects = user.projects  # Accessing projects related to this user
        # for project in projects:
        #     print(project.name)  # Example of accessing project attributes
        # else:
        #     print("User not found")

    # def to_dict(self):
    #     return {
    #         'id': self.id,
    #         'name': self.name,
    #         'description': self.description,
    #         'link': self.link,
    #         'user_id': self.user_id
    #     }

    @validates
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Name cannot be empty')
        elif len(name) > 50:
            raise ValueError('Name cannot be longer than 50 characters')
        return name
    
    @validates
    def validate_description(self, key, description):
        if not description:
            raise ValueError('Description cannot be empty')
        elif len(description) > 500:
            raise ValueError('Description cannot be longer than 500 characters')
        return description

    @validates
    def validate_link(self, key, link):
        if not link:
            raise ValueError('Link cannot be empty')
        elif len(link) > 100:
            raise ValueError('Link cannot be longer than 100 characters')
        return link

class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)

    users = db.relationship('User', back_populates='favorites')
    projects = db.relationship('Project', back_populates='favorites')
    serialize_rules = ('-users.favorite', '-projects.favorite')

