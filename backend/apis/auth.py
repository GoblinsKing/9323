from flask_restplus import Namespace, Resource, fields, abort
from flask import request
from util.helper import *
import db.init_db as db

api = Namespace('auth', description='Authentication Services')

login_details = api.model('login_details', {
  'username': fields.String(required=True, example='SampleUsername'),
  'password': fields.String(required=True, example='SamplePassword'),
})

signup_details = api.model('signup_details', {
  'username': fields.String(required=True, example='SampleUsername'),
  'password': fields.String(required=True, example='SamplePassword'),
  'email': fields.String(required=True, example='peter@gmail.com'),
  'phone_number': fields.String(required=True, example='0412345678'),
  'name':  fields.String(required=True, example='Peter Snow')
})

@api.route('/login')
class Login(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Username/Password')
    @api.response(403, 'Invalid Username/Password')
    @api.expect(login_details)
    @api.doc(description='''
        This is used to authenticate a verified account created through signup.
        Returns a auth token which should be passed in subsequent calls to the api
        to verify the user.
    ''')
    def post(self):
        if not request.json:
            abort(400, 'Malformed Request')
        (username, password) = unpack(request.json, 'username', 'password')
        session = db.get_session()
        user = session.query(db.User).filter_by(username=username, password=password).first()
        if not user:
            abort(403,'Invalid Username/Password')
        t = gen_token()
        user.token = t
        session.commit()
        session.close()
        return {
            'token': t
        }

@api.route('/signup')
class Signup(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Malformed Request')
    @api.response(409, 'Username Taken')
    @api.expect(signup_details)
    @api.doc(description='''
        Use this endpoint to create a new account,
        username must be unique and password must be non empty
        After creation api retuns a auth token, same as /login would
    ''')
    def post(self):
        if not request.json:
            abort(400, 'Malformed Request')
        (username, password, email, phone_number, name) = unpack(request.json, 'username', 'password', 'email', 'phone_number', 'name')
        if username == '' or password == '':
            abort(400, 'Username or Password cannot be empty')
        session = db.get_session()
        if session.query(db.User).filter_by(username=username).first():
            abort(409, 'Username Taken')
        t = gen_token()
        new_user = db.User(token = t, username = username, password = password, email = email, phone_number = phone_number, name = name)
        session.add(new_user)
        session.commit()
        session.close()
        return {
            'token': t
        }