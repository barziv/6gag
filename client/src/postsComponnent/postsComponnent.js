import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';
import Post from './postComponnent/postComponnet';
import Comments from './commentsComponnent/commentsComponnet';
import config from '../config';
import './postsComponnent.css';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: [],
            url: props.url,
        };
    }
  
    componentDidMount() {
        fetch(config.SERVER_ADDRESS+this.state.url)
            .then(response => {return response.json();})
            .then(data => {
                    this.setState({
                        response: data,
                        url: this.state.url,
                    });
                });
    }

    render() {
        return (
            <GridList cellHeight={"100%"} cols={1}>
                {this.state.response.map((data) => {
                    return (
                        <GridListTile key={data["_id"]}>
                            <Grid container spacing={4} justify="center">
                                <Grid item sm={4}>
                                    <Post data={data}/>
                                </Grid>
                                <Grid item sm={4} className={"comments"}>
                                    <Comments comments={data.comments} />
                                </Grid>
                            </Grid>
                        </GridListTile>
                )})}
            </GridList>
        );
    }
}

export default Posts;