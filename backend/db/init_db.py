from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

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
                        Column('email', VARCHAR(20)))

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
                        Column('title', VARCHAR(20)),
                        #Column('publish_time', VARCHAR(20)),
                        Column('publisher_id', Integer),
                        #Column('due_date', VARCHAR(20)),
                        Column('content', TEXT))
    def __repr__(self):
        return 'This is Resource table'

class Thread(Base):
    __table__ = Table('Thread',
                        Base.metadata,
                        Column('id', Integer, primary_key=True),
                        Column('course_id', Integer),
                        Column('title', VARCHAR(20)),
                        #Column('publish_time', VARCHAR(20)),
                        Column('publisher_id', Integer),
                        Column('content', TEXT))
    def __repr__(self):
        return 'This is Thread table'

class Comment(Base):
    __table__ = Table('Comment',
                        Base.metadata,
                        Column('id', Integer, primary_key=True),
                        #Column('publish_time', VARCHAR(20)),
                        Column('publisher_id', Integer),
                        Column('content', TEXT))
    def __repr__(self):
        return 'This is Comment table'

class ChatRoom(Base):
    __table__ = Table('ChatRoom',
                        Base.metadata,
                        Column('id', Integer, primary_key=True),
                        Column('course_id', Integer),
                        Column('title', VARCHAR(20)))
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
                        Column('course_id', Integer),
                        Column('leader_id', Integer),
                        Column('title', VARCHAR(20)),
                        Column('topic_id', Integer),
                        Column('num_member', Integer),
                        Column('num_backend', Integer),
                        Column('num_frontend', Integer),
                        Column('softskill', Integer))
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
                        Column('title', VARCHAR(20)),
                        Column('due_date', VARCHAR(20)),
                        Column('group_size', Integer),
                        Column('all_topics', TEXT),
                        Column('content', TEXT))
    def __repr__(self):
        return 'This is Assignment table'


def init_db():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

    Session = sessionmaker(engine)
    session = Session()
    # init dataBase
    init_user(session)
    init_course(session)
    init_chatRoom(session)
    # finish init
    session.close()

def get_session():
    Session = sessionmaker(engine)
    return Session()

def init_user(session):
    with open('db/users.csv') as f:
        for line in f.readlines():
            line = line.strip().split(',')
            user = User(zid=line[0], password=line[1], token='', role=line[2], name=line[3], email='email@gg.com')
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
        chatRoom = ChatRoom(course_id=course.id, title='public')
        session.add(chatRoom)
    session.commit()