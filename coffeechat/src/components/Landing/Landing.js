import photo from '../../photos/landing-header.png';
import axios from 'axios';
import '../../styles/homepage.css';
import React from 'react';
let signup_route = "http://127.0.0.1:8000/sign-up"
let createUser = (username, password) => {
  axios.post(signup_route,
             {
               username: username,
               password: password
             });
}
function Landing() {
  function validate(username, passwd){
    // If username and passwd are on same userObject in DB, return true and display that User's Dashboard
    
  }

  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);
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
        <input  type="submit" value="Submit" />
    <a className="sign-up" href='/preferences' onClick={e => createUser(username, password)}>Sign Up</a>
      </form>
    </div>
    </div>
  );
}

export default Landing;
