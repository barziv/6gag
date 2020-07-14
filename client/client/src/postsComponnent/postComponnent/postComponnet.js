import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: '40%',
    marginLeft: '30%',
  },
});

function changeLikes(id, isLike, updateLikes, likes) {
  let data = {
    id,
    isLike
  };
  
  fetch('http://192.168.1.36:4000/posts', {
        method: 'PUT',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

  updateLikes((isLike)? ++likes : --likes);
}

export default function Post(procs) {
  const classes = useStyles();
  const [likes, setLikes] = useState(procs.data.likes ?? 0);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          maxwidth="40%"
          image={`http://localhost:4000/pictures/${procs.data.id}`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {procs.data.header}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {procs.data.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {likes}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => changeLikes(procs.data.id, true, setLikes, likes)}>
          Like
        </Button>
        <Button size="small" color="primary" onClick={() => changeLikes(procs.data.id, false, setLikes, likes)}>
          Unlike
        </Button>
      </CardActions>
    </Card>
  );
}
