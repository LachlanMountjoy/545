import React, { useState, useEffect } from 'react';
import axios from 'axios';

let backendRoute = '127.0.0.1:8000/'
let getMeeting = async (username) => {
    let meetings = await axios.get(backendRoute + `get-meetings/${username}`,)
    return meetings
}

function Dashboard({userObject}){
    let [meetings, setMeetings] = useState(0);
    setMeetings(useEffect(() => getMeeting(userObject.username)));
    return (
        // Iterate over the userObject's meeting field to display all the meetings for a User
        <div className="Meetings">
            {meetings.map(meeting => <p>{meeting}</p>)}
      </div>
    );
}

export default Dashboard;
