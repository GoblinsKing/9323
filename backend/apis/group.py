from flask_restplus import Namespace, Resource, abort
from flask import request
from util.helper import *
import db.init_db as db
from util.models import create_group_details, auth_details

api = Namespace('group', description='Group Services')

@api.route('/')
class Group(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api))
    @api.param('group_id', 'the id of the group which the user want to fetch')
    @api.doc(description='''Get the group info by id''')
    def get(self):
        authorize(request)
        group_id = int(request.args.get('group_id', None))
        session = db.get_session()
        curr_group = session.query(db.Group).filter_by(id=group_id).first()
        session.close()
        if (curr_group is None):
            return None
        return{
            'groupInfo': getGroupInfo(curr_group)
        }

@api.route('/create')
class CreateGroup(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api), create_group_details(api))
    @api.doc(description='''
        User can create a group<br>
        The skill level is indicated by an integer, 3 means advanced level and 1 means beginner level
    ''')
    def post(self):
        user = authorize(request)
        (assignment_id, title, topic, backend_skill, frontend_skill) = unpack(request.json, 'assignment_id', 'title', 'topic', 'backend_skill', 'frontend_skill')
        session = db.get_session()
        num_backend = 0
        num_frontend = 0
        if (backend_skill == frontend_skill):
            num_backend = 1
        elif (backend_skill > frontend_skill):
            num_backend = 1
        else:
            num_frontend = 1
        new_group = db.Group(assignment_id=assignment_id, leader_id=user.id, title=title, topic=topic, num_member=1, num_backend=num_backend, num_frontend=num_frontend, members=user.id)
        session.add(new_group)
        session.commit()
        session.close()
        return {
            'message': 'success'
        }

@api.route('/join')
class JoinGroup(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api))
    @api.param('group_id', 'the id of the group which the user want to join')
    @api.param('skill', 'the skill which the user has<br>skill must be either "backend" or "frontend"')
    @api.doc(description='''
        User can join an existing group
    ''')
    def post(self):
        user = authorize(request)
        group_id = int(request.args.get('group_id', None))
        skill = request.args.get('skill', None)
        if (skill != 'backend' and skill != 'frontend'):
            abort(400, "Wrong skill input")
        session = db.get_session()
        group = session.query(db.Group).filter_by(id=group_id).first()
        if (group is None):
            abort(400, "Group is not exist")
        group.num_member += 1
        if (skill == 'backend'):
            group.num_backend += 1
        else:
            group.num_frontend += 1
        group.members += "|"
        group.members += str(user.id)
        session.commit()
        session.close()
        return {
            'message': 'success'
        }

@api.route('/match')
class MatchGroup(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api))
    @api.doc(description='''
        User can match the group which is best for him
    ''')
    def post(self):
        user = authorize(request)
        
        return {
            'message': 'success'
        }