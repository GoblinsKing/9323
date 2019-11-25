from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import hashlib

engine = create_engine('sqlite:///db/dataBase.db?check_same_thread=False', echo = True)
Base = declarative_base()

class User(Base):
    __table__ = Table('User',
                        Base.metadata,
                        Column('id', Integer, primary_key=True),
                        Column('zid', VARCHAR(8)),
                        Column('password', VARCHAR(20)),
                        Column('token', VARCHAR(64)),
                        Column('role', VARCHAR(10)),
                        Column('name', VARCHAR(20)),
                        Column('email', VARCHAR(20)),
                        Column('salt', VARCHAR(64)))

    def __repr__(self):
        return 'User:\nUsername: %s\nRole: %s' % (self.username, self.role)

class Course(Base):
    __table__ = Table('Course',
                        Base.metadata,
                        Column('id', Integer, primary_key=True),
                        Column('code', VARCHAR(8)),
                        Column('title', VARCHAR(50)))

    def __repr__(self):
        return 'Course:\nTitle: %s' % (self.title)

class Teaching(Base):
    __table__ = Table('Teaching',
                        Base.metadata,
                        Column('id', Integer, primary_key=True),
                        Column('lecturer_id', Integer),
                        Column('course_id', Integer),
                        Column('term', VARCHAR(10)))
    def __repr__(self):
        return 'This is Teaching table'

class Enrolment(Base):
    __table__ = Table('Enrolment',
                        Base.metadata,
                        Column('id', Integer, primary_key=True),
                        Column('student_id', Integer),
                        Column('course_id', Integer),
                        Column('term', VARCHAR(10)))
    def __repr__(self):
        return 'This is Enrolment table'

class Resource(Base):
    __table__ = Table('Resource',
                        Base.metadata,
                        Column('id', Integer, primary_key=True),
                        Column('course_id', Integer),
                        Column('title', VARCHAR(40)),
                        Column('group', VARCHAR(20)),
                        Column('content', TEXT))
    def __repr__(self):
        return 'This is Resource table'

class Thread(Base):
    __table__ = Table('Thread',
                        Base.metadata,
                        Column('id', Integer, primary_key=True),
                        Column('course_id', Integer),
                        Column('title', VARCHAR(20)),
                        Column('up_vote', Integer),
                        Column('publisher_id', Integer),
                        Column('content', TEXT))
    def __repr__(self):
        return 'This is Thread table'

class Comment(Base):
    __table__ = Table('Comment',
                        Base.metadata,
                        Column('id', Integer, primary_key=True),
                        Column('thread_id', Integer),
                        Column('publisher_id', Integer),
                        Column('content', TEXT))
    def __repr__(self):
        return 'This is Comment table'

class ChatRoom(Base):
    __table__ = Table('ChatRoom',
                        Base.metadata,
                        Column('id', Integer, primary_key=True),
                        Column('course_id', Integer),
                        Column('channel', VARCHAR(20)))
    def __repr__(self):
        return 'This is ChatRoom table'


class Message(Base):
    __table__ = Table('Message',
                        Base.metadata,
                        Column('id', Integer, primary_key=True),
                        Column('chat_room_id', Integer),
                        Column('user_id', Integer),
                        Column('message', TEXT))
    def __repr__(self):
        return 'This is Message table'

class Group(Base):
    __table__ = Table('Group',
                        Base.metadata,
                        Column('id', Integer, primary_key=True),
                        Column('assignment_id', Integer),
                        Column('leader_id', Integer),
                        Column('title', VARCHAR(20)),
                        Column('topic', VARCHAR(80)),
                        Column('group_chatroom_id', Integer),
                        Column('num_member', Integer),
                        Column('num_backend', Integer),
                        Column('num_frontend', Integer))
                        #Column('members', VARCHAR(20)))
                        #Column('softskill', Integer))
    def __repr__(self):
        return 'This is Group table'

class GroupMember(Base):
    __table__ = Table('GroupMember',
                        Base.metadata,
                        Column('id', Integer, primary_key=True),
                        Column('group_id', Integer),
                        Column('student_id', Integer),
                        Column('role', VARCHAR(20)))
    def __repr__(self):
        return 'This is GroupMember table'

class Assignment(Base):
    __table__ = Table('Assignment',
                        Base.metadata,
                        Column('id', Integer, primary_key=True),
                        Column('course_id', Integer),
                        Column('title', VARCHAR(50)),
                        Column('publish_date', VARCHAR(20)),
                        Column('due_date', VARCHAR(20)),
                        Column('group_size', Integer),
                        Column('all_topics', TEXT),
                        Column('content', TEXT))
    def __repr__(self):
        return 'This is Assignment table'

class Notice(Base):
    __table__ = Table('Notice',
                        Base.metadata,
                        Column('id', Integer, primary_key=True),
                        Column('course_id', Integer),
                        Column('title', VARCHAR(50)),
                        Column('content', TEXT),
                        Column('publisher_id', Integer))
    def __repr__(self):
        return 'This is Notice table'


def init_db():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

    Session = sessionmaker(engine)
    session = Session()
    # init dataBase
    init_user(session)
    init_course(session)
    init_chatRoom(session)
    init_enrolment(session)
    init_assignment(session)
    init_teaching(session)
    init_resources(session)
    init_message(session)
    init_notices(session)
    init_threads(session)
    # finish init
    session.close()

def get_session():
    Session = sessionmaker(engine)
    return Session()

def init_user(session):
    with open('db/users.csv') as f:
        for line in f.readlines():
            line = line.strip().split(',')
            salt = os.urandom(24)
            password_bytes = line[1].encode()
            hash_password = hashlib.sha256(salt + password_bytes).hexdigest()
            user = User(zid=line[0], password=hash_password, token='', role=line[2], name=line[3], email=line[0]+"@unsw.edu.au", salt = salt)
            if (user.role == "admin"):
                user.token = '123'
            session.add(user)
    session.commit()

def init_course(session):
    with open('db/course.csv') as f:
        for line in f.readlines():
            line = line.strip().split(',')
            course = Course(code=line[0], title=line[1])
            session.add(course)
    session.commit()

def init_chatRoom(session):
    courses = session.query(Course)
    for course in courses:
        chatRoom = ChatRoom(course_id=course.id, channel='public')
        session.add(chatRoom)
    session.commit()

def init_enrolment(session):
    with open('db/enrolment.csv') as f:
        for line in f.readlines():
            line = line.strip().split(',')
            enrolment = Enrolment(student_id=line[0], course_id=line[1], term=line[2])
            session.add(enrolment)
    session.commit()

def init_assignment(session):
    with open('db/assignment.csv') as f:
        for line in f.readlines():
            line = line.strip().split(',')
            assignment = Assignment(course_id=line[0], title=line[1], publish_date=line[2], due_date=line[3], group_size=line[4], all_topics=line[5], content=line[6])
            session.add(assignment)
    session.commit()

def init_teaching(session):
    with open('db/teaching.csv') as f:
        for line in f.readlines():
            line = line.strip().split(',')
            teaching = Teaching(lecturer_id=line[0], course_id=line[1], term=line[2])
            session.add(teaching)
    session.commit()

def init_message(session):
    with open('db/chatMessages.csv') as f:
        for line in f.readlines():
            line = line.strip().split(',')
            message = Message(chat_room_id=line[0], user_id=line[1], message=line[2])
            session.add(message)
    session.commit()

def init_notices(session):
    with open('db/notices.csv') as f:
        for line in f.readlines():
            line = line.strip().split(',')
            notice = Notice(course_id=line[0], title=line[1], content=line[2], publisher_id=line[3])
            session.add(notice)
    session.commit()

def init_resources(session):
    with open('db/resources.csv') as f:
        for line in f.readlines():
            line = line.strip().split(',')
            resource = Resource(course_id=line[0], title=line[1], group=line[2], content=line[3])
            session.add(resource)
    session.commit()

def init_threads(session):
    with open('db/threads.csv') as f:
        for line in f.readlines():
            line = line.strip().split(',')
            thread = Thread(course_id=line[0], title=line[1], up_vote=line[2], publisher_id=line[3], content=line[4])
            session.add(thread)
    session.commit()