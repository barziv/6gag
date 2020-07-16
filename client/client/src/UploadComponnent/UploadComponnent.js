import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import config from "../config";

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

function SendNewPostToServer(data) {
  fetch(config.SERVER_ADDRESS + "/posts", {
    method: "POST",
    mode: "cors",
    body: data
  });
}

function UploadNewPost(props) {
  const classes = useStyles();
  let data = new FormData();
  const addData = (key, value) => {
    data.set(key, value);
  };

  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
        componnet="form"
      >
        <DialogTitle id="form-dialog-title">Upload new post</DialogTitle>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            autoFocus
            onChange={event => addData("ownerID", event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Title"
            onChange={event => addData("header", event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Description"
            onChange={event => addData("description", event.target.value)}
          />
          <input
            type="file"
            onChange={event => addData("picture", event.target.files[0])}
          ></input>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              SendNewPostToServer(data);
              props.handleClose();
            }}
          >
            Upload
          </Button>
        </form>
      </Dialog>
    </div>
  );
}

export default UploadNewPost;
