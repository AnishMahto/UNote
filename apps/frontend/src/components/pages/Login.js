import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { gradientTheme } from '../../themes';
import { Fab, TextField, Button, Typography, Paper, Snackbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import LoginPageHeader from '../LoginPageHeader/LoginPageHeader';
import fetchErrorChecker from '../ErrorHandler/fetchErrorChecker';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import store from '../../store';

class LoginForm extends Component {

    constructor (props) {
        super (props);
        this.state = {
            authInput: {
                username:'',
                password:'',
            },
            loggedIn:false,
        };
    }

    login = () => {
        fetch("/api/auth/login", {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username:this.state.authInput.username, password:this.state.authInput.password}),
        })
        .then(response => fetchErrorChecker(response))
        .then(response => {
            if (response.user) {
                store.dispatch({
                    type:"LOADED_USER",
                    payload: response,
                });
                this.setState({
                    loggedIn:true,
                })
            }
        })
        .catch(error => error);
    }

    handleAuthInput = (authValue, event) => {
        this.setState({
            authInput: Object.assign({}, this.state.authInput, {
                [authValue]: event.target.value,
            })
        });
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.login();
        }
    }

    render() {

        if (this.state.loggedIn) {
            return <Redirect to="/home"/>
        }

        return (
            <Paper id="login_form" style={{flex:6, maxWidth:500, backgroundColor:"white", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", borderRadius:7}}>
                {/* <Typography variant='h2' style={{fontSize:45, marginBottom:30}}>Login</Typography> */}
                <div style={{width:100, height:100, background:gradientTheme, marginBottom:20, borderRadius:7}}></div>
                <TextField 
                    name="username" 
                    onChange={(event) => this.handleAuthInput("username", event)} 
                    onKeyDown={this.handleKeyDown} 
                    variant='outlined' 
                    placeholder='Username' 
                    style={{marginBottom:15, width:"80%"}} 
                    required
                />
                <TextField 
                    name="password" 
                    onChange={(event) => this.handleAuthInput("password", event)} 
                    onKeyDown={this.handleKeyDown} 
                    variant='outlined' 
                    type="password" 
                    placeholder='Password' 
                    style={{marginBottom:15, width:"80%"}} 
                    required
                />
                <Button 
                    variant='contained' 
                    type="submit" 
                    style={{background:gradientTheme, color:"white", width:"80%", height:50}} 
                    onClick={this.login}
                >Login</Button>
                
                <div style={{display:"flex", flexDirection:"row", justifyContent:"center", marginTop:10}}>
                    <Typography variant='caption' style={{color:"grey", marginRight:5}} >Not Registered?</Typography>
                    <Link to="/create_account" style={{textDecoration:"none"}}><Typography variant='caption' color='primary' style={{cursor:"pointer"}}>Create An Account</Typography></Link>
                </div>
            </Paper>
        );
    }
}

export default class Login extends Component {
    render () {

        document.body.style.margin = 0;
        document.body.style.padding = 0;

        return (
            <div style={{width:"100vw", height:"100vh", background:"#ECECEC", display:"flex", flex:1, flexDirection:"column", left:0, top:0}}>
                <div style={{position:"absolute", background:gradientTheme, height:"70%", width:"100%"}}></div>
                <div style={{position:"absolute", background:"linear-gradient(to bottom, rgba(255,255,255,0), #ECECEC", height:"70%", width:"100%"}}></div>
                <div style={{flex:1}}>
                    <LoginPageHeader/>
                </div>
                <div style={{flex:1}}></div>
                <div style={{flex:7, display:"flex", flexDirection:"row", justifyContent:"center", zIndex:1}}>
                    <div style={{flex:1}}></div>
                        <LoginForm/>
                    <div style={{flex:1}}></div>
                </div>
                <div style={{flex:2}}></div>
                <ErrorHandler/>
            </div>
        );
    }
}