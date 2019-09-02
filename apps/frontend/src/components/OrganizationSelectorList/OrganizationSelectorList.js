import React, { Component } from 'react';
import { List, ButtonBase, ListItem, ListItemText } from '@material-ui/core';
import store from '../../store';

export default class OrganizationSelectorList extends Component {

    state = {
        data: [
            {name: "Turner Fenton Secondary School", value: "TURNER_FENTON_SECONDARY_SCHOOL"},
            {name: "St. Francis Xavier", value: "ST_FRANCIS_XAVIER_SECONDARY_SCHOOL"},
        ]
    }

    render() {
        return (
            <List>
                {this.state.data.map ((organization) => (                   
                    <ListItem key={organization.value} button={true} onClick={() => store.dispatch({type:"SELECT_ORGANIZATION", payload:organization.value})}>
                        <ListItemText>
                            {organization.name}
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        );
    }
}