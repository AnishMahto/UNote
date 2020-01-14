import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

class ProtectedRoute extends Component {
    render () {
        if (this.props.auth.isLoading) {
            return <CircularProgress/>;
        } else if (this.props.auth.isAuthenticated) {
            return <this.props.component/>;
        } else {
            return <Redirect to="/login"/>;
        }
    }
}

const mapStateToProps = (store) => {
    return {
        auth: store.auth
    };
}

export default connect(mapStateToProps)(ProtectedRoute);