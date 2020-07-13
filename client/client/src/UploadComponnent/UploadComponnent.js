import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import DialogTitle from '@material-ui/core/DialogTitle';

function SendNewPostToServer(data) {
    console.log(data);
    console.log(JSON.stringify(data));
    fetch('http://192.168.1.36:4000/posts', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
}

function UploadNewPost(props) {
    let data = {
        ownerID: "",
        picture: "",
        header: "",
        description: "",
    };

  return (
    <div>
      <Dialog open={props.isOpen} onClose={props.handleClose} aria-labelledby="form-dialog-title" componnet="form">
        <Paper component="form">
        <DialogTitle id="form-dialog-title">Upload new post</DialogTitle>
        <InputBase
            placeholder="Name"
            inputProps={{ 'aria-label': 'name' }}
            onChange={(event) => data.ownerID = event.target.value}
        />
        <InputBase
            placeholder="Title"
            inputProps={{ 'aria-label': 'title' }}
            onChange={(event) => data.header = event.target.value}
        />
        <InputBase
            placeholder="Description"
            inputProps={{ 'aria-label': 'description' }}
            onChange={(event) => data.description = event.target.value}
        />
        <input type="file" onChange={(event) => {
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
                data.picture = evt.target.result;
            }
        }}></input>
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