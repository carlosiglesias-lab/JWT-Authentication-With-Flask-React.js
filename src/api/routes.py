"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def user_login():
    email = request.json.get("email")
    password = request.json.get("password")
    user = User.query.filter_by(email = email, password = password).first()
    if not user :
        return jsonify({"error" : "error de usuario"}),401
    
    token = create_access_token(identity=user.id)
    
    response_body = {"message": "hola", "token" : token}

    return jsonify(response_body), 200

@api.route('/user', methods=['get'])
@jwt_required()
def current_user_email():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({"response":"hola ", "email": user.email}), 200