import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import config from '../../config';

const useStyles = makeStyles({
  root: {
    maxHeight: '100%',
  },
});

function sendDataToServer(data) {
  fetch(config.SERVER_ADDRESS+'/posts', {
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function changeLikes(id, isLike, updateLikes, likes) {
  let data = {
    id,
    isLike
  };
  
  sendDataToServer(data);
  updateLikes((isLike)? ++likes : --likes);
}

export default function Post(props) {
  const classes = useStyles();
  const [likes, setLikes] = useState(props.data.likes ?? 0);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link to={`posts/${props.data["_id"]}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          maxwidth="40%"
          image={`${config.SERVER_ADDRESS}/pictures/${props.data["_id"]}`}
          title="Contemplative Reptile"
        /> 
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.data.header}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {props.data.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {likes}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => changeLikes(props.data["_id"], true, setLikes, likes)}>
          Like
        </Button>
        <Button size="small" color="primary" onClick={() => changeLikes(props.data["_id"], false, setLikes, likes)}>
          Unlike
        </Button>
      </CardActions>
    </Card>
  );
}
