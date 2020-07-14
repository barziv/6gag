import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ListItemText from '@material-ui/core/ListItemText';
import Input from './inputComponnent';

export default class Comments extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            comments: (props.comments ?? []),
            id: props.id,
        }
    }
    
    changeComments(newComment) {
        this.state.comments.push(newComment);
        this.setState({
            comments: this.state.comments,
            id: this.state.id
        });
    }

    render() {
        return (
                <List component="nav" aria-label="main mailbox folders">
                    <ListItemText primary="Comments"/>
                    {this.state.comments.map(comment => {
                        return (
                            <ListItem key={Math.floor(Math.random() * 1000)}>
                                <ListItemIcon>
                                    <ArrowForwardIosIcon />
                                </ListItemIcon>
                                <ListItemText primary={comment} />
                            </ListItem>
                        );
                    })}
                    <Input id={this.state.id} changeComments={this.changeComments.bind(this)}/>
                </List>
        );
    }
}
