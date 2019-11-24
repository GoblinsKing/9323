from flask_restplus import Namespace, Resource, abort
from flask import request
from util.helper import *
import db.init_db as db
from util.models import thread_details, auth_details, comment_details

api = Namespace('thread', description='Thread Services')

@api.route('/')
class Thread(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api), thread_details(api))
    @api.doc(description='''
        User can start a new thread
    ''')
    def post(self):
        user = authorize(request)
        (course_id, title, content) = unpack(request.json, 'course_id', 'title', 'content')
        session = db.get_session()
        thread = db.Thread(course_id=course_id, title=title, content=content, publisher_id = user.id, up_vote = 0)
        session.add(thread)
        session.commit()
        session.close()
        return {
            'message': 'success'
        }

    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api))
    @api.param('thread_id', 'the id of the thread which the user want to fetch')
    @api.doc(description='''Get a thread''')
    def get(self):
        user = authorize(request)
        thread_id = int(request.args.get('thread_id', None))
        session = db.get_session()
        thread = session.query(db.Thread).filter_by(id=thread_id).first()
        if (thread is None):
            return None
        session.close()
        return getThreadInfo(thread)

@api.route('/comment')
class Comment(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api), comment_details(api))
    @api.doc(description='''
        User can post a new comment to a thraed
    ''')
    def post(self):
        user = authorize(request)
        (thread_id, publisher_id, content) = unpack(request.json, 'thread_id', 'publisher_id', 'content')
        session = db.get_session()
        comment = db.Comment(thread_id=thread_id, publisher_id=publisher_id, content=content)
        session.add(comment)
        session.commit()
        session.close()
        return {
            'message': 'success'
        }

    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api))
    @api.param('thread_id', 'the id of the thread which the user want to fetch')
    @api.doc(description='''Get the comments of that thread''')
    def get(self):
        user = authorize(request)
        thread_id = int(request.args.get('thread_id', None))
        session = db.get_session()
        comments = session.query(db.Comment).filter_by(thread_id=thread_id).all()
        session.close()
        if (comments is None):
            return None
        commentList = []
        for comment in comments:
            commentList.append(getCommentInfo(comment))
        return commentList

@api.route('/course')
class Threads(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api))
    @api.param('course_id', 'the id of the course which the user want to fetch')
    @api.doc(description='''Get all threads in a course''')
    def get(self):
        authorize(request)
        course_id = int(request.args.get('course_id', None))
        session = db.get_session()
        threads = session.query(db.Thread).filter_by(course_id=course_id).all()
        session.close()
        if (threads is None):
            return None
        threadList = []
        for thread in threads:
            threadList.append(getThreadInfo(thread))
        return threadList

@api.route('/up_vote')
class Vote(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api))
    @api.param('thread_id', 'the id of the thread which the user want to fetch')
    @api.doc(description='''
        User can up vote to a thraed
    ''')
    def post(self):
        authorize(request)
        thread_id = int(request.args.get('thread_id', None))
        session = db.get_session()
        thread = session.query(db.Thread).filter_by(id=thread_id).first()
        if (thread is None):
            abort(400, "Thread does not exist")
        thread.up_vote += 1
        curr_up_vote = thread.up_vote
        session.commit()
        session.close()
        return {
            'curr_up_vote': curr_up_vote
        }