import db.init_db as db
#db.init()
session = db.get_session()
our_user = session.query(db.User).filter_by(username='123').first()
print(our_user)
session.close()