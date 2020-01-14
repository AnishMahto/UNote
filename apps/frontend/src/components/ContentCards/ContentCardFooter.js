import React, { Component } from 'react';
import { IconButton, Dialog, DialogContent, DialogContentText, Typography, Tooltip } from '@material-ui/core';
import { KeyboardArrowUpOutlined, KeyboardArrowDownOutlined, OpenInNew, Flag, Link as LinkIcon, Info } from '@material-ui/icons';
import store from '../../store';

export default class ContentCardFooter extends Component {

    state = {
        showUrl:false,
        downvoteBtnActive: false,
        upvoteBtnActive: false,
    }

    expandCard = (cardData) => {
        store.dispatch({
            type: "EXPAND_CARD",
            payload: cardData
        })
    }

    render() {
        return (
            <div style={{display:"flex", justifyContent:"space-between", padding:7}}>
                <IconButton size='small' variant='outlined' onClick={() => {
                    this.props.voteCallback(true);
                    this.setState({
                        upvoteBtnActive:!this.state.upvoteBtnActive,
                        downvoteBtnActive:false
                    })
                }}>
                    <Tooltip title="Upvote">
                        <KeyboardArrowUpOutlined color={this.state.upvoteBtnActive ? "primary":"inherit"} />
                    </Tooltip>
                </IconButton>
                
                <IconButton size='small' variant='outlined' onClick={() => {
                    this.props.voteCallback(false);
                    this.setState({
                        upvoteBtnActive:false,
                        downvoteBtnActive:!this.state.downvoteBtnActive,
                    })
                }}>
                    <Tooltip title="Downvote">
                        <KeyboardArrowDownOutlined color={this.state.downvoteBtnActive ? "primary":"inherit"} />
                    </Tooltip>
                </IconButton>
                
                <IconButton size='small' variant='outlined' onClick={() => window.open(this.props.data.url, "_blank")}>
                    <Tooltip title="Open URL">
                        <OpenInNew/>
                    </Tooltip>
                </IconButton>

                <IconButton size='small' variant='outlined' onClick={() => this.expandCard(this.props.data)}>
                    <Tooltip title="More Info">
                        <Info/>
                    </Tooltip>
                </IconButton>
                
            </div>
        );
    }
}