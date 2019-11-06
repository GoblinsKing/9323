import secrets
import db.init_db as db
from flask_restplus import abort

def gen_token():
    token = secrets.token_hex(32)
    #while db.exists("USER").where(curr_token=token):
    #    token = secrets.token_hex(32)
    return token

def unpack(j, *args, **kargs):
    #result = []
    #for arg in args:
    #    result.append(j.get(arg))
    #return result
    r = [j.get(arg, None) for arg in args]
    if kargs.get("required", True):
        [abort(kargs.get("Missing Arguments", 400)) for e in r if e == None]
    return r

def getAccomodationInfo(raw):
    session = db.get_session()
    # get the images list
    images = session.query(db.RoomPicture).filter_by(property_id=raw.id).all()
    imageList = []
    for image in images:
        imageList.append(getRoomPictureInfo(image))
    # get the booking list
    bookings = session.query(db.Booking).filter_by(property_id=raw.id).all()
    bookingList = []
    for booking in bookings:
        bookingList.append(getBookingInfo(booking))
    # get the comment list
    reviews = session.query(db.Review).filter_by(property_id=raw.id).all()
    session.close()
    reviewList = []
    for review in reviews:
        reviewList.append(getReviewInfo(review))
    return {
            "id": raw.id,
            'landlord_id': raw.landlord_id,
            'city': raw.city,
            'suburb': raw.suburb,
            'location': raw.location,
            'rent_type': raw.rent_type,
            'num_bedroom': raw.num_bedroom,
            'num_livingroom': raw.num_livingroom,
            'num_bathroom': raw.num_bathroom,
            'num_parking': raw.num_parking,
            'property_area': raw.property_area,
            'property_title': raw.property_title,
            'property_description': raw.property_description,
            'transport_description': raw.transport_description,
            'nearby_facilities': raw.nearby_facilities,
            'price': raw.price,
            'bond': raw.bond,
            'cleaning_fee': raw.cleaning_fee,
            'additional_fee': raw.additional_fee,
            'minimal_period': raw.minimal_period,
            'max_period': raw.max_period,
            'additional_request': raw.additional_request,
            'imageList': imageList,
            'bookingList': bookingList,
            'reviewList': reviewList
        }

def getRoomPictureInfo(raw):
    return {
            "id": raw.id,
            'property_id': raw.property_id,
            'room_name': raw.room_name,
            'image': raw.image
        }

def getBookingInfo(raw):
    return {
            "id": raw.id,
            'property_id': raw.property_id,
            'checkin_date': raw.checkin_date,
            'checkout_date': raw.checkout_date,
            'tenant_id': raw.tenant_id
        }

def getReviewInfo(raw):
    return {
            "id": raw.id,
            'user_id': raw.user_id,
            'property_id': raw.property_id,
            'date': raw.date,
            'rating': raw.rating,
            'review': raw.review
        }

def getFacilityInfo(raw):
    return {
            'property_id': raw.property_id,
            'toothbrush': raw.toothbrush,
            'towel': raw.towel,
            'bathtub': raw.bathtub,
            'hot_water': raw.hot_water,
            'television': raw.television,
            'air_conditioner': raw.air_conditioner,
            'fridge': raw.fridge,
            'washing_machine': raw.washing_machine,
            'wifi': raw.wifi,
            'heater': raw.heater,
            'elevator': raw.elevator
        }

def authorize(request):
    t = request.headers.get('Authorization', None)
    if not t:
        abort(403, 'Unsupplied Authorization Token')
    #try:
    #    t = t.split(" ")[1]
    #except:
    #    abort(403, 'Invalid Authorization Token')
    session = db.get_session()
    user = session.query(db.User).filter_by(token = t).first()
    session.close()
    if not user:
        abort(403, 'Invalid Authorization Token')
    return user