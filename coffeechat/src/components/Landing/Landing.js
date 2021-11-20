import photo from '../../photos/landing-header.png';
import '../../styles/homepage.css';
function Landing() {
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
            <input type="text" name="name" placeholder="username"/>
          </label>
        </div>
        <div className="form-group">
        <label>
            Password
            <input type='text' name='password' placeholder="password" />
        </label>
        </div>
        <input  type="submit" value="Submit" />
        <a className="sign-up" href=''>Sign Up </a>
      </form>
    </div>
    </div>
  );
}

export default Landing;
