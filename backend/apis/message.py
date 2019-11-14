from flask_restplus import Namespace, Resource, abort
from flask import request
from util.helper import *
import db.init_db as db
from util.models import message_details, auth_details

api = Namespace('chat', description='Online Chat Services')

@api.route('/chat')
class Login(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Username/Password')
    @api.response(403, 'Invalid Username/Password')
    @api.expect(auth_details(api), message_details(api))
    @api.doc(description='''
        User can send a new message
    ''')
    def post(self):
        user = authorize(request)
        (chat_room_id, message) = unpack(request.json, 'chat_room_id', 'message')
        session = db.get_session()
        message = db.Message(chat_room_id=chat_room_id, user_id=user.id, message=message)
        session.add(message)
        session.commit()
        session.close()
        return {
            'message': 'success'
        }

    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api))
    @api.param('chat_room_id', 'the id of the chatroom which the user want to fetch')
    @api.doc(description='''Get chat room messages''')
    def get(self):
        user = authorize(request)
        chat_room_id = int(request.args.get('chat_room_id', None))
        session = db.get_session()
        messages = session.query(db.Message).filter_by(chat_room_id=chat_room_id).all()
        session.close()
        messageList = []
        for message in messages:
            messageList.append(getMessageInfo(message))
        return messageList