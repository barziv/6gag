import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Posts from './postsComponnent/postsComponnent';
import SmartPost from './postsComponnent/postComponnent/smartPostComponnent';
import MainPage from './mainPageComponnent';
import ErrorPage from './errorComponnent';

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

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <AppBar position="sticky">
        <Toolbar>
          <Link to="/" className={classes.link}>
            <Button color="inherit" className={classes.menuButton}>Posts</Button>
          </Link>
          <Link to="/top-ten" className={classes.link}>
            <Button color="inherit" className={classes.menuButton}>Top-ten</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route component={() => <MainPage url={"/posts"}/>} exact path={"/"}/>
        <Route component={() => <Posts url={"/posts/top-ten"} />} exact path={"/top-ten"}/>
        <Route component={SmartPost} exact path={"/posts/:id"}/>
        <Route component={ErrorPage} path={"/"}/>      
      </Switch>
    </BrowserRouter>
  );
}

export default App;
