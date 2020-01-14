import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import SupplementaryApplicationCard from '../ContentCards/SupplementaryApplicationCard';
import { Typography, Card, CardContent, Slide, CircularProgress, IconButton, Tooltip, Chip } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import fetchErrorChecker from '../ErrorHandler/fetchErrorChecker';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import { tags } from '../ContentCards/SupplementaryApplicationCard';

class CardGrid extends Component {

    render() {
        return (
            <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", flex:1}}>
                {
                    this.props.data.map((postInfo) => {
                        return (
                            <Slide key={Math.random()} direction="right" in={true}>
                                <div>
                                    <SupplementaryApplicationCard
                                        data = {
                                            {
                                                title: postInfo.title, 
                                                net_upvotes: postInfo.net_upvotes,
                                                url: postInfo.url,
                                                description: postInfo.description,
                                                created_at: postInfo.created_at,
                                                year: postInfo.year,
                                                id: postInfo.id,
                                                tag: postInfo.tag
                                            }
                                        }
                                    />
                                </div>
                            </Slide>
                        )
                    })
                }
            </div>
        )
    }
}

const styles = {
    chip: {
        marginRight:6,
    }
}

class SupplementaryApplicationsTab extends Component {

    state = {
        dataLoaded:true,
        data: [],
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        //if props updated and changed the university/program selected, reload data from server
        if (prevProps.organization != this.props.organization || prevProps.program != this.props.program) {
            this.loadData();
        }
    }

    loadData = () => {
        if (!this.props.organization) {
            this.setState({dataLoaded:true});
            return;
        }
        let queryURL = `/api/supplementary_applications/${this.props.organization.id}/` + (this.props.program ? this.props.program.id:"");
        fetch(queryURL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.auth.token}`
            }
        })
        .then (response => fetchErrorChecker(response))
        .then (responseData => {
            this.setState({
                data: responseData.data
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

    render() {
        if (!this.state.dataLoaded) {
            return (
                <div style={{marginTop:100, height:200, width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <CircularProgress/>
                    <ErrorHandler/>
                </div>
            );
        } else if (this.state.data.length == 0) {
            return (
                <div style={{marginTop:100}}>
                    <Typography variant='overline' display='block' style={{color:"#747d8c", textAlign:"center"}} gutterBottom>No entries found for <strong>supplementary applications</strong>. Be the first to add one!</Typography>
                    <ErrorHandler/>
                </div>
            );
        } else {
            return (
                <div>
                    {this.props.expandedCard!=null ? 
                        (
                            <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap-reverse"}}>
                                <div style={{maxHeight:"80vh", overflowY:"auto", flex:1}}>
                                    <CardGrid data={this.state.data}/>
                                </div>
                                <div style={{flex:1, flexDirection:"row", justifyContent:"center", paddingLeft:30, paddingRight:30}}>
                                    <Slide direction="up" in={true}>
                                        
                                        <Card style={{minHeight:500, width:"90%", minWidth:300, paddingTop:10, paddingBottom:10}}>
                                            <CardContent>
                                                
                                                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between" }}>

                                                    <div style={{flex:9, display:"flex", paddingLeft:30, flexDirection:"row"}}>
                                                        <Typography variant='overline' style={{fontSize:18}}>{this.props.expandedCard.title}</Typography>
                                                    </div>

                                                    <div style={{flex:1}}>
                                                        <Tooltip title="Close">
                                                            <IconButton onClick={() => store.dispatch({type:"EXPAND_CARD", payload:null})}>
                                                                <Close/>
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>

                                                </div>

                                                <div style={{paddingLeft:30, paddingRight:30, marginTop:10}}>
                                                    <Typography variant='caption' color='textSecondary' style={{marginTop:10}}>
                                                        {this.props.expandedCard.url}
                                                    </Typography>
                                                    <div style={{display:"flex", flexDirection:"row", justifyContent:'space-between' }}>
                                                        <Typography variant='caption' color='textSecondary'>
                                                            {this.props.expandedCard.year+"/"+(parseInt(this.props.expandedCard.year)+1)}
                                                        </Typography>
                                                    </div>
                                                    <Typography variant='body1' component='summary' style={{height:300, overflowY:"auto", marginTop:10}}>
                                                        {this.props.expandedCard.description}
                                                    </Typography>
                                                    <Typography variant='caption' component='footer' color='textSecondary' style={{marginTop:10}}>
                                                        {this.props.expandedCard.net_upvotes} Upvotes
                                                    </Typography>
                                                    <div style={{paddingTop:7, paddingBottom:7}}>
                                                        {(this.props.expandedCard.tag.length > 0) ? 
                                                            (<Chip label={this.props.expandedCard.tag} size='small' style={styles.chip, {backgroundColor:tags[this.props.expandedCard.tag], color:"white" }} />):
                                                            (<div style={{paddingTop:4, paddingBottom:4, fontStyle:"italic"}}>
                                                                <Typography variant='caption'>No Tags Provided</Typography>
                                                            </div>)}
                                                    </div>
                                                </div>

                                            </CardContent>
                                        </Card>
                                        
                                    </Slide>
                                </div>
                            </div>
                        )
                    :<CardGrid data={this.state.data}/>}
                    <ErrorHandler/>
                </div>
            );
        }
    }
}

const mapStateToProps = (store) => {
    return {
        expandedCard: store.home.expandedCard,
        auth: store.auth,
        organization: store.organization,
        program: store.subject,
    }
}

export default connect(mapStateToProps)(SupplementaryApplicationsTab)