import '../../styles/preferences.css';
import {preferences} from '../../preferences.json';
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import {useState} from 'react';
import axios from 'axios'

let backend_route = "http://127.0.0.1:8000/"

let getPreferenceState = async (preferencesObject, username) => {
    let savedPreferencesRequest = axios.get(backend_route+username);
    let preferenceState = {};
    for(var key of Object.keys(preferencesObject)){
        for(var item of preferencesObject[key]){
            preferenceState[item] = false;
        }
    }
    let savedPreferences = await savedPreferencesRequest;
    for(var preference of savedPreferences){
        preferenceState[preference] = true;
    }
    return preferenceState;
}

let savePreferences = async (username, preferenceState) => {
    let save_route = backend_route + 'save-prefernces';
    let save_result = await axios.post(save_route,
             {
               username: username,
               preferences: preferenceState
             });
    return save_result
}


function Preferences({userObject}) {
    let username = userObject['username']
    let [preferenceState, setPreferenceState] = useState(getPreferenceState(preferences))
    console.log(preferenceState);
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
        <div>
            <FormGroup>
            <div className="Preferences">
                {keys.map(key =>
                    (<div>
                        <h2>{key} Options</h2>
                        
                        {preferences[key].map(option =>
                            <FormControlLabel control={<Checkbox />} label = {option} onChange={updatePreference(option)} />
                            )}
                       
                    </div>)
                )}
            </div>
            </FormGroup>
            <Button onClick={() => {savePreferences(username, preferenceState)}}>Save</Button>
        </div>
    );
  }
  
export default Preferences;
