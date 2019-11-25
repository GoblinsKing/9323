from flask_restplus import Namespace, Resource, abort
from flask import request
from util.helper import *
import db.init_db as db
from util.models import login_details
import hashlib

api = Namespace('auth', description='Authentication Services')

@api.route('/login')
class Login(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Username/Password')
    @api.response(403, 'Invalid Username/Password')
    @api.expect(login_details(api))
    @api.doc(description='''
        This is used to authenticate a verified account created through signup.
        Returns a auth token which should be passed in subsequent calls to the api
        to verify the user.
    ''')
    def post(self):
        if not request.json:
            abort(400, 'Malformed Request')
        (zid, password) = unpack(request.json, 'zid', 'password')
        session = db.get_session()
        user = session.query(db.User).filter_by(zid=zid).first()
        if not user:
            abort(403,'Invalid Username/Password')
        password_bytes = password.encode()
        hash_password = hashlib.sha256(user.salt + password_bytes).hexdigest()
        if (hash_password != user.password):
            abort(403,'Invalid Username/Password')
        t = gen_token()
        user.token = t
        session.commit()
        session.close()
        return {
            'token': t
        }