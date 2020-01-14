import React, { Component } from 'react';
import { Typography, IconButton, Card, Slide, GridList, GridListTile, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions, Grow } from '@material-ui/core';
import { ExpandMore, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from '@material-ui/icons';
import { gradientTheme } from '../../themes';

export default class InterviewTab extends Component {

    state = {
        data: {
            iq1: [1,2,3,4,5,6,7,8]
        }
    }

    render() {
        return (
            // <div>
                <div style={{display:"flex", width:"100%", flexDirection:"row", flexWrap:"wrap"}}>
                    <div style={{flex:1, alignContent:"center", padding:20}}>
                        <Grow in={true}>
                            <Card style={{padding:15, background: gradientTheme}}>
                                <Typography style={{color:"white"}} variant='overline'>QUALITATIVE QUESTIONS</Typography>
                            </Card>
                        </Grow>
                        {
                            this.state.data.iq1.map(() => {
                                return (
                                    <Slide key={Math.random()} direction="up" in={true}>
                                        <ExpansionPanel>
                                            <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                                                <Typography>Question</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails style={{display:"flex", flexDirection:"column"}}>
                                                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", flex:1, height:40}}>
                                                    <Typography variant='caption' component='footer' color='textSecondary'>
                                                        27 Likes
                                                    </Typography>
                                                    <Typography variant='caption' color='textSecondary'>
                                                        Time: 60s
                                                    </Typography>
                                                    <Typography variant='caption' color='textSecondary'>
                                                        2018/2019
                                                    </Typography>
                                                </div>
                                                <GridList cols={1} spacing={10} style={{flex:1, paddingTop:10}}>
                                                    <GridListTile style={{backgroundColor:"#f1f2f6", marginBottom:10}}></GridListTile>
                                                    <GridListTile style={{backgroundColor:"#f1f2f6", marginBottom:10}}></GridListTile>
                                                </GridList>
                                            </ExpansionPanelDetails>
                                            <ExpansionPanelActions>
                                                <IconButton>
                                                    <KeyboardArrowUpOutlined/>
                                                </IconButton>
                                                <IconButton>
                                                    <KeyboardArrowDownOutlined/>
                                                </IconButton>
                                            </ExpansionPanelActions>
                                        </ExpansionPanel>
                                    </Slide>
                                );
                            })
                        }
                    </div>
                    <div style={{flex:1, alignContent:"center", padding:20}}>
                        <Grow in={true}>
                            <Card style={{padding:15, background: gradientTheme}}>
                                <Typography style={{color:"white"}} variant='overline'>QUANTITATIVE QUESTIONS</Typography>
                            </Card>
                        </Grow>
                        <Slide direction="up" in={true}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary>
                                    <Typography>Question</Typography>
                                </ExpansionPanelSummary>
                            </ExpansionPanel>
                        </Slide>
                    </div>
                </div>
            // </div>
        );
    }
}