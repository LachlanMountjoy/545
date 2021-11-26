from flask import Flask, request
from flask_cors import CORS, cross_origin
import random
import json

app = Flask(__name__)
CORS(app)

@app.route('/sign-up', methods=['POST'])
@cross_origin()
def sign_up():
    # Intentionally left as bad practice
    username = request.json['username']
    password = request.json['password']
    with open('db.json', 'r') as f:
        db = json.load(f)
    if username in db['users']:
        # As of flask V1.1.0 jsonify gets implicitly called on dict returns
        return {'Error': 'User already exists'}
    db['users'][username] = {
        'username': username,
        'password': password,
        'id': db['id'],
        'name': '',
        'email': '',
        'prefences': [],
        'availability': {},
        'coffeeshops': [],
        'meetings': []
    }
    db['id'] += 1
    with open('db.json', 'w') as f:
        json.dump(db, f)
    return {'User': username, 'id': db['id']}

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    # Intentionally left as bad practice
    username = request.json['username']
    password = request.json['password']
    with open('db.json', 'r') as f:
        db = json.load(f)
    if username not in db['users']:
        # As of flask V1.1.0 jsonify gets implicitly called on dict returns
        return {'Error': 'Incorrect login credentials'}
    if db['users'][username]['password'] != password:
        return {'Error': 'Incorrect login credentials'}
    return {'User': username, 'id': db['id']}

def is_compatible(user, person):
    user_prefs = set(user['preferences'])
    user_avail = set(user['availability'])
    user_coffeshops = set(user['coffeeshops'])
    person_prefs = set(person['preferences'])
    person_avail = set(person['avail'])
    person_coffeeshops = set(person['coffeeshops'])
    return (user_prefs.union(person_prefs)
            and user_avail.union(person_avail)
            and user_coffeshops.union(person_coffeeshops))

@app.route('/match-people')
def match_people(user1, user2):
    username = request.args.get('username')
    with open('db.json', 'r') as f:
        db = json.load(f)
    user = db['users'][username]
    meeting_queue = db['meeting_queue']
    meeting_person = None
    for i, person in meeting_queue:
        if is_compatible(user, person):
            meeting_person = person
            del meeting_queue[i]
            break
    if not meeting_person:
        return {"Status": "Unable to find meeting"}
    meeting_id = random.randint(0, 100000000)
    meeting_person['meetings'].append(meeting_id)
    user['meetings'].append(meeting_id)
    db['user'][username] = user
    db['user'][meeting_person['username']] = meeting_person
    db['meeting_queue'] = meeting_queue
    meeting = create_meeting(meeting_id)
    db['meetings'].append(meeting)
    with open('db.json', 'w') as f:
        db = json.dump(db, f)
    return meeting

def create_meeting(meeting_id, user1, user2):
    pref_union = set(user1['preferences']).union(set(user2['preferences']))
    dates = list(set(user1['availability']).union(set(user2['availability'])))
    coffeshops = list(set(user1['coffeshops']).union(set(user2['coffeshops'])))
    return {
        'id': meeting_id,
        'people': [user1, user2],
        'shared_preferences': list(pref_union),
        'date': random.choice(dates),
        'coffeeshop': random.choice(coffeshops)
    }

if __name__ == '__main__':
    app.run('127.0.0.1', port=8000, debug=True)
