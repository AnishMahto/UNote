import React, { Component } from 'react';
import { Typography, Paper, Slide, GridList, GridListTile, GridListTileBar, Button, IconButton, Fab, Tooltip } from '@material-ui/core';
import { gradientTheme } from '../../themes';
import { ChevronRight, ChevronLeft, OpenInNew } from '@material-ui/icons';
import { connect } from 'react-redux';
import fetchErrorChecker from '../ErrorHandler/fetchErrorChecker';
import getResourceTypes from '../UploadForm/getResourceTypes';

class CarouselLeft extends Component {

    shiftCarouselLeft = () => {
        document.getElementById(this.props.elementId).scrollLeft -= document.getElementById(this.props.elementId).offsetWidth * 0.9;
    }

    render () {
        return (
            <Paper onClick={this.shiftCarouselLeft} style={{height:180, cursor:"pointer", backgroundColor:"white", marginRight:8, width:30, marginTop:13, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <ChevronLeft/>
            </Paper>
        );
    }
}

class CarouselRight extends Component {
    
    shiftCarouselRight = () => {
        document.getElementById(this.props.elementId).scrollLeft += document.getElementById(this.props.elementId).offsetWidth * 0.9;
    }
    
    render () {
        return (
            <Paper onClick={this.shiftCarouselRight} style={{height:180, cursor:"pointer", backgroundColor:"white", marginLeft:8, width:30, marginTop:13, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <ChevronRight/>
            </Paper>
        );
    }    
}

function ResourceCarousel (props) {
    return (
    <div style={{display:"flex", flexDirection:"row"}}>
        <CarouselLeft elementId={props.id} />
            <GridList id={props.id} cols={7} spacing={8} style={{ overflowX:"hidden", flexWrap:"nowrap", marginTop:10, scrollBehavior:"smooth"}}>
                <GridListTile style={{width:220}}>
                    <Paper style={{height:"100%", padding:15, background: 'linear-gradient(to top, #4776e6, #8e54e9)'}}>
                        <Typography variant="h1" style={{color:"white", fontSize:28}} ><strong>{props.data.resourceLabel}</strong></Typography>
                    </Paper>
                </GridListTile>
                {
                    props.data.resourceItems.map((resource) => {
                        return (
                            <Slide direction="left" in={true} key={Math.random()}>
                                <GridListTile style={{width:250}}>
                                    <GridListTileBar title={resource.url_base} actionIcon={
                                        <IconButton style={{color:"white"}}>
                                            <Tooltip title={resource.url}>
                                                <a href={resource.url} target='_blank' style={{textDecoration:"none", color:"white"}}><OpenInNew/></a>
                                            </Tooltip>
                                        </IconButton>
                                    }>
                                    </GridListTileBar>
                                    <Paper style={{height:"100%", display:"flex", flexDirection:"row"}}>
                                        <div style={{padding:15}}>
                                            <Typography variant='button' style={{fontSize:16}}>{resource.title}</Typography>
                                        </div>
                                    </Paper>
                                </GridListTile>
                            </Slide>
                        )
                    })
                }
            </GridList>
        <CarouselRight elementId="articlesAndWrittenResourcesGridList" />
    </div>)
}

class ResourcesTab extends Component {
    
    state = {
        articles: [],
        videos: [],
        miscellaneous: [],
        data: [],
        resourceTypes: [],
        dataLoaded:false,
    }

    componentDidMount() {
        this.loadResourceTypesAndData()
    }

    loadResourceTypesAndData () {
        getResourceTypes(data => {
            this.setState({
                resourceTypes: data
            }, () => {
                this.loadData();
            })
        })
    }

    componentDidUpdate(prevProps) {
        //if props updated and changed the university/program selected, reload data from server
        if (prevProps.organization != this.props.organization || prevProps.program != this.props.program) {
            this.loadResourceTypesAndData();
        }
    }

    loadData = () => {
        if (!this.props.organization) {
            this.setState({dataLoaded:true});
            return;
        }
        let queryURL = `/api/resource_items/${this.props.organization.id}/` + (this.props.program ? this.props.program.id:"");
        fetch(queryURL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.auth.token}`
            }
        })
        .then (response => fetchErrorChecker(response))
        .then (responseData => {
            let data = {}
            this.state.resourceTypes.map (resourceType => {
                data[resourceType.id] = {
                    resourceLabel: resourceType.label.toUpperCase(),
                    resourceItems: []
                };
            })
            responseData.data.map (resourceItem => {
                if (resourceItem.resource_type in data) {
                    data[resourceItem.resource_type].resourceItems.push (resourceItem);
                }
            });
            this.setState({
                data: data
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

    getDataAtDataObjectIndex (index) {
        if (!this.state.dataLoaded) {
            return {
                resourceLabel: "Data Unavailable",
                resourceItems: [],
            };
        }
        if (this.state.data[Object.keys(this.state.data)[index]] === undefined) {
            return {
                "resourceLabel": "No Data Available",
                resourceItems:[],
            }
        }
        return this.state.data[Object.keys(this.state.data)[index]];
    }
    
    render() {
        return (
            <div>
                <div style={{padding:10}}>
                    <ResourceCarousel data={this.getDataAtDataObjectIndex(0)} id="articlesAndWrittenResourcesGridList"/>
                    <ResourceCarousel data={this.getDataAtDataObjectIndex(1)} id="videoResourcesAndImagesGridList"/>
                    <ResourceCarousel data={this.getDataAtDataObjectIndex(2)} id="miscResourcesGridList"/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        auth: store.auth,
        organization: store.organization,
        program: store.subject,
    }
}

export default connect(mapStateToProps)(ResourcesTab)