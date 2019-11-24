import secrets
import db.init_db as db
from flask_restplus import abort

def gen_token():
    token = secrets.token_hex(32)
    #while db.exists("USER").where(curr_token=token):
    #    token = secrets.token_hex(32)
    return token

def unpack(j, *args, **kargs):
    #result = []
    #for arg in args:
    #    result.append(j.get(arg))
    #return result
    r = [j.get(arg, None) for arg in args]
    if kargs.get("required", True):
        [abort(kargs.get("Missing Arguments", 400)) for e in r if e == None]
    return r

def getMessageInfo(raw):
    session = db.get_session()
    user = session.query(db.User).filter_by(id=raw.user_id).first()
    session.close()
    return {
            "id": raw.id,
            'user_id': raw.user_id,
            'user_name': user.name,
            'message': raw.message
    }

def getEnrolmentInfo(raw):
    return{
            "id": raw.id,
            'student_id': raw.student_id,
            'course_id': raw.course_id,
            'term': raw.term
    }

def getCourseInfo(raw):
    return{
            "id": raw.id,
            'code': raw.code,
            'title': raw.title
    }

def getGroupInfo(raw):
    return{
            "id": raw.id,
            'assignment_id': raw.assignment_id,
            'leader_id': raw.leader_id,
            "title": raw.title,
            'topic': raw.topic,
            "group_chatroom_id": raw.group_chatroom_id,
            'num_member': raw.num_member,
            "num_backend": raw.num_backend,
            'num_frontend': raw.num_frontend
    }

def getAssignmentInfo(raw):
    return{
            "id": raw.id,
            'course_id': raw.course_id,
            'title': raw.title,
            'publish_date': raw.publish_date,
            "due_date": raw.due_date,
            'group_size': raw.group_size,
            'all_topics': raw.all_topics,
            "content": raw.content
    }    

def getNoticeInfo(raw):
    return{
            "id": raw.id,
            'course_id': raw.course_id,
            'title': raw.title,
            "content": raw.content,
            'publisher_id': raw.publisher_id
    }

def getGroupMebmerInfo(raw):
    return{
            "id": raw.id,
            'group_id': raw.group_id,
            'student_id': raw.student_id,
            "role": raw.role
    }

def getResourceInfo(raw):
    return{
            "id": raw.id,
            'course_id': raw.course_id,
            'title': raw.title,
            'group': raw.group,
            'content': raw.content
    }

def getStaffInfo(raw):
    session = db.get_session()
    user = session.query(db.User).filter_by(id=raw.lecturer_id).first()
    session.close()
    return{
            "id": raw.id,
            'lecturer_id': raw.lecturer_id,
            'course_id': raw.course_id,
            'term': raw.term,
            'user_name': user.name,
            'email': user.email,
            'role': user.role
    }

def getThreadInfo(raw):
    session = db.get_session()
    comments = session.query(db.Comment).filter_by(thread_id=raw.id).all()
    user = session.query(db.User).filter_by(id=raw.publisher_id).first()
    session.close()
    commentList = []
    if (comments is not None):
        for comment in comments:
            commentList.append(getCommentInfo(comment))
    return{
            "id": raw.id,
            'course_id': raw.course_id,
            'title': raw.title,
            'publisher_name': user.name,
            'content': raw.content,
            'comments': commentList,
            "up_vote": raw.up_vote
    }

def getCommentInfo(raw):
    return{
            "id": raw.id,
            'thread_id': raw.thread_id,
            'content': raw.content,
            'publisher_id': raw.publisher_id
    }

def authorize(request):
    t = request.headers.get('Authorization', None)
    if not t:
        abort(403, 'Unsupplied Authorization Token')
    #try:
    #    t = t.split(" ")[1]
    #except:
    #    abort(403, 'Invalid Authorization Token')
    session = db.get_session()
    user = session.query(db.User).filter_by(token = t).first()
    session.close()
    if not user:
        abort(403, 'Invalid Authorization Token')
    return user