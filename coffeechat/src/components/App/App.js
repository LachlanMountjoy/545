import './App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { useCookies } from 'react-cookie';
import IceBreakers from '../IceBreakers/IceBreakers';
import Landing from '../Landing/Landing';
import Preferences from '../Preferences/Preferences';
import Dashboard from '../Dashboard/Dashboard';
import Private from '../PrivateRoute/PrivateRoute.js'

let loggedIn = (username) =>{
  console.log(username)
  return username && username !== ''
}

function App() {
  const [cookies, setCookie] = useCookies(['username'])
  return (
    <Router>
      <div>
        {
          <Routes>
            <Route path="/" element={<Landing  setUserObject={setCookie}/>} />
            <Route path="/landing" element={<Landing setUserObject={setCookie}/>} />
            <Route path="/icebreakers" element={<Private element={<IceBreakers userObject={cookies} />} isLoggedIn={loggedIn(cookies['username'])}/>} />
            <Route path="/preferences" element={<Private element={<Preferences userObject={cookies} />} isLoggedIn={loggedIn(cookies['username'])}/>} />
            <Route path="/meetings" element={<Private element={<Dashboard userObject={cookies} />} isLoggedIn={loggedIn(cookies['username'])}/>} />
          </Routes>
        }
      </div>
    </Router>
  );
}

export default App;
