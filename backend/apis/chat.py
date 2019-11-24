from flask_restplus import Namespace, Resource, abort
from flask import request
from util.helper import *
import db.init_db as db
from util.models import message_details, auth_details

api = Namespace('chat', description='Online Chat Services')

@api.route('/message')
class Chat(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
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

@api.route('/message/search')
class ChatSearch(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api))
    @api.param('chat_room_id', 'the id of the chatroom which the user want to fetch')
    @api.param('key_word', 'the key word you want to search')
    @api.doc(description='''Search chat room messages''')
    def get(self):
        user = authorize(request)
        chat_room_id = int(request.args.get('chat_room_id', None))
        key_word = request.args.get('key_word', None)
        session = db.get_session()
        messages = session.query(db.Message).filter_by(chat_room_id=chat_room_id).all()
        session.close()
        messageList = []
        for message in messages:
            if (key_word in message.message):
                messageList.append(getMessageInfo(message))
        return messageList

@api.route('/chatroom')
class Chatroom(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api))
    @api.param('course_id', 'the id of the course which the user want to fetch')
    @api.param('channel', 'the channel which the user want to fetch(must be either "public" or "group")')
    @api.doc(description='''Get chat room id''')
    def get(self):
        user = authorize(request)
        course_id = int(request.args.get('course_id', None))
        channel = request.args.get('channel', None)
        if (channel != "public" and channel != "group"):
            abort(400, "Wrong channel request")
        session = db.get_session()
        if (channel == "public"):
            chatroom = session.query(db.ChatRoom).filter_by(course_id=course_id).filter_by(channel=channel).first()
            session.close()
        else:
            assignments = session.query(db.Assignment)
            for assignment in assignments:
                if (assignment.course_id == course_id):
                    break
            groupMembers = session.query(db.GroupMember).filter_by(student_id=user.id).all()
            if (groupMembers is None):
                abort(400, "User is not in a group")
            found = 0
            for groupMember in groupMembers:
                group = session.query(db.Group).filter_by(id=groupMember.group_id).first()
                if (group.assignment_id == assignment.id):
                    found = 1
                    break
            session.close()
            if (found == 0):
                return None
            return {
                'chat_room_id': group.group_chatroom_id
            }
        if (chatroom is None):
            return None
        return{
            'chat_room_id': chatroom.id
        }