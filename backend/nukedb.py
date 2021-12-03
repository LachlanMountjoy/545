#!/usr/bin/env python3
import json
fresh_db = {"id": 0, "users": {}, "meeting_queue": [], "meetings":[]}
with open('db.json', 'w') as f:
    json.dump(fresh_db, f)
