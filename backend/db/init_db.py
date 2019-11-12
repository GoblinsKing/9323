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
                        Column('title', VARCHAR(20)))

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
                        Column('user_zid', Integer),
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
    init_user(session)
    admin = User(zid='z5000000', password='admin', role='admin', name='Admin', email='admin@goThere.con', token='123')
    session.add(admin)
    session.commit()
    session.close()

def get_session():
    Session = sessionmaker(engine)
    return Session()

def init_user(session):
    with open('db/users.csv') as f:
        for line in f.readlines():
            line = line.strip().split(',')
            #e = f"{user['username']}@unsw.edu.au"
            #print(line)
            user = User(zid=line[0], password=line[1], token='', role=line[2], name=line[3], email='email@gg.com')
            session.add(user)
    session.commit()