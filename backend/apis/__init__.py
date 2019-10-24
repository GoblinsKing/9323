from flask_restplus import Api

from .auth import api as ns1
from .accomodation import api as ns2

api = Api(
    title='My Title',
    version='1.0',
    description='A description',
    # All API metadatas
)

api.add_namespace(ns1)
api.add_namespace(ns2)
