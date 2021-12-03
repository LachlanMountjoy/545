import {icebreakers} from '../../icebreakers.json';
import NavBar from '../NavBar/NavBar.js';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



function IceBreakers({userObject, setCookie}) {
  const icebreakerTopics = Object.keys(icebreakers);
    return (
      <div className="IceBreakers">
        <NavBar setCookie={setCookie}/>
        {icebreakerTopics.map(topic => 
            <Accordion>
              <AccordionSummary aria-controls="panella-content" id={topic} expandIcon={<ExpandMoreIcon />}>
                <Typography>{topic} Icebreakers</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  {icebreakers[topic].map(icebreaker => <li>{icebreaker}</li>)}
                </ul>
              </AccordionDetails>
            </Accordion>
          )}
      </div>
    );
  }
  
export default IceBreakers;
