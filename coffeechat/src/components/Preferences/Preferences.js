import '../../styles/preferences.css';
import {preferences} from '../../preferences.json';
function Preferences() {
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