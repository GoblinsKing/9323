from flask_restplus import Api

from .auth import api as auth
from .user import api as user
from .chat import api as chat
from .course import api as course
from .group import api as group
from .thread import api as thread

api = Api(
    title='Uni-Learn API',
    version='2.0',
    description='An API backend used for the Uni-Learn System'
    # All API metadatas
)

api.add_namespace(auth)
api.add_namespace(user)
api.add_namespace(chat)
api.add_namespace(course)
api.add_namespace(group)
api.add_namespace(thread)