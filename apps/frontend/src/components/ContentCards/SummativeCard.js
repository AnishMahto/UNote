import React, { Component } from 'react';
import { Card, CardContent, Typography, Button, IconButton, Icon, Chip } from '@material-ui/core';
import ContentCardFooter from './ContentCardFooter';

const styles = {
    chip: {
        marginRight:6,
    }
}

export default class SummativeCard extends Component {
    render() {
        return (
            <Card style={{width:250, height:250, marginBottom:10, marginLeft:5, marginRight:5}}>
                <CardContent>
                    <Typography variant='subtitle1' component='title' display='block' gutterBottom>
                        HL ENGLISH WT1
                    </Typography>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:'space-between' }}>
                        <Typography variant='caption' color='textSecondary'>
                            LEVEL 6
                        </Typography>
                        <Typography variant='caption' color='textSecondary'>
                            2018/2019
                        </Typography>
                    </div>
                    <Typography variant='body1' component='summary' style={{height:80, overflowY:"auto"}}>
                        One of the most annoying assignments I've had to do in grade 12 english.
                    </Typography>
                    <Typography variant='caption' component='footer' color='textSecondary'>
                        27 Likes
                    </Typography>
                    <div style={{paddingTop:7, paddingBottom:7}}>
                        <Chip label="WT1" size='small' style={styles.chip} />
                        <Chip label="HL" size='small'  style={styles.chip} />
                    </div>
                    <ContentCardFooter/>
                </CardContent>
            </Card>
        );
    }
}