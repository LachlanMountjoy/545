import React, { useState, useEffect } from 'react';
import axios from 'axios';

let backendRoute = '127.0.0.1:8000/'
let getMeeting = async (setMeetings, username) => {
    let meetings = await axios.get(backendRoute + `get-meetings/${username}`)['data']['meetings']
    setMeetings(meetings)
}

function Dashboard({userObject}){
    console.log(userObject)
    let [meetings, setMeetings] = useState(null);
    useEffect(() => {
        if(meetings === null) {
            getMeeting(setMeetings, userObject['username']);
        }
    }, [meetings, userObject])
    return (
        // Iterate over the userObject's meeting field to display all the meetings for a User
        <div className="Meetings">
            {meetings.map(meeting => <p>{meeting}</p>)}
      </div>
    );
}

export default Dashboard;
