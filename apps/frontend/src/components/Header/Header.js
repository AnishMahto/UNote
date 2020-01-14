import React, { Component } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Paper, Menu, MenuItem, Button, Popper, Drawer, List, ListItem, ListItemText, ButtonBase } from '@material-ui/core';
import { MenuOutlined } from '@material-ui/icons'
import toggleNavigationDrawerAction from '../../actions/toggleNavigationDrawerAction';
import store from '../../store';
import OrganizationSelectorList from '../OrganizationSelectorList/OrganizationSelectorList';
import SubjectSelectorList from '../ProgramSelectorList/ProgramSelectorList';
import { gradientTheme } from '../../themes';
import { connect } from 'react-redux';

class Header extends Component {

    getOrganizationName = () => {
        if (this.props.organization === null) {
            return "SELECT ORGANIZATION";
        } else {
            return this.props.organization.name;
        }
    }

    getProgramName = () => {
        if (this.props.program === null) {
            return "ALL PROGRAMS";
        } else {
            return this.props.program.name;
        }
    }

    render() {

        return (
            <div>
                <Paper square>
                    <AppBar position='relative' style={{boxShadow:'none'}}>
                        <Toolbar style={{display:"flex", flexDirection:"row", paddingTop:3, paddingBottom:3, background: gradientTheme}}>
                            <IconButton edge='start' color='inherit' aria-label='menu'  onClick={() => toggleNavigationDrawerAction(true)}>
                                <MenuOutlined style={{color:"white"}} />
                            </IconButton>
                            <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"left", marginLeft:20}}>
                                <Typography variant="subtitle1" style={{color:"white"}}><strong>{this.getOrganizationName().toUpperCase()}</strong></Typography>
                                <Typography variant="overline" style={{marginTop:-10, color:"white"}}>{this.getProgramName()}</Typography>
                            </div>
                        </Toolbar>
                    </AppBar>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        organization: store.organization,
        program: store.subject,
    }
}

export default connect(mapStateToProps)(Header);