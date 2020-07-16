import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import ErrorPage from '../errorComponnent';
import LoginPage from './loginComponnent';
import RegisterPage from './registerComponent';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    color: '#fff',
  },
}));

function LoginSystem() {
    const classes = useStyles();
      return (
        <BrowserRouter>
        <AppBar position="sticky">
          <Toolbar>
            <Link to="/" className={classes.link}>
              <Button color="inherit" className={classes.menuButton}>Login</Button>
            </Link>
            <Link to="/register" className={classes.link}>
              <Button color="inherit" className={classes.menuButton}>Register</Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route component={LoginPage} exact path={"/"}/>
          <Route component={RegisterPage} exact path={"/register"}/>
          <Route component={ErrorPage} path={"/"}/>
        </Switch>
      </BrowserRouter>
    )
}

export default LoginSystem;