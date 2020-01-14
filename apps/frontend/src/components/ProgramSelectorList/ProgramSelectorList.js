import React, { Component } from 'react';
import { List, ButtonBase, ListItem, ListItemText } from '@material-ui/core';
import store from '../../store';
import { connect } from 'react-redux';
import fetchErrorChecker from '../ErrorHandler/fetchErrorChecker';
import getPrograms from './getPrograms';

class SubjectSelectorList extends Component {

    state = {
        data: []
    }

    componentDidMount() {
        getPrograms((data) => {
            this.setState({
                data:data,
            })
        })
    }

    selectProgram = (program) => {
        store.dispatch({type:"SELECT_SUBJECT", payload:program})
        this.props.closeSelectorLists();
    }

    render() {
        return (
            <List>
                {this.state.data.map ((subject) => (                   
                    <ListItem key={subject.value} button={true} onClick={() => this.selectProgram(subject)}>
                        <ListItemText>
                            {subject.name}
                        </ListItemText>
                    </ListItem>
                ))}
                <ListItem key={"ALL"} button={true} onClick={() => this.selectProgram(null)}>
                    <ListItemText>
                        All Programs
                    </ListItemText>
                </ListItem>
            </List>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        auth: store.auth,
    }
}

export default connect(mapStateToProps)(SubjectSelectorList);