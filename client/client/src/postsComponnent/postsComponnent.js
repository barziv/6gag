import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Post from './postComponnent/postComponnet';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: makeStyles((theme) => ({
                root: {
                  width: '100%',
                  maxwidth: 360,
                  backgroundColor: theme.palette.background.paper,
                },
              })),
            response: []
        };
    }
  
    componentDidMount() {
        fetch('http://localhost:4000/posts')
            .then(response => {
                return response.json();
            }).then(data => {
                    this.setState({
                        classes: this.state.classes,
                        response: data                        
                    });
                });
    }

    render() {
        return (
            <div className={this.state.classes.root}>
            <List component="nav">
                {this.state.response.map((data) => {
                return (<ListItem button key={data.id}>
                    <Post data={data}/>
                </ListItem>
                )})}
            
            </List>
            </div>
        );
    }
}

export default Posts;