from flask_restplus import Api

from .auth import api as auth
from .user import api as user
from .message import api as message

api = Api(
    title='Uni-Learn API',
    version='2.0',
    description='An API backend'
    # All API metadatas
)

api.add_namespace(auth)
api.add_namespace(user)
api.add_namespace(message)