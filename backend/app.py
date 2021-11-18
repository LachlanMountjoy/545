from flask import Flask, request
import json

app = Flask(__name__)

@app.route('/sign-up', methods=['POST'])
def sign_up():
    # Intentionally left as bad practice
    username = request.args['username']
    password = request.args['password']
    with open('db.json', 'r') as f:
        db = json.load(f)
    if username in db:
        # As of flask V1.1.0 jsonify gets implicitly called on dict returns
        return {"Error": "User already exists"}
    db[username] = password
    with open('db.json', 'w') as f:
        json.dump(db, f)
    return {"Status": "User Created"}
