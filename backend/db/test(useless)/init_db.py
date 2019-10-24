import sqlite3
import os

def clear_db(c):
    c.execute('DROP TABLE IF EXISTS USERS')
    c.execute('DROP TABLE IF EXISTS POSTS')
    c.execute('DROP TABLE IF EXISTS COMMENTS')

def create_tables(c):
    c.execute('CREATE TABLE USERS(\
    id INTEGER PRIMARY KEY,\
    username text,\
    password text,\
    curr_token text\
    )')

def init_db():
    # connect
    db = sqlite3.connect(os.path.join('test.db'))
    c = db.cursor()

    clear_db(c)
    create_tables(c)

    # Create anon user
    c.execute('INSERT INTO USERS VALUES(1,"Anon","My-password","")')
    c.execute('INSERT INTO USERS VALUES(2,"abc","abcd","")')

    # clean up
    db.commit()
    c.close()
    db.close()

if __name__ == "__main__":
    init_db()