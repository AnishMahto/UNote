import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { gradientTheme } from '../../themes';
import { Fab, TextField, Button, Typography, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import LoginPageHeader from '../LoginPageHeader/LoginPageHeader';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import fetchErrorChecker from '../ErrorHandler/fetchErrorChecker';
import store from '../../store';

class CreateAccountForm extends Component {

    state = {
        registrationInput: {
            email: '',
            username: '',
            password: '',
            passwordRetype: '',
        },
        accountSuccessfullyCreated: false,
    }

    createAccount = () => {

        if (this.state.registrationInput.password !== this.state.registrationInput.passwordRetype) {
            store.dispatch ({
                type:"GET_ERROR",
                payload:"Passwords entered do not match"
            })
            return;
        }

        let registrationData = {
            "email": this.state.registrationInput.email,
            "username": this.state.registrationInput.username,
            "password": this.state.registrationInput.password,
        }

        fetch ("/api/auth/register", {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        })
        .then (response => fetchErrorChecker(response))
        .then (() => this.setState({
            accountSuccessfullyCreated: true,
        }))
        .catch(error => error);
    }

    handleRegistrationInput = (registrationValue, event) => {
        this.setState({
            registrationInput: Object.assign({}, this.state.registrationInput, {
                [registrationValue]: event.target.value,
            })
        });
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.createAccount();
        }
    }

    render () {

        if (this.state.accountSuccessfullyCreated) {
            return (
                <Paper style={{flex:6, minHeight:550, maxWidth:500, backgroundColor:"white", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column",  borderRadius:7}}>
                <div style={{width:100, height:100, background:gradientTheme, marginBottom:20, borderRadius:7}}></div>
                    
                <div style={{maxWidth:"70%", padding:8, textAlign:"center"}}>
                    <Typography variant='caption' style={{color:"grey", fontSize:20}}>Account Successfully Created!</Typography>
                </div>
                    
                <div style={{display:"flex", flexDirection:"row", justifyContent:"center", marginTop:10}}>
                    <Typography variant='caption' style={{color:"grey", marginRight:5}} >Have An Account?</Typography>
                    <Link to="/login" style={{textDecoration:"none"}}><Typography variant='caption' color='primary' onClick={this.props.switchComponent} style={{cursor:"pointer"}}>Login</Typography></Link>
                </div>
            </Paper>
            );
        }

        return (
            <Paper style={{flex:6, minHeight:550, maxWidth:500, backgroundColor:"white", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column",  borderRadius:7}}>
                <div style={{width:100, height:100, background:gradientTheme, marginBottom:20, borderRadius:7}}></div>
                <TextField 
                    variant='outlined' 
                    placeholder='Email' 
                    onChange={(event) => this.handleRegistrationInput("email", event)} 
                    onKeyDown={this.handleKeyDown} 
                    style={{marginBottom:15, width:"80%"}}
                />
                <TextField 
                    variant='outlined' 
                    placeholder='Username' 
                    onChange={(event) => this.handleRegistrationInput("username", event)} 
                    onKeyDown={this.handleKeyDown} 
                    style={{marginBottom:15, width:"80%"}} 
                />
                <TextField 
                    variant='outlined' 
                    type="password" 
                    onChange={(event) => this.handleRegistrationInput("password", event)} 
                    onKeyDown={this.handleKeyDown} 
                    placeholder='Password' 
                    style={{marginBottom:15, width:"80%"}} 
                />
                <TextField 
                    variant='outlined' 
                    type="password" 
                    onChange={(event) => this.handleRegistrationInput("passwordRetype", event)} 
                    onKeyDown={this.handleKeyDown} 
                    placeholder='Confirm Password' 
                    style={{marginBottom:15, width:"80%"}}
                />
                <Button variant='contained' onClick={this.createAccount} style={{background:gradientTheme, color:"white", width:"80%", height:50}}>Create Account</Button>
                
                <div style={{display:"flex", flexDirection:"row", justifyContent:"center", marginTop:10}}>
                    <Typography variant='caption' style={{color:"grey", marginRight:5}} >Have An Account?</Typography>
                    <Link to="/login" style={{textDecoration:"none"}}><Typography variant='caption' color='primary' onClick={this.props.switchComponent} style={{cursor:"pointer"}}>Login</Typography></Link>
                </div>
            </Paper>
        );
    }
}

export default class CreateAccount extends Component {

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
                <div style={{flex:0.5}}></div>
                <div style={{flex:7, display:"flex", flexDirection:"row", justifyContent:"center", zIndex:1}}>
                    <div style={{flex:1}}></div>
                        <CreateAccountForm/>
                    <div style={{flex:1}}></div>
                </div>
                <div style={{flex:1.5}}></div>
                <ErrorHandler/>
            </div>
        );
    }
}