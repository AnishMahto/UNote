import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

class UnprotectedRoute extends Component {
    render () {
        if (this.props.auth.isLoading) {
            return <CircularProgress/>;
        } else if (this.props.auth.isAuthenticated) {
            return <Redirect to="/home"/>;
        } else {
            return <this.props.component/>;
        }
    }
}

const mapStateToProps = (store) => {
    return {
        auth: store.auth
    };
}

export default connect(mapStateToProps)(UnprotectedRoute);