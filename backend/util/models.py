from flask_restplus import fields

def auth_details(api):
    return api.parser().add_argument('Authorization', help="Your Authorization Token in the form '<AUTH_TOKEN>'", location='headers')

def update_user(api):
    return api.model('update_user', {
    'password': fields.String(required=True, example='SamplePassword'),
    'email': fields.String(required=True, example='peter@gmail.com'),
    'role': fields.String(required=True, example='student')
    })

def login_details(api):
    return api.model('login_details', {
    'zid': fields.String(required=True, example='z5100000'),
    'password': fields.String(required=True, example='eantio'),
    })

def message_details(api):
    return api.model('message_details', {
    'chat_room_id': fields.Integer(required=True, example='1'),
    'message': fields.String(required=True, example='Hello World')
    })

def create_group_details(api):
    return api.model('create_group_details', {
    'assignment_id': fields.Integer(required=True, example='1'),
    'title': fields.String(required=True, example='Best Group'),
    'topic': fields.String(required=True, example='Learning management system'),
    'backend_skill': fields.Integer(required=True, example='3'),
    'frontend_skill': fields.Integer(required=True, example='2')
    })

def group_match_details(api):
    return api.model('group_match_details', {
    'assignment_id': fields.Integer(required=True, example='1'),
    'topic': fields.String(required=True, example='Learning management system'),
    'backend_skill': fields.Integer(required=True, example='3'),
    'frontend_skill': fields.Integer(required=True, example='2')
    })

def assignment_details(api):
    return api.model('assignment_details', {
    'course_id': fields.Integer(required=True, example='1'),
    'title': fields.String(required=True, example='Group Project'),
    'publish_date': fields.String(required=True, example='2019-11-10'),
    'due_date': fields.String(required=True, example='2019-11-30'),
    'group_size': fields.Integer(required=True, example='4'),
    'all_topics': fields.Integer(required=True, example='Project-based learning Management App|Peer review App'),
    'content': fields.String(required=True, example='You need to develop an app')
    })

def notice_details(api):
    return api.model('notice_details', {
    'course_id': fields.Integer(required=True, example='1'),
    'title': fields.String(required=True, example='You can start quiz2 now'),
    'content': fields.String(required=True, example='This quiz will due next week'),
    'publisher_id': fields.Integer(required=True, example='1')
    })

def resource_details(api):
    return api.model('resource_details', {
    'course_id': fields.Integer(required=True, example='1'),
    'title': fields.String(required=True, example='Week3 Lecture Note'),
    'group': fields.String(required=True, example='Week3'),
    'content': fields.String(required=True, example='This is a note.')
    })

def thread_details(api):
    return api.model('thread_details', {
    'course_id': fields.Integer(required=True, example='1'),
    'title': fields.String(required=True, example='Do we need to submit the code?'),
    'content': fields.String(required=True, example='Or we only need to submit the report?')
    })

def comment_details(api):
    return api.model('comment_details', {
    'thread_id': fields.Integer(required=True, example='1'),
    'publisher_id': fields.Integer(required=True, example='1'),
    'content': fields.String(required=True, example='Only the report need to be submited.')
    })