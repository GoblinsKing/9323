from flask_restplus import Namespace, Resource
from flask import request
import db.init_db as db
from util.helper import *
from util.models import update_user, auth_details

api = Namespace('user', description='User Information')

@api.route('/')
class User(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api), update_user(api))
    @api.doc(description='''
        This is used to update the user information.
    ''')
    def put(self):
        user = authorize(request)
        (password, email, phone_number) = unpack(request.json, 'password', 'email', 'phone_number', required=False)
        print(password)
        print(email)
        print(phone_number)
        if password == None and email == None and phone_number == None:
            abort(400, 'Malformed Request')
        if password != None and password == '':
            abort(400, 'Malformed Request')
        if email != None and email == '':
            abort(400, 'Malformed Request')
        if phone_number != None and phone_number == '':
            abort(400, 'Malformed Request')
        session = db.get_session()
        user = session.query(db.User).filter_by(token = user.token).first()
        # update information
        if password != None:
            user.password = password
        if email != None:
            user.email = email
        if phone_number != None:
            user.phone_number = phone_number
        session.commit()
        session.close()
        return {
            'message': 'success'
        }

    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api))
    @api.doc(description='''Get the user information''')
    def get(self):
        user = authorize(request)
        return {
            "id": user.id,
            'username': user.username,
            'password': user.password,
            'token': user.token,
            'role': user.role,
            'name': user.name,
            'email': user.email,
            'phone_number': user.phone_number
        }