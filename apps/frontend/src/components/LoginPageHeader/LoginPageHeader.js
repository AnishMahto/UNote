import React, { Component } from 'react';
import { AppBar, Typography, Button, Toolbar } from '@material-ui/core';
import { gradientTheme } from '../../themes';
import { Link } from 'react-router-dom'

export default class LoginPageHeader extends Component {
    render() {
        return (
            <AppBar position="static" style={{background:gradientTheme}}>
                <Toolbar variant="dense" style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <div>
                        <Typography variant="button" style={{fontWeight:"bold"}}>UNote</Typography>
                    </div>
                    
                    <div>
                        {/* <Button color="inherit">About</Button> */}
                        <Link to="/login" style={{textDecoration:"none", color:"white"}}><Button color="inherit">Login</Button></Link>
                        <Link to="/create_account" style={{textDecoration:"none", color:"white"}}><Button color="inherit">Register</Button></Link>
                    </div>
                    
                </Toolbar>
            </AppBar>
        );
    }
}