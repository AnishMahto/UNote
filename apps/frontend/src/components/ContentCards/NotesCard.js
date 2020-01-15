import React, { Component } from 'react';
import { Card, CardContent, Typography, Button, IconButton, Icon, Chip } from '@material-ui/core';
import ContentCardFooter from './ContentCardFooter';
import store from '../../store';
import { connect } from 'react-redux';
import fetchErrorChecker from '../ErrorHandler/fetchErrorChecker';
import gradientTheme from '../../themes';

const styles = {
    chip: {
        marginRight:6
    }
}

export const tagColors = {
    "USER_NOTES":"#78e08f",
    "PROF_NOTES":"#7f8fa6"
}

// export class SupplementaryApplicationCardBody extends Component {}

class NotesCard extends Component {

    state = {
        data: this.props.data,
        tagColor: null,
    }

    vote = (isUpvote) => {
        let upvote_parameter = "";
        if (isUpvote) {
            upvote_parameter = "upvote";
        } else {
            upvote_parameter = "downvote";
        }
        fetch(`/api/supplementary_applications/${upvote_parameter}/${this.state.data.id}/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.auth.token}`
            },
            method:'PATCH'
        })
        .then (response => fetchErrorChecker(response))
        .then (responseData => {
            // this.setState({
            //     data: responseData.data
            // })
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <Card style={{width:270, height:270, marginBottom:10, marginLeft:5, marginRight:5}}>
                <Typography variant='overline' component='title' display='block' style={{height:40, fontSize:16, padding:6, paddingLeft:15}} noWrap={true} gutterBottom>
                        {this.state.data.title}
                    </Typography>
                <CardContent style={{paddingTop:0}}>
                    
                    <div style={{display:"flex", flexDirection:"row", justifyContent:'space-between' }}>
                        <Typography variant='caption' color='textSecondary'>
                            {this.state.data.year+"/"+(parseInt(this.state.data.year)+1)}
                        </Typography>
                    </div>
                    <Typography variant='body1' component='summary' style={{height:80, overflowY:"hidden", marginTop:5 }}>
                        {(this.state.data.description.length > 90) ? this.state.data.description.slice(0,90) + "...":this.state.data.description}
                    </Typography>
                    <Typography variant='caption' component='footer' color='textSecondary'>
                        {this.state.data.net_upvotes} Upvotes
                    </Typography>

                     
                    <div style={{paddingTop:7, paddingBottom:7}}>
                        {(this.props.data.tag.length > 0) ? 
                            (<Chip label={this.props.data.tag.split('_').join(' ')} size='small' style={styles.chip, {backgroundColor:tagColors[this.props.data.tag], color:"white" }} />):
                            (<div style={{paddingTop:3, paddingBottom:3, fontStyle:"italic"}}>
                                <Typography variant='caption'>No Tags Provided</Typography>
                            </div>)}
                    </div>
                    <ContentCardFooter data={this.state.data} voteCallback={this.vote}/>
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        auth: store.auth
    }
}

export default connect(mapStateToProps)(NotesCard)