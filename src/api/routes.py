"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


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

@api.route('/user', methods=['GET'])
@jwt_required()
def current_user_email():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({"response":"hola ", "email": user.email}), 200

@api.route('/register', methods=['POST'])
def user_register():
    body_email = request.json.get("email")
    body_password = request.json.get("password")
    user_already_exist = User.query.filter_by(email= body_email).first()
    if user_already_exist:
        return jsonify({"response": "Email already used"}), 300
    new_user = User (email=body_email, password=body_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"response": "User registered successfully"}), 200 