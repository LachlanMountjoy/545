import '../../styles/preferences.css';
import {preferences} from '../../preferences.json';
import Checkbox from '@mui/material/Checkbox'
import {useState} from 'react';
import axios from 'axios'

let backend_route = "http://127.0.0.1:8000/"

let getPreferenceState = (preferencesObject) => {
    let preferenceState = {};
    for(var key of Object.keys(preferencesObject)){
        for(var item of preferencesObject[key]){
            preferenceState[item] = false;
        }
    }
    return preferenceState
}

let createUser = async (username, preferencesObject) => {
    let signup_route = backend_route + 'save-prefernces';
    let signup_result = await axios.post(signup_route,
             {
               username: username,
               preferences: preferencesObject
             });
}

function Preferences() {
    let [preferenceState, setPreferenceState] = useState(getPreferenceState(preferences))
    let updatePreference = (key) => {
        let f = () => {
            let newPreferenceState = {...preferenceState};
            newPreferenceState[key] = !newPreferenceState[key];
            setPreferenceState(newPreferenceState);
        }
        return f;
    }
    return (
        <div>
            <div className="Preferences">
                {preferences.map((preference, index) => 
                    (<div>
                        <input type="checkbox" id={"preference"+ index} name={"preference"+index} value={preference}/>
                        {preference}
                    </div>)
                    )}
            </div>
        </div>
    );
  }
  
export default Preferences;
