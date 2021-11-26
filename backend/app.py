from flask import Flask, request
from flask_cors import CORS, cross_origin
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
    if db['users']['usersname']['password'] != password:
        return {'Error': 'Incorrect login credentials'}
    return {'User': username, 'id': db['id']}

if __name__ == '__main__':
    app.run('127.0.0.1', port=8000, debug=True)
