import './App.css';
import Landing from '../Landing/Landing.js';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import IceBreakers from '../IceBreakers/IceBreakers';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/landing">Landing</Link>
            </li>
            <li>
              <Link to="/icebreakers">IceBreakers</Link>
            </li>
          </ul>
        </nav>

        {
          <Routes>
            <Route path="/landing" element={<Landing />} />
            <Route path="/icebreakers" element={<IceBreakers />} />
          </Routes>
        }
      </div>
    </Router>
  );
}

export default App;
