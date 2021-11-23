#!/usr/bin/env python3
import json
fresh_db = {"id": 0, "users": {}}
with open('db.json', 'w') as f:
    json.dump(fresh_db, f)
