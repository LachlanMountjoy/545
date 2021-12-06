import photo from '../../photos/landing-header.png';
import axios from 'axios';
import '../../styles/homepage.css';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import NavBar from '../NavBar/NavBar.js';

let backend_route = "http://127.0.0.1:8000/"

let validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

let createUser = async (username, password, setError, navigate, setUserObject) => {
  if (!validateEmail(username)) {
    setError("Email is not a proper email address")
    return;
  }
  let signup_route = backend_route + 'sign-up';
  let signup_result = await axios.post(signup_route,
             {
               username: username,
               password: password
             });

  if (signup_result['data']['Error']) {
   setError(signup_result['data']['Error']);
  } else {
    setUserObject('username', username, {path: '/'})
    navigate('/preferences', { replace: true })
  }
}

let login = async (username, password, setError, navigate, setUserObject) => {
  if (!validateEmail(username)) {
    setError("Email is not a proper email address")
    return;
  }
  let login_route = backend_route + 'login';
  let login_result = await axios.post(login_route,
             {
               username: username,
               password: password
             });
  console.log(login_result)
  if (login_result['data']['Error']) {
   setError(login_result['data']['Error']);
  } else {
    setUserObject('username', username, {path: '/'})
    navigate('/meetings', { replace: true })
  }

}

function Landing({setUserObject}) {
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  return (
    <div className="Landing">
      <div className="background"> </div>
      <div className="form-container">
        <h1 className="coffeechat-title">Coffee Chat</h1>
      <form>
        <div className="form-group">
          <label className="landing-label">
            Email
            <input type="text" name="name" placeholder="email" onChange={e => setUsername(e.target.value)}/>
          </label>
        </div>
        <div className="form-group">
        <label className="landing-label">
            Password
            <input type='password' name='password' placeholder="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        </div>
          <div className="landing-button">
          <Button variant="contained"  onClick={e => login(username, password, setError, navigate, setUserObject)}>Login</Button>
          <Button  variant="contained" onClick={e => createUser(username, password, setError, navigate, setUserObject)}>Sign Up</Button>
          </div>
        {(error) && <div className='error'><p> {error} </p> </div>}
      </form>
    </div>
    </div>
  );
}

export default Landing;
