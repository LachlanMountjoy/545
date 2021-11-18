import {icebreakers} from '../../icebreakers.json';

function IceBreakers() {
    return (
      <div className="IceBreakers">
        {icebreakers.map(breaker => <p>{breaker}</p>)}
      </div>
    );
  }
  
  export default IceBreakers;