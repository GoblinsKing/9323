from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine('sqlite:///r-test.db?check_same_thread=False', echo = True)
Base = declarative_base()

class User(Base):
    __table__ = Table('User',
                        Base.metadata,
                        Column('id', Integer, primary_key=True),
                        Column('username', VARCHAR(10)),
                        Column('password', VARCHAR(10)))

    def __repr__(self):
        return 'User:\nUsername: %s\nPassword: %s' % (self.username, self.password)
        #return 'This is "User" table'

def init():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

    Session = sessionmaker(engine)
    session = Session()
    admin = User(username='admin', password='admin')

    session.add(admin)
    session.commit()
    session.close()

def get_session():
    Session = sessionmaker(engine)
    return Session()