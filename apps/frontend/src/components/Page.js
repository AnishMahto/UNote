import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';

class Page extends Component {
    render() {
        switch (this.props.page) {
            case "HOME":
                return <Home/>;
            case "LEADERBOARD":
                return <Leaderboard/>
            default:
                return <Home/>
        }
    }
}

const mapStateToProps = (store) => {
    return {
        page: store.page,
    }
}

export default connect(mapStateToProps)(Page)