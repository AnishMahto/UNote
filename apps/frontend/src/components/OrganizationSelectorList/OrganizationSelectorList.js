import React, { Component } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import store from '../../store';
import { connect } from 'react-redux';
import fetchErrorChecker from '../ErrorHandler/fetchErrorChecker';
import getOrganizations from './getOrganizations';

class OrganizationSelectorList extends Component {

    state = {
        data: []
    }

    componentDidMount() {
        getOrganizations((data) => {
            this.setState({
                "data":data,
            })
        })
    }

    selectOrganization = (organization) => {
        store.dispatch({type:"SELECT_ORGANIZATION", payload:organization});
        this.props.closeSelectorLists();
    }

    render() {
        return (
            <List>
                {this.state.data.map ((organization) => (                   
                    <ListItem key={organization.value} button={true} onClick={() => this.selectOrganization(organization)}>
                        <ListItemText>
                            {organization.name}
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        auth: store.auth
    }
}

export default connect(mapStateToProps)(OrganizationSelectorList);