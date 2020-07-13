import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MoreIcon from '@material-ui/icons/MoreVert';
import UploadNewPost from './UploadComponnent';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    position: 'sticky',
  },
  grow: {
    flexGrow: 1,
  }
}));

export default function BottomAppBar() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
        <div className={classes.grow} />
          <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
          <IconButton edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <UploadNewPost isOpen={isOpen} handleClose={() => setIsOpen(false)}/>
    </React.Fragment>
  );
}
