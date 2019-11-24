from flask_restplus import Namespace, Resource, abort
from flask import request
from util.helper import *
import db.init_db as db
from util.models import create_group_details, auth_details, group_match_details

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
            skill = 'backend'
        elif (backend_skill > frontend_skill):
            num_backend = 1
            skill = 'backend'
        else:
            num_frontend = 1
            skill = 'frontend'
        curr_assignment = session.query(db.Assignment).filter_by(id=assignment_id).first()
        group_chatroom = db.ChatRoom(course_id=curr_assignment.course_id, channel="group")
        session.add(group_chatroom)
        session.commit()
        new_group = db.Group(assignment_id=assignment_id, leader_id=user.id, title=title, topic=topic, group_chatroom_id = group_chatroom.id, num_member=1, num_backend=num_backend, num_frontend=num_frontend)
        session.add(new_group)
        session.commit()
        new_member = db.GroupMember(group_id=new_group.id, student_id=user.id, role=skill)
        session.add(new_member)
        session.commit()
        session.close()
        return {
            'message': 'success'
        }

@api.route('/member')
class GroupMember(Resource):
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
        #group.members += "|"
        #group.members += str(user.id)
        new_member = db.GroupMember(group_id=group.id, student_id=user.id, role=skill)
        session.add(new_member)
        session.commit()
        session.close()
        return {
            'message': 'success'
        }

    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api))
    @api.param('group_id', 'the id of the group which the user want to check')
    @api.doc(description='''Get all group member info''')
    def get(self):
        authorize(request)
        group_id = int(request.args.get('group_id', None))
        session = db.get_session()
        members = session.query(db.GroupMember).filter_by(group_id=group_id).all()
        session.close()
        if (members is None):
            return None
        memberList = []
        for member in members:
            memberList.append(getGroupMebmerInfo(member))
        return memberList

@api.route('/match')
class MatchGroup(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api), group_match_details(api))
    @api.doc(description='''
        User can match the group which is best for him
    ''')
    def post(self):
        user = authorize(request)
        (assignment_id, topic, backend_skill, frontend_skill) = unpack(request.json, 'assignment_id', 'topic', 'backend_skill', 'frontend_skill')
        session = db.get_session()
        if (backend_skill >= frontend_skill):
            skill = 'backend'
        else:
            skill = 'frontend'
        groups = session.query(db.Group).filter_by(assignment_id=assignment_id, topic=topic).all()
        assignment = session.query(db.Assignment).filter_by(id=assignment_id).first()
        if (assignment is None):
            abort(400, "Assignment does not exist")
        group_size = assignment.group_size
        found = False
        for group in groups:
            if (group.num_member == group_size):
                continue
            if (skill == 'backend'):
                if (group.num_frontend >= group.num_backend):
                    found = True
                    group.num_backend += 1
                    break
            if (skill == 'frontend'):
                if (group.num_frontend <= group.num_backend):
                    found = True
                    group.num_frontend += 1
                    break
        if (not found):
            return {
                'message': 'Sorry, we cannot find a group for you. You can create a new group.'
            }
        new_member = db.GroupMember(group_id=group.id, student_id=user.id, role=skill)
        session.add(new_member)
        group.num_member += 1
        session.commit()
        group_id = group.id
        session.close()
        return {
            'group_id': group_id
        }

@api.route('/all')
class AllGroup(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api))
    @api.param('assignment_id', 'the id of the assignment which the user want to fetch')
    @api.doc(description='''Get all group info by assignment''')
    def get(self):
        authorize(request)
        assignment_id = int(request.args.get('assignment_id', None))
        session = db.get_session()
        groups = session.query(db.Group).filter_by(assignment_id=assignment_id).all()
        session.close()
        if (groups is None):
            return None
        groupList = []
        for group in groups:
            groupList.append(getGroupInfo(group))
        return groupList

@api.route('/leave')
class LeaveGroup(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Auth Token')
    @api.expect(auth_details(api))
    @api.param('group_id', 'the id of the group which the user want to leave')
    @api.doc(description='''The user can leave the current group''')
    def get(self):
        user = authorize(request)
        group_id = int(request.args.get('group_id', None))
        session = db.get_session()
        group = session.query(db.Group).filter_by(id=group_id).first()
        groupMember = session.query(db.GroupMember).filter_by(group_id=group.id, student_id=user.id).first()
        if (groupMember is None):
            abort(400, "The user is not in that group.")
        group.num_member -= 1
        if (groupMember.role == 'backend'):
            group.num_backend -= 1
        else:
            group.num_frontend -= 1
        session.delete(groupMember)
        session.commit()
        session.close()
        return {
            'message': 'success'
        }