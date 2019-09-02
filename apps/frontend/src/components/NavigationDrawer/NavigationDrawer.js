import React, { Component } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { ExitToApp, Score, Home, AccountBox } from '@material-ui/icons'
import { connect } from 'react-redux';
import store from '../../store';

import toggleNavigationDrawerAction from '../../actions/toggleNavigationDrawerAction';

class NavigationDrawer extends Component {

    changePage = (PAGE) => {
        store.dispatch({type:"CHANGE_PAGE", payload:PAGE})
    }

    render() {
        return (
            <Drawer anchor='left' open={this.props.open} onClose={() => toggleNavigationDrawerAction(false)}>
                <List style={{width:250}}>
                    <ListItem button={true} onClick={()=>this.changePage("HOME")} button>
                        <ListItemIcon>
                            <Home/>
                        </ListItemIcon>
                        <ListItemText primary={"Home"}/>
                    </ListItem>
                    <ListItem button={true} onClick={()=>this.changePage("LEADERBOARD")} button>
                        <ListItemIcon>
                            <Score/>
                        </ListItemIcon>
                        <ListItemText primary={"Leaderboard"}/>
                    </ListItem>
                    <ListItem button={true} onClick={()=>this.changePage("MY_ACCOUNT")} button>
                        <ListItemIcon>
                            <AccountBox/>
                        </ListItemIcon>
                        <ListItemText primary={"My Account"}/>
                    </ListItem>
                    <ListItem button={true} onClick={()=>this.changePage("LOGOUT")} button>
                        <ListItemIcon>
                            <ExitToApp/>
                        </ListItemIcon>
                        <ListItemText primary={"Logout"}/>
                    </ListItem>
                </List>
            </Drawer>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        open: store.navigationDrawer.open,
    }
}

export default connect(mapStateToProps)(NavigationDrawer);