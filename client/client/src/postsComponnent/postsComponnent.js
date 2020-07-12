import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Post from './postComponnent/postComponnet';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Posts() {
  const classes = useStyles();
  let data = {
      picURL: '',
      header: 'test',
      description: 'desc',
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
            <Post data={data}/>
        </ListItem>
        <ListItem button>
            <Post data={data}/>
        </ListItem>
      </List>
    </div>
  );
}
