import React, { Component } from 'react';
import { List, ButtonBase, ListItem, ListItemText } from '@material-ui/core';
import store from '../../store';

export default class SubjectSelectorList extends Component {

    state = {
        data: [
            {name: "HL Math", value: "HL_MATH"},
            {name: "HL Physics", value: "HL_PHYSICS"},
            {name: "SL English", value: "SL_ENGLISH"}
        ]
    }

    render() {
        return (
            <List>
                {this.state.data.map ((subject) => (                   
                    <ListItem key={subject.value} button={true} onClick={() => store.dispatch({type:"SELECT_SUBJECT", payload:subject.value})}>
                        <ListItemText>
                            {subject.name}
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        );
    }
}