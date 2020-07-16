import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import config from '../../config';

function sendMessage(newMessage, id, changeComments) {
    let data = {
        id,
        comment: newMessage
    };

    changeComments(newMessage);
    fetch(config.SERVER_ADDRESS+'/posts', {
        method: 'PUT',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
}

export default function Input(props) {
    const [newMessage, setNewMessage] = useState('');

    return (
        <Grid container spacing={2} className={"commentsInput"}>
            <Grid item xs={9}>
                <TextField fullWidth id="outlined-basic" label="Message" variant="outlined" 
                    onChange={(event) => setNewMessage(event.target.value)}/>
            </Grid>
            <Grid item xs={2}>
                <Fab color="primary" aria-label="add" 
                onClick={() => sendMessage(newMessage, props.id, props.changeComments)}>
                    <AddIcon />
                </Fab>
            </Grid>
        </Grid>
    );
}