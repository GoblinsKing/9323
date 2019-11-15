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