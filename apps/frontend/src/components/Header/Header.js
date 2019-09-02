import React, { Component } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Paper, Menu, MenuItem, Button, Popper, Drawer, List, ListItem, ListItemText, ButtonBase } from '@material-ui/core';
import { MenuOutlined } from '@material-ui/icons'
import toggleNavigationDrawerAction from '../../actions/toggleNavigationDrawerAction';
import store from '../../store';
import OrganizationSelectorList from '../OrganizationSelectorList/OrganizationSelectorList';
import SubjectSelectorList from '../SubjectSelectorList/SubjectSelectorList';

export default class Header extends Component {

    state = {
        showOrganizationList: false,
        showSubjectList: false,
    }

    render() {

        return (
            <div>
                <Paper square>
                    <AppBar position='relative' style={{boxShadow:'none'}}>
                        <Toolbar style={{display:"flex", flexDirection:"row"}}>
                            <div style={{flex:5, flexDirection:"row", display:"flex"}}>
                                <IconButton edge='start' color='inherit' aria-label='menu'  onClick={() => toggleNavigationDrawerAction(true)}>
                                    <MenuOutlined />
                                </IconButton>
                                <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                                <Typography variant="subtitle1"><strong>TURNER FENTON SECONDARY SCHOOL</strong></Typography>
                                <Typography variant="overline" style={{marginLeft:10}}>(HL ENGLISH)</Typography>
                                </div>
                            </div>
                            {/* <div style={{flex:1, minWidth:270, display:"flex", flexDirection:"row", justifyContent:"space-between" }}>
                                <Button size='small' style={{color:"white"}} variant='text' onClick={() => this.setState({showOrganizationList: !this.state.showOrganizationList})}>SELECT SCHOOL</Button>
                                <Button size='small' style={{color:"white"}} variant='text' onClick={() => this.setState({showSubjectList: !this.state.showSubjectList})}>SELECT SUBJECT</Button>
                            </div> */}
                            {/* <Drawer open={this.state.showOrganizationList} anchor='bottom' onClose={()=>this.setState({showOrganizationList: false})}>
                                <OrganizationSelectorList/>
                            </Drawer>
                            <Drawer open={this.state.showSubjectList} anchor='bottom' onClose={()=>this.setState({showSubjectList:false})}>
                                <SubjectSelectorList/>
                            </Drawer> */}
                        </Toolbar>
                    </AppBar>
                </Paper>
            </div>
        );
    }
}