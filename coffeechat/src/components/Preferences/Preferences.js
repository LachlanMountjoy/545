import '../../styles/preferences.css';
import {preferences} from '../../preferences.json';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

function Preferences() {
    const keys = Object.keys(preferences);
    return (
        <div>
            <FormGroup>
            <div className="Preferences">
                {keys.map(key =>
                    (<div>
                        <h2>{key} Options</h2>
                        
                        {preferences[key].map(option =>
                            <FormControlLabel control={<Checkbox />} label = {option} />
                            )}
                       
                    </div>)
                )}
            </div>
            </FormGroup>
            <Button onClick={() => {alert('preferences updated');}}>Save</Button>
        </div>
    );
  }
  
export default Preferences;