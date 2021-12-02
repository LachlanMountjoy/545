import './App.css';
import React, { useState, useEffect } from 'react';
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
  let [userObject, updateUser] = useState({});

  return (
    <Router>
      <div>
        {
          <Routes>
            <Route path="/" element={<Landing  setUserObject={updateUser}/>} />
            <Route path="/landing" element={<Landing setUserObject={updateUser}/>} />
            <Route path="/icebreakers" element={<IceBreakers userObject={userObject}/>} />
            <Route path="/preferences" element={<Preferences userObject={userObject}/>} />
            <Route path="/meetings" element={<Dashboard userObject={userObject}/>} />
          </Routes>
        }
      </div>
    </Router>
  );
}

export default App;