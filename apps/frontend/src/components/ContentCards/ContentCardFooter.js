import React, { Component } from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, Typography, Link } from '@material-ui/core';
import { KeyboardArrowUpOutlined, KeyboardArrowDownOutlined, OpenInNew, Flag, Link as LinkIcon } from '@material-ui/icons';

export default class ContentCardFooter extends Component {

    state = {
        showUrl:false,
    }

    render() {
        return (
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <IconButton size='small' variant='outlined'>
                    <KeyboardArrowUpOutlined/>
                </IconButton>
                <IconButton size='small' variant='outlined'>
                    <KeyboardArrowDownOutlined/>
                </IconButton>
                <IconButton size='small' variant='outlined' onClick={() => this.setState({showUrl:true})}>
                    <LinkIcon/>
                </IconButton>
                <IconButton size='small' variant='outlined'>
                    <OpenInNew/>
                </IconButton>
                <IconButton size='small' variant='outlined'>
                    <Flag/>
                </IconButton>
                <Dialog open={this.state.showUrl} onClose={() => this.setState({showUrl: false})}>
                    {/* <DialogTitle>URL: </DialogTitle> */}
                    <DialogContent>
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <DialogContentText style={{padding:13, overflowX:"auto", backgroundColor:"#1e90ff", borderRadius:4}}>
                                <Typography>
                                    <a href={"www.google.com"} style={{color:"white", textAlign:"center"}}>
                                        fjaslkfjdlkajfkldsajf;kljfl;kdfadlksfjaklsfjklasdfhjaksdfdfdasfdsfdsafdsafdsafadsfdasfdsafdsafdsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddk
                                    </a>
                                </Typography>
                            </DialogContentText>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}