from flask_restplus import Namespace, Resource, abort
from flask import request
from util.helper import *
import db.init_db as db
from util.models import assignment_details, auth_details

api = Namespace('course', description='Course Services')

@api.route('/')
class Course(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
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

@api.route('/assignment')
class Assignment(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api), assignment_details(api))
    @api.doc(description='''
        Post a new assignment.<br>
        The toptics are separated by '|'
    ''')
    def put(self):
        authorize(request)
        (course_id, title, due_date, group_size, all_topics, content) = unpack(request.json, 'course_id', 'title', 'due_date', 'group_size', 'all_topics', 'content')
        session = db.get_session()
        new_assignment = db.Assignment(course_id=course_id, title=title, due_date=due_date, group_size=group_size, all_topics=all_topics, content=content)
        session.add(new_assignment)
        session.commit()
        session.close()
        return {
            'message': 'success'
        }

    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api))
    @api.param('course_id', 'the id of the course which the user want to fetch')
    @api.doc(description='''
        Get the assignment information of a course<br>
        The toptics are separated by '|'
    ''')
    def get(self):
        authorize(request)
        course_id = int(request.args.get('course_id', None))
        session = db.get_session()
        assignment = session.query(db.Assignment).filter_by(course_id=course_id).first()
        session.close()
        if (assignment is None):
            return None
        return {
            'assignmentInfo': getAssignmentInfo(assignment)
        }