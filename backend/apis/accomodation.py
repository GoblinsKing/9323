from flask_restplus import Namespace, Resource, fields, abort
from flask import request
import db.init_db as db


api = Namespace('acco', description='Accomodation Services')

##
post_accomodation = api.model('post_accomodation', {
  'city': fields.String(required=True, example='Sydney'),
  'suburb': fields.String(required=True, example='Randwick'),
  'location': fields.String(required=True, example='100 York Street'),
  'rent_type': fields.String(required=True, example='Whole House'),
  'num_bedroom': fields.Integer(required=True, example='3'),
  'num_livingroom': fields.Integer(required=True, example='1'),
  'num_bathroom': fields.Integer(required=True, example='2'),
  'num_parking': fields.Integer(required=True, example='3'),
  'property_area': fields.Integer(required=True, example='1'),
  'property_title': fields.String(required=True, example='3 bedroom house'),
  'property_description': fields.String(required=True, example='very good'),
  'transport_description': fields.String(required=True, example='3 bus'),
  'nearby_facilities': fields.String(required=True, example='5 schools and 7 hospitals'),
  'price': fields.Integer(required=True, example='50'),
  'bond': fields.Integer(required=True, example='300'),
  'cleaning_fee': fields.Integer(required=True, example='0'),
  'additional_fee': fields.Integer(required=True, example='0'),
  'minimal_period': fields.Integer(required=True, example='3'),
  'max_period': fields.Integer(required=True, example='365'),
  'additional_request': fields.String(required=False, example='No parsley, extra spicy'),
})
##

@api.route('/post/new_acco')
class PostNewAcco(Resource):
    @api.response(200, 'Success')
    @api.response(400, 'Missing Arguments')
    @api.response(403, 'Invalid Arguments')
    @api.expect(post_accomodation)
    @api.doc('Post new accomodation')
    @api.doc(description='''
        This is used to post a new accomodation.
    ''')
    def post(self):
        (un,ps) = unpack(request.json,'username','password')
        session = db.get_session()
        #our_user = session.query(db.User).filter_by(username='admin').first()
        if not session.query(db.User).filter_by(username=un, password=ps).first():
            abort(403,'Invalid Username/Password')
        t = gen_token()
        #db_r = db.update('USER').set(curr_token=t).where(username=un)
        #db_r.execute()
        return {
            'token': t
        }