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
    return {
            "id": raw.id,
            'user_id': raw.user_id,
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
            'num_member': raw.num_member,
            "num_backend": raw.num_backend,
            'num_frontend': raw.num_frontend
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