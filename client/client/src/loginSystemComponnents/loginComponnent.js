import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import config from '../config';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function sendLoginData(userData) {
  console.log(userData);
  fetch(config.SERVER_ADDRESS + "/login", {
    method: "POST",
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify(userData)
  }).then(response => console.log(response.headers.get('Set-Cookie')))
}

function LoginPage() {
  const classes = useStyles();
  let userData = {
    username: '',
    password: '',
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="username"
            autoFocus
            onChange={(event) => userData.username = event.target.value}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            onChange={(event) => userData.password = event.target.value}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => sendLoginData(userData)}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default LoginPage;