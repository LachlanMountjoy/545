from flask import Flask, request
from flask_cors import CORS, cross_origin
import random
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


app = Flask(__name__)
CORS(app)

days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
request_params = ['data', 'status', 'statusText', 'headers', 'config', 'request']
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
        'prefernces': [],
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
    user_coffeeshops = set(user['coffeeshops'])
    person_prefs = set(person['preferences'])
    person_avail = set(person['availability'])
    person_coffeeshops = set(person['coffeeshops'])
    return (user_prefs.intersection(person_prefs)
            and user_avail.intersection(person_avail)
            and user_coffeeshops.intersection(person_coffeeshops))


def create_meeting(meeting_id, user1, user2):
    shared_prefs = set(user1['preferences']).intersection(set(user2['preferences']))
    times = list(set(user1['availability']).intersection(set(user2['availability'])))
    coffeeshops = list(set(user1['coffeeshops']).intersection(set(user2['coffeeshops'])))
    return {
        'id': meeting_id,
        'people': [user1['username'], user2['username']],
        'shared_preferences': list(shared_prefs),
        'date': f'{random.choice(days)} {random.choice(times)}',
        'coffeeshop': random.choice(coffeeshops)
    }

def scheduled_meeting(user, meeting_queue):
    has_scheduled = False
    for person in meeting_queue:
        has_scheduled |= user['username'] == person['username']
    return has_scheduled

@app.route('/match-people/<username>')
@cross_origin()
def match_people(username):
    with open('db.json', 'r') as f:
        db = json.load(f)
    user = db['users'][username]
    meeting_queue = db['meeting_queue']
    meeting_person = None
    for i, person in enumerate(meeting_queue):
        if is_compatible(user, person) and person['username'] != user['username']:
            meeting_person = person
            del meeting_queue[i]
            break
    if not meeting_person:
        if not scheduled_meeting(user, meeting_queue):
            meeting_queue.append(user)
            db['meeting_queue'] = meeting_queue
            with open('db.json', 'w') as f:
                db = json.dump(db, f)
        return {"Status": "Unable to find meeting"}
    meeting_id = random.randint(0, 100000000)
    meeting_person['meetings'].append(meeting_id)
    user['meetings'].append(meeting_id)
    db['users'][username] = user
    db['users'][meeting_person['username']] = meeting_person
    db['meeting_queue'] = meeting_queue
    meeting = create_meeting(meeting_id, user, meeting_person)
    db['meetings'].append(meeting)
    sender = 'stevenscoffeechat@gmail.com'
    recipients = meeting['people']
    msg = MIMEMultipart()
    msg['Subject'] = 'Your CoffeeChat Meeting is Ready!'
    msg['From'] = "stevenscoffeechat@gmail.com"
    msg['To'] = ",".join(recipients)
    body = "Hello! The details of your meeting are now available: http://localhost:3000"
    msg.attach(MIMEText(body, 'plain'))
    with smtplib.SMTP('smtp.gmail.com', 587) as s:
        s.ehlo()
        s.login('stevenscoffeechat@gmail.com', '')
        s.sendmail(sender, recipients, msg.as_string())
    with open('db.json', 'w') as f:
        db = json.dump(db, f)
    return meeting


@app.route('/get-meetings/<username>')
@cross_origin()
def get_meetings(username):
    with open('db.json', 'r') as f:
        db = json.load(f)
    meeting_ids = db['users'][username]['meetings']
    meeting_details = []
    for meeting_id in meeting_ids:
        for meeting in db['meetings']:
            if meeting['id'] == meeting_id:
                meeting_details.append(meeting)
    return {'meetings': meeting_details}

def extract_preferences(preferences):
    with open('../coffeechat/src/preferences.json', 'r') as f:
        all_preferences = json.load(f)['preferences']
    preferences = set(preferences)
    times = set(all_preferences['Time'])
    locations = set(all_preferences['Location'])
    availability = preferences.intersection(times)
    coffeeshops = preferences.intersection(locations)
    preferences = preferences - availability
    preferences = preferences - coffeeshops
    return list(preferences), list(availability), list(coffeeshops)

@app.route('/save-preferences', methods=['POST'])
@cross_origin()
def save_preferences():
    username = request.json['username']
    preferences = request.json['preferences']
    print(preferences)
    preference_list = [key for key, val in preferences.items() if val]
    preference_list = list(filter(lambda x: x not in request_params, preference_list))
    preference_list, availability, coffeeshops = extract_preferences(preference_list)
    with open('db.json', 'r') as f:
        db = json.load(f)
    db['users'][username]['preferences'] = preference_list
    db['users'][username]['availability'] = availability
    db['users'][username]['coffeeshops'] = coffeeshops
    with open('db.json', 'w') as f:
        db = json.dump(db, f)
    return {'Status': 'Success'}


@app.route('/load-preferences/<username>')
@cross_origin()
def load_preferences(username):
    with open('db.json', 'r') as f:
        db = json.load(f)
    preferences = db['users'][username]['preferences']
    preferences.extend(db['users'][username]['availability'])
    preferences.extend(db['users'][username]['coffeeshops'])
    return {'preferences': preferences}


if __name__ == '__main__':
    app.run('127.0.0.1', port=8000, debug=True)
