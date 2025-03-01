#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Post, Project, Favorite

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Users(Resource):
    def get(self):
        users = User.query.all()
        users_list = [user.to_dict() for user in users]
        return make_response(users_list, 200)
    
api.add_resource(Users, '/users')

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).one_or_none()

        if user is not None:
            return make_response(user.to_dict(), 200)
        else:
            return make_response({"error": "User not found"}, 404)

    def delete(self, id):
        user = User.query.filter_by(id=id).one_or_none()

        if user is None:
            return make_response({"error": "User not found"}, 404)

        db.session.delete(user)
        db.session.commit()
        return make_response({}, 204)
    
    def patch(self, id):
        user = User.query.filter_by(id=id).one_or_none()

        if user is None:
            return make_response({"error": "User not found"}, 404)
        
        data = request.get_json()
        if 'username' in data:
            user.username = data['username']
        if 'email' in data:
            user.email = data['email']
        if 'password' in data:
            user.password = data['password']
        
        db.session.commit()
        return make_response(user.to_dict(), 200)


api.add_resource(UserById, "/users/<int:id>")

class Posts(Resource):
    def get(self):
        posts = [
            post.to_dict() for post in Post.query.all()
        ]
        return make_response(posts, 200)
    
    def post(self):
        try:
            new_post = Post(
                content=request.get_json()["content"],
                image_url=request.get_json()["image_url"],
                user_id=session["user_id"],
                language_used=request.get_json()["language_used"],
            )
            db.session.add(new_post)
            db.session.commit()

            return make_response(new_post.to_dict(), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)


api.add_resource(Posts, "/post")


class PostById(Resource):
    def get(self, id):
        post = Post.query.filter_by(id=id).one_or_none()

        if post is not None:
            return make_response(post.to_dict(), 200)
        else:
            return make_response({"error": "Post not found"}, 404)

    def delete(self, id):
        post = Post.query.filter_by(id=id).one_or_none()

        if post is None:
            return make_response({"error": "Post not found"}, 404)

        db.session.delete(post)
        db.session.commit()
        return make_response({}, 204)
    
    def patch(self, id):
        post = Post.query.filter_by(id=id).one_or_none()

        if post is None:
            return make_response({"error": "Post not found"}, 404)
        
        data = request.get_json()
        if 'content' in data:
            post.content = data['content']
        # if 'image_url' in data:
        #     post.image_url = data['image_url']
        # if 'language_used' in data:
        #     post.language_used = data['language_used']
            db.session.add(post)
            db.session.commit()
        return make_response(post.to_dict(), 200)


api.add_resource(PostById, "/post/<int:id>")

class Projects(Resource):
    def get(self):
        projects = Project.query.all()
        if projects is not None:
            return make_response([project.to_dict()for project in projects], 200)
        else:
            return make_response({"error": "Project not found"}, 404)

    def post(self):
        data = request.get_json()
        project = Project(
            name=data['name'],
            description=data['description'],
            link=data['link'],
            user_id=data['user_id']
        )
        db.session.add(project)
        db.session.commit()
        return make_response(project.to_dict(), 201)

api.add_resource(Projects, "/projects")

class ProjectById(Resource):
    def get(self, id):
        project = Project.query.filter_by(id=id).one_or_none()
        if project is None:
            return make_response({"error": "Project not found"}, 404)
            return make_response(project.to_dict(), 200)

    def delete(self, id):
        project = Project.query.filter_by(id=id).one_or_none()
        if project is None:
            return make_response({"error": "Project not found"}, 404)
        else:
            db.session.delete(project)
            db.session.commit()
            return make_response({"message": "Project deleted"}, 200)

    def patch(self, id):
        data = request.get_json()
        project = Project.query.filter_by(id=id).one_or_none()
        if project is None:
            return make_response({"error": "Project not found"}, 404)

        if 'name' in data:
            project.name = data['name']
        if 'description' in data:
            project.description = data['description']
        if 'link' in data:
            project.link = data['link']
        
        db.session.commit()
        return make_response(project.to_dict(), 200)

api.add_resource(ProjectById, "/projects/<int:id>")


# class Favorites(Resource):

#     def get(self):
#         # Check if user is authenticated (example using headers and JWT)
#         auth_header = request.headers.get('Authorization')
#         if not auth_header:
#             return make_response(jsonify({"error": "Authorization header missing"}), 401)

#         # Validate the JWT token (example code, adjust as per your auth mechanism)
#         token = auth_header.split(" ")[1]  # Assuming Bearer token format
#         # Verify and decode token, retrieve user_id from decoded token
#         user_id = decode_jwt(token)  # Implement your JWT decoding function

#         if not user_id:
#             return make_response(jsonify({"error": "Unauthorized"}), 401)

#         # Query favorites for the authenticated user
#         favorites = [
#             favorite.to_dict() for favorite in Favorite.query.filter_by(user_id=user_id).all()
#         ]
#         return make_response(jsonify(favorites), 200)

#     def post(self):
#         # Check if user is authenticated (example using headers and JWT)
#         auth_header = request.headers.get('Authorization')
#         if not auth_header:
#             return make_response(jsonify({"error": "Authorization header missing"}), 401)

#         # Validate the JWT token (example code, adjust as per your auth mechanism)
#         token = auth_header.split(" ")[1]  # Assuming Bearer token format
#         # Verify and decode token, retrieve user_id from decoded token
#         user_id = decode_jwt(token)  # Implement your JWT decoding function

#         if not user_id:
#             return make_response(jsonify({"error": "Unauthorized"}), 401)

#         # Process POST request to add a new favorite
#         data = request.get_json()
#         favorite = Favorite(
#             project_id=data['project_id'],
#             user_id=user_id
#         )
#         db.session.add(favorite)
#         db.session.commit()
#         return make_response(jsonify(favorite.to_dict()), 201)
    

class Favorites(Resource):
    def get(self):
        favorites = [
            favorite.to_dict() for favorite in Favorite.query.all()
        ]
        return make_response(favorites, 200)
        # favorite = Favorite.query.all()
        # # data = request.get_json()
        # # favorite = Favorite(
        # #     post_id=data['post_id'],
        # #     user_id=data['user_id']
        # # )
        # if favorite is not None:
        #     return make_response(favorite.to_dict(), 200)
        # else:
        #     return make_response({"error": "Favorite not found"}, 404)

    def post(self):
        data = request.get_json()
        favorite = Favorite(
            project_id=data['project_id'],
            user_id=data['user_id']
        )
        db.session.add(favorite)
        db.session.commit()
        return make_response(favorite.to_dict(), 201)

api.add_resource(Favorites, "/favorites")

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = db.session.get(User, user_id)
            if user:
                return make_response(user.to_dict(), 200)
        return make_response({'error': 'Unauthorized: Must login'}, 401)

api.add_resource(CheckSession, '/check_session')

class SignUp(Resource):
    def post(self):
        params = request.json
        username=params.get('username')
        if User.query.filter_by(username=username).first():
            return make_response({"error": "Username already exists"}, 401)
        try:
            user = User(
                username=params.get('username'),
                name=params.get('name'),
                email=params.get('email')
            )
            user.password_hash = params.get('password')
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return make_response(user.to_dict(), 201)
        except Exception as e:
            return make_response({"error": str(e)}, 400)
        
api.add_resource(SignUp, '/signup')

class Login(Resource):
    def post(self):
        params = request.json
        user = User.query.filter_by(username=params.get('username')).first()
        if not user:
            return make_response({'error': 'Invalid user or password'}, 404)

        if user.authenticate(params.get('password')):
            session['user_id'] = user.id
            return make_response(user.to_dict())
        else:
            return make_response({'error': 'Invalid user or password' }, 404)

api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({}, 204)

api.add_resource(Logout, '/logout')

# class Interactions(Resource):
#     def post(self):
#         try:
#             newInteraction = Interaction(
#                 comment=request.get_json()["comment"],
#                 like=request.get_json()["like"],
#                 user_id=request.get_json()["user_id"],
#                 post_id=request.get_json()["post_id"],
#             )
#             db.session.add(newInteraction)
#             db.session.commit()

#             return make_response(newInteraction.to_dict(), 201)
#         except ValueError:
#             return make_response({"errors": ["validation errors"]}, 400)

#     def get(self):
#         interaction = Interaction.query.get()
#         if interaction:
#             return make_response(interaction.to_dict(), 200)
#         else:
#             return make_response({"error": "Interaction not found"}, 404)

# api.add_resource(Interactions, "/interactions")

# class InteractionByID(Resource):
#     def get(self, id):
#         interaction = Interaction.query.get(id)
#         if interaction:
#             return make_response(interaction.to_dict(), 200)
#         else:
#             return make_response({"error": "Interaction not found"}, 404)

#     def patch(self, id):
#         interaction = Interaction.query.get(id)
#         data = request.get_json()
#         if interaction:
#             try:
#                 # Update the interaction properties
#                 if "comment" in data:
#                     interaction.comment = data["comment"]
#                 if "like" in data:
#                     interaction.like = data["like"]
#                 if "user_id" in data:
#                     interaction.user_id = data["user_id"]
#                 if "post_id" in data:
#                     interaction.post_id = data["post_id"]

#                 db.session.commit()
#                 return make_response(interaction.to_dict(), 200)
#             except ValueError:
#                 return make_response({"errors": ["validation errors"]}, 400)
#         else:
#             return make_response({"error": "Interaction not found"}, 404)

# api.add_resource(InteractionByID, "/interactions/<int:id>")


if __name__ == '__main__':
    app.run(port=5555, debug=True)

