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
        (password, email, role) = unpack(request.json, 'password', 'email', 'role', required=False)
        if password == None and email == None and role == None:
            abort(400, 'Malformed Request')
        if password != None and password == '':
            abort(400, 'Malformed Request')
        if email != None and email == '':
            abort(400, 'Malformed Request')
        if role != None and role == '':
            abort(400, 'Malformed Request')
        session = db.get_session()
        user = session.query(db.User).filter_by(token = user.token).first()
        # update information
        if password != None:
            user.password = password
        if email != None:
            user.email = email
        if role != None:
            user.role = role
        session.commit()
        session.close()
        return {
            'message': 'success'
        }

    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api))
    @api.param('user_id','the id of the user')
    @api.doc(description='''Get the user information''')
    def get(self):
        user = authorize(request)
        user_id = request.args.get('user_id', None)
        if (user_id is not None):
            session = db.get_session()
            user = session.query(db.User).filter_by(id = user_id).first()
            session.close()
        return {
            "id": user.id,
            'zid': user.zid,
            'password': user.password,
            'token': user.token,
            'role': user.role,
            'name': user.name,
            'email': user.email
        }

@api.route('/enrolment')
class Enrolment(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api))
    @api.doc(description='''Get the user enrolment''')
    def get(self):
        user = authorize(request)
        session = db.get_session()
        enrolments = session.query(db.Enrolment).filter_by(student_id = user.id).all()
        session.close()
        enrolmentList = []
        for enrolment in enrolments:
            enrolmentList.append(getEnrolmentInfo(enrolment))
        return enrolmentList