import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import DialogTitle from '@material-ui/core/DialogTitle';

function SendNewPostToServer(data) {
    fetch('http://192.168.1.36:4000/posts', {
        method: 'POST',
        mode: 'cors',
        body: data,
      });
}

function UploadNewPost(props) {
    let data = new FormData();

  return (
    <div>
      <Dialog open={props.isOpen} onClose={props.handleClose} aria-labelledby="form-dialog-title" componnet="form">
        <Paper component="form">
        <DialogTitle id="form-dialog-title">Upload new post</DialogTitle>
        <InputBase
            placeholder="Name"
            inputProps={{ 'aria-label': 'name' }}
            onChange={(event) => data.set("ownerID", event.target.value)}
        />
        <InputBase
            placeholder="Title"
            inputProps={{ 'aria-label': 'title' }}
            onChange={(event) => data.set("header", event.target.value)}
        />
        <InputBase
            placeholder="Description"
            inputProps={{ 'aria-label': 'description' }}
            onChange={(event) => data.set("description", event.target.value)}
        />
        <input type="file" onChange={(event) => data.set("picture", event.target.files[0]) }></input>
        <IconButton aria-label="search" onClick={() => {
            SendNewPostToServer(data);
            props.handleClose();
        }}>
            <PublishIcon />
        </IconButton>
        </Paper>
      </Dialog>
    </div>
  );
}

export default UploadNewPost;