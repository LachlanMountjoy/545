import React, { useState, useEffect } from 'react';
import axios from 'axios';

let backend_route = "http://127.0.0.1:8000/";

let getMeeting = async (setMeetings, username) => {
    console.log('backend call: ' + backend_route + `get-meetings/${username}`);
    let meetings = await axios.get(backend_route + `get-meetings/${username}`);
    console.log(meetings);
    setMeetings(meetings['data']['meetings']);
}

function Dashboard({userObject}){
    let [meetings, setMeetings] = useState(null);
    useEffect(() => {
        if(meetings === null){
            getMeeting(setMeetings, userObject['username']);
        }
    }, [meetings, userObject])

    if(meetings && meetings.length !== 0){
        return (
            // Iterate over the userObject's meeting field to display all the meetings for a User
            <div className="Meetings">
            {meetings.map(meeting => 
                (<div className="individualMeeting">
                <h1>Meeting {meeting.id}</h1>
                <h2>Date: {meeting.date}</h2>
                <h2>Location: {meeting.coffeeshop}</h2>
                <p>People Involved:</p>
                <ul>
                {meetings.people.map(person =>
                    <li>{person}</li>)}
                </ul>
                <p>Common Preferences:</p>
                <ul>
                {meetings.shared_preferences.map(preference =>
                    <li>{preference}</li>)}
                </ul>
                </div>))}
            </div>
        );
    }
    else{
        return (<div><p>Currently no meetings scheduled!</p></div>)
    }
}

export default Dashboard;
