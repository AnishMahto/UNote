import React, { Component } from 'react';
import { Typography, Fab, IconButton, Drawer, Button, Icon, Tooltip, Paper, Card, CardContent, Slide, GridList, GridListTile, GridListTileBar, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions, Grid, Grow, Fade, CircularProgress } from '@material-ui/core';
import { ViewList, ViewModule, Sort, LocationCity, LocalLibrary, ExpandMore, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined, Timer } from '@material-ui/icons';
import { connect } from 'react-redux';
import OrganizationSelectorList from '../OrganizationSelectorList/OrganizationSelectorList';
import SubjectSelectorList from '../ProgramSelectorList/ProgramSelectorList';
import { gradientTheme } from '../../themes';
// import Roboto from 'typeface-roboto';
import SupplementaryApplicationsTab from '../HomePageTabs/NotesTab';
import ScholarshipsTab from '../HomePageTabs/ScholarshipsTab';
import ResourcesTab from '../HomePageTabs/ResourcesTab';
import InterviewTab from '../HomePageTabs/InterviewTab';
import HomePageToolBar from './HomePageToolBar';

class HomePageBody extends Component {

    state = {
        data: []
    }

    render() {
        if (this.props.tab == "RESOURCES") {
            return <ResourcesTab/>;
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