import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';
import Post from './postComponnent/postComponnet';
import Comments from './commentsComponnent/commentsComponnet';
import config from '../config';

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
            <GridList cellHeight={"15%"} cols={1}>
                {this.state.response.map((data) => {
                    return (
                        <GridListTile key={data["_id"]}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Post data={data}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <Comments comments={data.comments} id={data["_id"]} />
                                </Grid>
                            </Grid>
                        </GridListTile>
                )})}
            </GridList>
        );
    }
}

export default Posts;