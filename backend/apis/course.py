from flask_restplus import Namespace, Resource, abort
from flask import request
from util.helper import *
import db.init_db as db
from util.models import assignment_details, auth_details, notice_details, resource_details

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

@api.route('/all')
class AllCourse(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.doc(description='''
        Get all course information
    ''')
    def get(self):
        session = db.get_session()
        courses = session.query(db.Course)
        session.close()
        if (courses is None):
            return None
        courseList = []
        for course in courses:
            courseList.append(getCourseInfo(course))
        return courseList

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
    def post(self):
        authorize(request)
        (course_id, title, publish_date, due_date, group_size, all_topics, content) = unpack(request.json, 'course_id', 'title', 'publish_date', 'due_date', 'group_size', 'all_topics', 'content')
        session = db.get_session()
        new_assignment = db.Assignment(course_id=course_id, title=title, publish_date=publish_date, due_date=due_date, group_size=group_size, all_topics=all_topics, content=content)
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

@api.route('/notice')
class Notice(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api), notice_details(api))
    @api.doc(description='''
        Post a new notice.
    ''')
    def post(self):
        authorize(request)
        (course_id, title, content, publisher_id) = unpack(request.json, 'course_id', 'title', 'content', 'publisher_id')
        session = db.get_session()
        new_notice = db.Notice(course_id=course_id, title=title, content=content, publisher_id=publisher_id)
        session.add(new_notice)
        session.commit()
        session.close()
        return {
            'message': 'success'
        }

    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.param('course_id', 'the id of the course which the user want to fetch')
    @api.doc(description='''
        Get the notice information of a course<br>
    ''')
    def get(self):
        course_id = int(request.args.get('course_id', None))
        session = db.get_session()
        notices = session.query(db.Notice).filter_by(course_id=course_id).all()
        session.close()
        if (notices is None):
            return None
        noticeList = []
        for notice in notices:
            noticeList.append(getNoticeInfo(notice))
        return noticeList

@api.route('/resource')
class Resources(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api), resource_details(api))
    @api.doc(description='''
        Post a new Resource.
    ''')
    def post(self):
        authorize(request)
        (course_id, title, group, content) = unpack(request.json, 'course_id', 'title', 'group', 'content')
        session = db.get_session()
        new_resource = db.Resource(course_id=course_id, title=title, content=content, group=group)
        session.add(new_resource)
        session.commit()
        session.close()
        return {
            'message': 'success'
        }

    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.param('resource_id', 'the id of the resource which the user want to fetch')
    @api.doc(description='''
        Get the resource
    ''')
    def get(self):
        resource_id = int(request.args.get('resource_id', None))
        session = db.get_session()
        resource = session.query(db.Resource).filter_by(id=resource_id).first()
        session.close()
        if (resource is None):
            return None
        return getResourceInfo(resource)

@api.route('/resource/all')
class AllResources(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.param('course_id', 'the id of the course which the user want to fetch')
    @api.doc(description='''
        Get all the resources in a given course
    ''')
    def get(self):
        course_id = int(request.args.get('course_id', None))
        session = db.get_session()
        resources = session.query(db.Resource).filter_by(course_id=course_id).all()
        session.close()
        if (resources is None):
            return None
        resourceList = []
        for resource in resources:
            resourceList.append(getResourceInfo(resource))
        return resourceList

@api.route('/staff')
class Staff(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.param('course_id', 'the id of the course which the user want to fetch')
    @api.doc(description="Get the satff information of a course")
    def get(self):
        course_id = int(request.args.get('course_id', None))
        session = db.get_session()
        staffs = session.query(db.Teaching).filter_by(course_id=course_id).all()
        session.close()
        if (staffs is None):
            return None
        satffList = []
        for satff in staffs:
            satffList.append(getStaffInfo(satff))
        return satffList
