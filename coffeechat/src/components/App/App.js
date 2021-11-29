import './App.css';
import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import IceBreakers from '../IceBreakers/IceBreakers';
import Landing from '../Landing/Landing';
import Preferences from '../Preferences/Preferences';
import Dashboard from '../Dashboard/Dashboard';

function App() {
  const [userObject, updateUser] = useState(0);

  return (
    <Router>
      <div>
        {
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/icebreakers" element={<IceBreakers />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/meetings" element={<Dashboard userObject = {userObject} />} />
          </Routes>
        }
      </div>
    </Router>
  );
}

export default App;
