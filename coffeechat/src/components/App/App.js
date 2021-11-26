import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import IceBreakers from '../IceBreakers/IceBreakers';
import Landing from '../Landing/Landing.js';
import Preferences from '../Preferences/Preferences';

function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/landing">Landing</Link>
            </li>
            <li>
              <Link to="/icebreakers">IceBreakers</Link>
            </li>
          </ul>
        </nav> */}

        {
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/icebreakers" element={<IceBreakers />} />
            <Route path="/preferences" element={<Preferences />} />
          </Routes>
        }
      </div>
    </Router>
  );
}

export default App;
