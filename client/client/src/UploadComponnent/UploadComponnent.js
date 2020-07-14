import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import PublishIcon from "@material-ui/icons/Publish";
import DialogTitle from "@material-ui/core/DialogTitle";
import config from "../config";

function SendNewPostToServer(data) {
  fetch(config.SERVER_ADDRESS + "/posts", {
    method: "POST",
    mode: "cors",
    body: data
  });
}

function UploadNewPost(props) {
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
        <Paper component="form">
          <DialogTitle id="form-dialog-title">Upload new post</DialogTitle>
          <InputBase
            placeholder="Name"
            inputProps={{ "aria-label": "name" }}
            onChange={event => addData("ownerID", event.target.value)}
          />
          <InputBase
            placeholder="Title"
            inputProps={{ "aria-label": "title" }}
            onChange={event => addData("header", event.target.value)}
          />
          <InputBase
            placeholder="Description"
            inputProps={{ "aria-label": "description" }}
            onChange={event => addData("description", event.target.value)}
          />
          <input
            type="file"
            onChange={event => addData("picture", event.target.files[0])}
          ></input>
          <IconButton
            type="submit"
            aria-label="search"
            onClick={() => {
              SendNewPostToServer(data);
              props.handleClose();
            }}
          >
            <PublishIcon />
          </IconButton>
        </Paper>
      </Dialog>
    </div>
  );
}

export default UploadNewPost;
