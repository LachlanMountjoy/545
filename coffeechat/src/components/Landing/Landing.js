import photo from '../../photos/landing-header.png';
import axios from 'axios';
import '../../styles/homepage.css';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';

let backend_route = "http://127.0.0.1:8000/"

let createUser = async (username, password, setError, navigate, setUserObject) => {
  let signup_route = backend_route + 'sign-up';
  let signup_result = await axios.post(signup_route,
             {
               username: username,
               password: password
             });

  if (signup_result['data']['Error']) {
   setError(signup_result['data']['Error']);
  } else {
    setUserObject({'username': username})
    navigate('/preferences', { replace: true })
  }
}

let login = async (username, password, setError, navigate, setUserObject) => {

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
    setUserObject({'username': username})
    navigate('/meetings', { replace: true })
  }

}

function Landing({setUserObject}) {
  function validate(username, passwd){
    // If username and passwd are on same userObject in DB, return true and display that User's Dashboard
    
  }

  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  return (
    <div className="Landing">
      <div className="background"> </div>
      <div className="form-container">
        <h1>Coffee Chat</h1>
        <p hidden className="error">{"Invalid username or password input"} </p>
      <form>
        <div className="form-group">
          <label>
            Email
            <input type="text" name="name" placeholder="email" onChange={e => setUsername(e.target.value)}/>
          </label>
        </div>
        <div className="form-group">
        <label>
            Password
            <input type='password' name='password' placeholder="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        </div>
        <div className="login">
        <label>
          <Button variant="contained" onClick={e => login(username, password, setError, navigate, setUserObject)}>Login</Button>
        </label>
        </div>
        <div className="sign-up">
          <Button variant="contained" onClick={e => createUser(username, password, setError, navigate, setUserObject)}>Sign Up</Button>
        </div>
        {(error) && <div className='error'><p> {error} </p> </div>}
      </form>
    </div>
    </div>
  );
}

export default Landing;
