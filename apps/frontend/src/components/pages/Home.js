import React, { Component } from 'react';
import Header from '../Header/Header';
import NavigationDrawer from '../NavigationDrawer/NavigationDrawer';
import { Tab, Tabs, Paper, Fab, Dialog, DialogTitle } from '@material-ui/core';
import { connect } from 'react-redux';
import store from '../../store';
import HomePageBody from '../HomePageBody/HomePageBody';
import { Add } from '@material-ui/icons';
import UploadForm from '../UploadForm/UploadForm';
import { gradientTheme } from '../../themes';

class Home extends Component {

    state = {
        displayUploadDialog: false,
    }

    handleTabChange(event, value) {
        store.dispatch({type: "DISPLAY_TAB", payload: value});
    }

    render() {
        return (
            <div style={{backgroundColor:"#f1f2f6", width:"100%", minHeight:"100%", position:"absolute", paddingBottom:20, top:0, left:0}}>
            <Header />
            <Paper square>
                <Tabs value={this.props.tab} variant='fullWidth' onChange={this.handleTabChange} indicatorColor='primary' textColor='primary' variant="scrollable" scrollButtons="auto">
                    <Tab label="SUPPLEMENTARY APPLICATIONS" value="SUMMATIVES"/>
                    <Tab label="RESOURCES" value="RESOURCES"/>
                </Tabs>
            </Paper>
            <HomePageBody type={this.props.tab} />
            <Fab style={{position:"fixed", bottom:10, right:10, background:gradientTheme}} color='primary' onClick={() => this.setState({displayUploadDialog: !this.state.displayUploadDialog})}>
                <Add fontSize='large' style={{color:"white"}}/>
            </Fab>
            <Dialog fullWidth={true} open={this.state.displayUploadDialog} onClose={() => this.setState({displayUploadDialog: false})}>
                <UploadForm closeDialogCallback={() => this.setState({displayUploadDialog:false})} />
            </Dialog>
            <NavigationDrawer />
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        tab: store.home.tab,
    }
}

export default connect (mapStateToProps)(Home);