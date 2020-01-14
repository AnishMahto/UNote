import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import store from '../store';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import MyAccount from './pages/MyAccount';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import ProtectedRoute from '../ProtectedRoute';
import UnprotectedRoute from '../UnprotectedRoute';

import getOrganizations from '../components/OrganizationSelectorList/getOrganizations';

class Page extends Component {

    componentDidMount () {
        // load/cache organizations and immediately set current organization to first available option
        getOrganizations((organizations) => {
            if (organizations.length > 0) {
                store.dispatch({
                    type:"SELECT_ORGANIZATION",
                    payload:organizations[0]
                })
            }
        })
    }

    render() {
        return (<HashRouter>
            <Switch>
                <UnprotectedRoute exact path="/login" component={Login} />
                <Route exact path="/create_account" component={CreateAccount} />
                <ProtectedRoute exact path="/home" component={Home} />
                <ProtectedRoute exact path="/leaderboard" component={Leaderboard} />
                <ProtectedRoute exact path="/my_account" component={MyAccount} />
            </Switch>
        </HashRouter>);
    }
}

const mapStateToProps = (store) => {
    return {
        page: store.page,
    }
}

export default connect(mapStateToProps)(Page)