from flask_restplus import Namespace, Resource, fields, abort
from flask import request
from util.helper import *
import db.init_db as db

api = Namespace('auth', description='Authentication Services')

##
login_details = api.model('login_details', {
  'username': fields.String(required=True, example='SampleUsername'),
  'password': fields.String(required=True, example='SamplePassword'),
})

signup_details = api.model('signup_details', {
  'username': fields.String(required=True, example='SampleUsername'),
  'password': fields.String(required=True, example='SamplePassword'),
  #'email': fields.String(required=True, example='sample@gmail.com'),
  #'name':  fields.String(required=True, example='John')
})
##

@api.route('/login')
class Login(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Username/Password')
    @api.response(403, 'Invalid Username/Password')
    @api.expect(login_details)
    @api.doc('login user')
    @api.doc(description='''
        This is used to authenticate a verified account created through signup.
        Returns a auth token which should be passed in subsequent calls to the api
        to verify the user.
    ''')
    def post(self):
        (un,ps) = unpack(request.json,'username','password')
        session = db.get_session()
        #our_user = session.query(db.User).filter_by(username='admin').first()
        if not session.query(db.User).filter_by(username=un, password=ps).first():
            abort(403,'Invalid Username/Password')
        t = gen_token()
        #db_r = db.update('USER').set(curr_token=t).where(username=un)
        #db_r.execute()
        return {
            'token': t
        }

@api.route('/signup')
class Signup(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Malformed Request')
    @api.response(409, 'Username Taken')
    @api.expect(signup_details)
    @api.doc('sign up user')
    @api.doc(description='''
        Use this endpoint to create a new account,
        username must be unique and password must be non empty
        After creation api retuns a auth token, same as /login would
    ''')
    def post(self):
        if not request.json:
            abort(400,'Malformed Request')
        #(un,ps,em,n) = unpack(request.json,'username','password','email','name')
        (un,ps) = unpack(request.json,'username','password')
        t = gen_token()
        db_r = db.insert('USER').with_values(
            curr_token=t,
            username=un,
            password=ps,
        )
        db_r.execute()

        return {
            'token': t
        }