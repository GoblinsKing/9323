from flask import Flask
from apis import api
from flask_cors import CORS
#
import db.init_db as db
db.init_db()
#
app = Flask(__name__)
api.init_app(app)
CORS(app)



app.run(debug=True)
#app.run(debug=True, ssl_context=('localhost.crt', 'localhost.key'))