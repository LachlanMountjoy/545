import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useCookies } from 'react-cookie';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
 logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginRight: theme.spacing(5),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
  logout: {
     marginLeft: theme.spacing(20),
  },
  title: {
    color: "white",
    textDecoration: "none",
  }
}));

function NavBar() {
  const classes = useStyles();
  const [cookies, setCookie] = useCookies(['username'])
  let navigate = useNavigate();
  let logout = () => {
    setCookie('username', '', {path:'/'});
    navigate('/')
  };
  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          <Link to='/meetings' className={classes.title}> CoffeeChat </Link>
        </Typography>
          <div className={classes.navlinks}>
            <Link to="/preferences" className={classes.link}>
              Preferences
            </Link>
            <Link to="/icebreakers" className={classes.link}>
              Icebreakers
            </Link>
            <Link to="/meetings" className={classes.link}>
              Meetings
            </Link>
            <Button className={classes.logout} variant='contained' onClick={logout}> Log Out </Button>
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default NavBar;
