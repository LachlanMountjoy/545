import {icebreakers} from '../../icebreakers.json';
import NavBar from '../NavBar/NavBar.js';

function IceBreakers({userObject, setCookie}) {
    return (
      <div className="IceBreakers">
        <NavBar setCookie={setCookie}/>
        {icebreakers.map(breaker => <p>{breaker}</p>)}
      </div>
    );
  }
  
export default IceBreakers;
