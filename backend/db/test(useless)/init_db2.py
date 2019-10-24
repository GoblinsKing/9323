from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine('sqlite:///foo.db?check_same_thread=False', echo = True)
#engine = create_engine('sqlite:///foo.db?check_same_thread=False')
Base = declarative_base()

class User(Base):
    # 指定本类映射到users表
    __tablename__ = 'users'
    
    # 指定id映射到id字段; id字段为整型，为主键
    id = Column(Integer, primary_key=True)
    # 指定name映射到name字段; name字段为字符串类形，
    name = Column(String(20))
    fullname = Column(String(32))
    password = Column(String(32))

    def __repr__(self):
        return "<User(name='%s', fullname='%s', password='%s')>" % (
                   self.name, self.fullname, self.password)

class AccountStore(Base):
    __table__ = Table('account_store',
                        Base.metadata,
                        Column('account_id', Integer, primary_key=True),
                        Column('password', String(50)))

    def __repr__(self):
        return 'Items: %s\nAccount: %s\nPassword: %s' % (self.items, self.account, self.password)

        
#print(AccountStore.__table__)
#Base.metadata.reflect(engine)
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()
ed_user = User(name='ed', fullname='Ed Jones', password='edspassword')
new_acc = AccountStore(account_id='1', password='pass')
new_acc2 = AccountStore(password='pass')
session.add(ed_user)
#session.add(new_acc)
session.add(new_acc2)
session.commit()