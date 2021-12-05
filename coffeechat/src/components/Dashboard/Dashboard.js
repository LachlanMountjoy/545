import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar.js';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import '../../styles/dashboard.css';

let backend_route = "http://127.0.0.1:8000/";

let getMeeting = async (setMeetings, username) => {
    console.log('backend call: ' + backend_route + `get-meetings/${username}`);
    let meetings = await axios.get(backend_route + `get-meetings/${username}`);
    console.log(meetings);
    setMeetings(meetings['data']['meetings']);
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="success" {...props} />;
});

function Dashboard({userObject, setCookie}){
    let [open, setOpen] = React.useState(false);

    let handleClick = () => {
        setOpen(true);
    };

    let handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    let [meetings, setMeetings] = useState(null);
    useEffect(() => {
        if(meetings === null){
            getMeeting(setMeetings, userObject['username']);
        }
    }, [meetings, userObject])
    let scheduleMeeting = async () => {
        let username = userObject['username']
        axios.get(backend_route + `match-people/${username}`)
        setMeetings(null);
        handleClick();
    }
    if(meetings && meetings.length !== 0){
        return (
            // Iterate over the userObject's meeting field to display all the meetings for a User
            <div className="Dashboard">
                <NavBar setCookie={setCookie} />
                <div className="schedule-meeting"><Button variant="contained" onClick={scheduleMeeting}>Schedule Meeting</Button></div>
                <div className="schedule-meeting">
                  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                      Looking for a meeting!
                    </Alert>
                  </Snackbar>
                </div>
                    {meetings.map(meeting =>
                    ( 
                     <Accordion> 
                        <AccordionSummary aria-controls="panella-content" id={meeting.id} expandIcon={<ExpandMoreIcon />}>
                            <Typography> Meeting {meeting.id} </Typography>
                        </AccordionSummary>
                    <AccordionDetails> 
                    <h3 className="date">Date:</h3>
                    <p className="meeting-date"> {meeting.date}</p>
                    <h3 className="location">Location: </h3>
                    <p className="meeting-location"> {meeting.coffeeshop}  </p>
                    <h3> People Involved:</h3>
                    <ul>
                    {meeting.people.map(person =>
                        <li>{person}</li>)}
                    </ul>
                    <h3>Common Preferences:</h3>
                    <ul>
                    {meeting.shared_preferences.map(preference =>
                        <li>{preference}</li>)}
                    </ul> 
                     </AccordionDetails>
                     </Accordion> 
                    ))}
            </div>
        );
    }
    else{
        return (<div>
                  <NavBar />
                  <div className="schedule-meeting"><Button variant="contained" onClick={scheduleMeeting}>Schedule Meeting</Button></div>
                  <div className="schedule-meeting">
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Looking for a meeting!
                      </Alert>
                    </Snackbar>
                  </div>
                  <p>Currently no meetings scheduled!</p>
                </div>)
    }
}

export default Dashboard;
