from flask_restplus import Namespace, Resource, abort
from flask import request
from util.helper import *
import db.init_db as db
#from util.models import message_details, auth_details

api = Namespace('course', description='Course Services')

@api.route('/')
class Course(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Username/Password')
    @api.response(403, 'Invalid Username/Password')
    @api.param('course_id', 'the id of the course which the user want to fetch')
    @api.doc(description='''
        Get course information
    ''')
    def get(self):
        course_id = int(request.args.get('course_id', None))
        session = db.get_session()
        course = session.query(db.Course).filter_by(id=course_id).first()
        session.close()
        return {
            'courseInfo': getCourseInfo(course)
        }