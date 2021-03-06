import '../../styles/preferences.css';
import {preferences} from '../../preferences.json';
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import React, {useState, useEffect} from 'react';
import axios from 'axios'
import NavBar from '../NavBar/NavBar.js';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


let backend_route = "http://127.0.0.1:8000/"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="success" {...props} />;
});


let getDefaultPreferenceState = (preferencesObject) => {
    let preferenceState = {};
    for(var key of Object.keys(preferencesObject)){
        for(var item of preferencesObject[key]){
            preferenceState[item] = false;
        }
    }
    return preferenceState;
}

let getSavedPreferences = async (preferenceState, username, setPreferenceState) => {
    let savedPreferencesRequest = axios.get(backend_route+'load-preferences/'+username);
    let savedPreferences = await savedPreferencesRequest;
    let newPreferences = {...savedPreferences};
    for(var preference of savedPreferences['data']['preferences']){
        newPreferences[preference] = true;
    }
    setPreferenceState(newPreferences);
}

let savePreferences = async (username, preferenceState) => {
    let save_route = backend_route + 'save-preferences';
    let save_result = await axios.post(save_route,
             {
               username: username,
               preferences: preferenceState
             });
    return save_result
}

function Preferences({userObject, setCookie}) {
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

    let username = userObject['username'];
    let [preferenceState, setPreferenceState] = useState(getDefaultPreferenceState(preferences))
    let [loadCount, setLoadCount] = useState(0);
    useEffect(() => {
        if(loadCount === 0){
            getSavedPreferences(preferenceState, username, setPreferenceState);
            setLoadCount(loadCount+1);
            console.log(preferenceState)
        }
    }, [loadCount, preferenceState, username])
    let updatePreference = (key) => {
        let f = () => {
            let newPreferenceState = {...preferenceState};
            newPreferenceState[key] = !newPreferenceState[key];
            setPreferenceState(newPreferenceState);
            console.log(preferenceState)
        }
        return f;
    }
    const keys = Object.keys(preferences);

    return (
        <div className="Preferences"> 
            <NavBar setCookie={setCookie}/>
            <Container>
            <FormGroup>
                {keys.map(key =>
                    (<div>
                        <h2>{key} Options</h2> 
                        {preferences[key].map(option => 
                            <FormControlLabel className="fcl" control={<Checkbox checked={preferenceState[option]}/>} label = {option} onChange={updatePreference(option)}/>                 
                            )}                
                    </div>)
                )}
            </FormGroup>
              <Button variant="contained" onClick={() => {savePreferences(username, preferenceState); handleClick()}}>Save</Button>
            </Container>
                <div className="schedule-meeting">
                  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                      Saved Preferences!
                    </Alert>
                  </Snackbar>
                </div>

        </div>
   
    );
  }
  
export default Preferences;
