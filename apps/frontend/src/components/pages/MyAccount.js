import React, { Component } from 'react';
import Header from '../Header/Header';
import NavigationDrawer from '../NavigationDrawer/NavigationDrawer';
import { Paper, Typography, List, ListItem, ListItemSecondaryAction, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import LeaderboardTable from '../LeaderboardTable/LeaderboardTable';
import { Delete } from '@material-ui/icons';
import { gradientTheme } from '../../themes';
import { connect } from 'react-redux';
import fetchErrorChecker from '../ErrorHandler/fetchErrorChecker';
import ErrorHandler from '../ErrorHandler/ErrorHandler';

const styles = {
    statCard: {
        flex:1, 
        marginLeft:20, 
        marginRight:20, 
        marginTop:20, 
        minWidth:250, 
        height:220, 
        display:"flex", 
        justifyContent:'center', 
        flexDirection:"column", 
    }
}

const gradientTheme2 = "linear-gradient(to right, #5c6ce8, #5c6ce8)";
// const gradientTheme = "linear-gradient(to right, #e53935, #e35d5b)";

function ConfirmationDialog (props) {
    return (
        <Dialog disableBackdropClick disableEscapeKeyDown open={props.isDialogOpen}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>You are about to permanantly delete "{props.title}". Press OK to proceed.</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleCancel} color="primary" >
                    Cancel
                </Button>
                <Button onClick={props.handleOk} color="primary">
                    <strong>Ok</strong>
                </Button>
            </DialogActions>
        </Dialog>
    )
}

class ContributionListItem extends Component {

    state = {
        deleteConfirmationIsOpen:false,
    }

    deleteContribution = (data) => {
        let urlBase = {
            "SUPPLEMENTARY_APPLICATION": "supplementary_applications",
            "RESOURCE_ITEM": "resource_items",
        }
        fetch(`/api/${urlBase[this.props.type]}/${data.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.auth.token}`
            },
            method:'DELETE'
        })
        .then(response => fetchErrorChecker(response))
        .then(responseData => {
            this.props.deleteContributionCallback(data.id, this.props.type);
            return responseData;
        })
        .catch(err => console.log (err))
    }

    render () {
        return (
            <div>
                <Paper style={{marginBottom:10}}>
                    <List dense={true}>
                        <ListItem>
                            <ListItemText>
                                <Typography noWrap={true}>{this.props.data.title}</Typography>
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => this.setState({deleteConfirmationIsOpen:true})}>
                                    <Delete/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </Paper>
                <ConfirmationDialog 
                    isDialogOpen={this.state.deleteConfirmationIsOpen} 
                    handleCancel={() => this.setState({
                        deleteConfirmationIsOpen:false,
                    })}
                    handleOk={() => {
                        this.deleteContribution(this.props.data);
                        this.setState({
                            deleteConfirmationIsOpen:false,
                        })
                    }}
                    title = {this.props.data.title}
                />
            </div>
        )
    }
}

class MyAccount extends Component {

    state = {
        netUpvotes: 0,
        globalRank:0,
        totalContributions:0,
        mySupplementaryApplicationData: [],
        myResourceItemData: [],
        deleteConfirmationIsOpen: false,
    }

    componentDidMount() {
        this.loadData('/api/my_supplementary_applications/', 'mySupplementaryApplicationData');
        this.loadData('/api/my_resource_items/', 'myResourceItemData');
        this.loadData('/api/my_global_rank', 'globalRank');
        this.loadData('/api/my_total_contributions', 'totalContributions');
        this.loadData('/api/my_net_upvotes', 'netUpvotes');
    }

    loadData = (APIurl, keyInState) => {
        fetch(APIurl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.auth.token}`
            }
        })
        .then (response => fetchErrorChecker(response))
        .then (responseData => {
            this.setState({
                [keyInState]: responseData.data
            }, ()=> {
                this.setState({
                    dataLoaded:true
                });
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    deleteContribution = (id, type) => {
        if (type == "SUPPLEMENTARY_APPLICATION") {
            this.setState({
                mySupplementaryApplicationData: this.state.mySupplementaryApplicationData.filter (data => data.id != id),
            })
        } else if (type == "RESOURCE_ITEM") {
            this.setState({
                myResourceItemData: this.state.myResourceItemData.filter (data => data.id != id),
            })
        }
    }

    render() {
        return (
            <div style={{backgroundColor:"#f1f2f6", width:"100%", minHeight:"100%", position:"absolute", paddingBottom:20, top:0, left:0}}>
                <Header/>
                <NavigationDrawer/>
                <div style={{width:"100%", display:"flex", flexWrap:"wrap", flexDirection:"row", paddingBottom:20, justifyContent:"space-between" }}>
                    <Paper style={{background: "linear-gradient(to left, #4776e6, #8e54e9)", ...styles.statCard}}>
                        <Typography variant='h1' style={{color:"white"}} align='center'>
                                <strong>
                                    {this.state.totalContributions}
                                </strong>
                            </Typography>
                        <Typography variant='h5' style={{color:"white", fontSize:20}} align='center'><strong>TOTAL CONTRIBUTIONS</strong></Typography>
                    </Paper>
                    <Paper style={{background: "linear-gradient(to top, #4776e6, #8e54e9)", ...styles.statCard}}>
                        <Typography variant='h1' style={{color:"white"}} align='center'><strong>{this.state.netUpvotes}</strong></Typography>
                        <Typography variant='h5' style={{color:"white", fontSize:20}} align='center'><strong>TOTAL UPVOTES</strong></Typography>
                    </Paper>
                    <Paper style={{background: gradientTheme, ...styles.statCard}}>
                        <Typography variant='h1' style={{color:"white"}} align='center'><strong>{this.state.globalRank}</strong></Typography>
                        <Typography variant='h5' style={{color:"white", fontSize:20}} align='center'><strong>GLOBAL RANK</strong></Typography>
                    </Paper>
                </div>
                <div style={{marginLeft:20, marginRight:20, display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
                    {/* <LeaderboardTable/> */}
                    <div style={{maxHeight:700, overflowY:"auto", flex:1, marginRight:10, padding:10, minWidth:250}}>
                        <Paper style={{marginBottom:10, background: gradientTheme2}}>
                            <List>
                                <ListItem>
                                    <ListItemText style={{color:"white"}}>MY NOTES</ListItemText>
                                </ListItem>
                            </List>
                        </Paper>
                        {
                            this.state.mySupplementaryApplicationData.map((supplementaryApplication)=> {
                                return (
                                    <ContributionListItem data={supplementaryApplication} key={supplementaryApplication.id} auth={this.props.auth} type="SUPPLEMENTARY_APPLICATION" deleteContributionCallback={this.deleteContribution} />
                                );
                            })
                        }
                    </div>
                    {/* <div style={{maxHeight:500, overflowY:"auto", flex:1, marginRight:10, padding:10, minWidth:250}}>
                        <Paper style={{marginBottom:10, background: gradientTheme2}}>
                            <List>
                                <ListItem>
                                    <ListItemText style={{color:"white"}}>MY INTERVIEW QUESTIONS</ListItemText>
                                </ListItem>
                            </List>
                        </Paper>
                        {
                            [0,0,0,0,0,0].map(()=> {
                                return (
                                    <Paper style={{marginBottom:10}}>
                                        <List dense={true}>
                                            <ListItem>
                                                <ListItemText>
                                                    Random Contribution
                                                </ListItemText>
                                                <ListItemSecondaryAction>
                                                    <IconButton>
                                                        <Delete/>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </List>
                                    </Paper>
                                );
                            })
                        }
                    </div> */}
                    {/* <div style={{maxHeight:500, overflowY:"auto", flex:1, padding:10, minWidth:250}}>
                        <Paper style={{marginBottom:10, background: gradientTheme2}}>
                            <List>
                                <ListItem>
                                    <ListItemText style={{color:"white"}}>MY SCHOLARSHIP APPLICATIONS</ListItemText>
                                </ListItem>
                            </List>
                        </Paper>
                        {
                            [0,0,0,0,0].map(()=> {
                                return (
                                    <Paper style={{marginBottom:10}}>
                                        <List dense={true}>
                                            <ListItem>
                                                <ListItemText>
                                                    Random Contribution
                                                </ListItemText>
                                                <ListItemSecondaryAction>
                                                    <IconButton>
                                                        <Delete/>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </List>
                                    </Paper>
                                );
                            })
                        }
                    </div> */}
                    <div style={{maxHeight:500, overflowY:"auto", flex:1, padding:10, minWidth:250}}>
                        <Paper style={{marginBottom:10, background: gradientTheme2}}>
                            <List>
                                <ListItem>
                                    <ListItemText style={{color:"white"}}>MY RESOURCES</ListItemText>
                                </ListItem>
                            </List>
                        </Paper>
                        {
                            this.state.myResourceItemData.map((resource)=> {
                                return (
                                    <ContributionListItem data={resource} key={resource.id} auth={this.props.auth} type="RESOURCE_ITEM" deleteContributionCallback={this.deleteContribution} />
                                );
                            })
                        }
                    </div>
                </div>
                <ErrorHandler/>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        auth: store.auth,
    }
}

export default connect(mapStateToProps)(MyAccount)