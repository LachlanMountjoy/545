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
    console.log(userObject)
    let [meetings, setMeetings] = useState(null);
    console.log(meetings)
    useEffect(() => {
        if(meetings === null){
            getMeeting(setMeetings, userObject['username']);
        }
    }, [meetings, userObject])
    if(meetings && meetings.length === 0){
        return (
            // Iterate over the userObject's meeting field to display all the meetings for a User
            <div className="Meetings">

            </div>
        );
    }
    else{
        return (<div><p>no meetings found</p></div>)
    }
}

export default Dashboard;
