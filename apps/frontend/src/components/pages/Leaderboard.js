import React, { Component } from 'react';
import LeaderboardTable from '../LeaderboardTable/LeaderboardTable';
import Header from '../Header/Header';
import NavigationDrawer from '../NavigationDrawer/NavigationDrawer';

export default class Dashboard extends Component {
    render() {
        return (
            <div style={{backgroundColor:"#f1f2f6", width:"100%", minHeight:"100%", position:"absolute", paddingBottom:20, top:0, left:0}}>
                <Header />
                {/* <br/> */}
                <LeaderboardTable/>
                <NavigationDrawer/>
            </div>
        );
    }
}