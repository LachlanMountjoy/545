import photo from '../../photos/landing-header.png';
import axios from 'axios';
import '../../styles/homepage.css';
import React from 'react';
import {useNavigate} from 'react-router-dom'

let backend_route = "http://127.0.0.1:8000/"

let createUser = async (username, password, setError, navigate) => {
  let signup_route = backend_route + 'sign-up';
  let signup_result = await axios.post(signup_route,
             {
               username: username,
               password: password
             });

  if (signup_result['Error']) {
   setError(signup_result['Error']);
  } else {
    navigate('/preferences', { replace: true })
  }
}

let login = async (username, password, setError, navigate) => {

  let login_route = backend_route + 'login';
  let login_result = await axios.post(login_route,
             {
               username: username,
               password: password
             });
  if (login_result['Error']) {
   setError(login_result['Error']);
  } else {
    navigate('/meetings', { replace: true })
  }

}

function Landing() {
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
            Username
            <input type="text" name="name" placeholder="username" onChange={e => setUsername(e.target.value)}/>
          </label>
        </div>
        <div className="form-group">
        <label>
            Password
            <input type='text' name='password' placeholder="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        </div>
        <div className="sign-up" onClick={e => login(username, password, setError, navigate)}>Login</div>
        <div className="sign-up" onClick={e => createUser(username, password, setError, navigate)}>Sign Up</div>
        {(error) && <div><p> {error} </p> </div>}
      </form>
    </div>
    </div>
  );
}

export default Landing;
