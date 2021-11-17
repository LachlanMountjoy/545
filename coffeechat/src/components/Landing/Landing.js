import photo from '../../photos/landing-header.png';

function Landing() {
  return (
    <div className="Landing">
      <header className="Landing-header">
        <img src={photo} className="Landing-heading" alt="heading" />
      </header>
        <h1>Welcome to CoffeeChat!</h1>
      <form>
        <label>
            Username:
            <input type="text" name="name" />
        </label>
        <label>
            Password:
            <input type='text' name='password' />
        </label>
        <input type="submit" value="Submit" />
      </form>
    <a href=''>Sign Up </a>
    </div>
  );
}

export default Landing;
