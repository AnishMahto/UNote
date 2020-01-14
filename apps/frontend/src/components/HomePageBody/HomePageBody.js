import React, { Component } from 'react';
import { Typography, Fab, IconButton, Drawer, Button, Icon, Tooltip, Paper, Card, CardContent, Slide, GridList, GridListTile, GridListTileBar, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions, Grid, Grow, Fade, CircularProgress } from '@material-ui/core';
import { ViewList, ViewModule, Sort, LocationCity, LocalLibrary, ExpandMore, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined, Timer } from '@material-ui/icons';
import { connect } from 'react-redux';
import OrganizationSelectorList from '../OrganizationSelectorList/OrganizationSelectorList';
import SubjectSelectorList from '../ProgramSelectorList/ProgramSelectorList';
import { gradientTheme } from '../../themes';
// import Roboto from 'typeface-roboto';
import SupplementaryApplicationsTab from '../HomePageTabs/SupplementaryApplicationsTab';
import ScholarshipsTab from '../HomePageTabs/ScholarshipsTab';
import ResourcesTab from '../HomePageTabs/ResourcesTab';
import InterviewTab from '../HomePageTabs/InterviewTab';
import HomePageToolBar from './HomePageToolBar';

class HomePageBody extends Component {

    state = {
        data: []
    }

    render() {
        if (this.state.data.length == 0 && this.props.tab!="SUMMATIVES" && this.props.tab!="RESOURCES" && this.props.tab!="INTERVIEW" && this.props.tab!="SCHOLARSHIPS") {
            return (
                <div style={{marginTop:100}}>
                    <Typography variant='overline' display='block' style={{color:"#747d8c", textAlign:"center"}} gutterBottom>No entries found for <strong>{this.props.type}</strong>. Be the first to add one!</Typography>
                </div>
            );
        } else if (this.props.tab == "RESOURCES") {
            return <ResourcesTab/>
        } else if (this.props.tab == "INTERVIEW") {
            return <InterviewTab/>
        } else if (this.props.tab == "SCHOLARSHIPS") {
            return <ScholarshipsTab/>
        } else {
            return (
                <div>
                    <HomePageToolBar/>    
                    <SupplementaryApplicationsTab/>
                </div>
            );
        }
    }
}

const mapStateToProps = (store) => {
    return {
        tab: store.home.tab,
    }
}

export default connect(mapStateToProps)(HomePageBody)