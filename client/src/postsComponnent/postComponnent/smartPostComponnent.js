import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Post from '../postComponnent/postComponnet';
import Comments from '../commentsComponnent/commentsComponnet';
import config from '../../config';

class SmartPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            response: {}
        }
    }

    componentDidMount() {
        fetch(config.SERVER_ADDRESS+'/posts/'+this.state.id)
        .then(response => {return response.json();})
        .then(data => {
            this.setState({
                id: this.state.id,
                response: data                        
            });
        });
    }

    render() {
        let data = this.state.response;
        if(Object.keys(data).length === 0) {
            return(<h1>loading...</h1>);
        }
        
        return (
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Post data={data}/>
                </Grid>
                <Grid item xs={6}>
                    <Comments comments={data.comments} id={this.state.id} />
                </Grid>
            </Grid>
        );
    }
}

export default SmartPost
        