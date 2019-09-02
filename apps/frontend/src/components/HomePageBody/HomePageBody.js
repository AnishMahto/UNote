import React, { Component } from 'react';
import { Typography, Fab, IconButton, Drawer, Button, Icon } from '@material-ui/core';
import SummativeCard from '../ContentCards/SummativeCard';
import { ViewList, ViewModule, Sort, LocationCity, LocalLibrary } from '@material-ui/icons';
import { connect } from 'react-redux';
import OrganizationSelectorList from '../OrganizationSelectorList/OrganizationSelectorList';
import SubjectSelectorList from '../SubjectSelectorList/SubjectSelectorList';
// import Roboto from 'typeface-roboto';

class HomePageBody extends Component {

    state = {
        data: [],
        showOrganizationList:false,
        showSubjectList:false,
    }

    render() {
        if (this.state.data.length == 0 && this.props.tab!="SUMMATIVES") {
            return (
                <div style={{marginTop:"30%"}}>
                    <Typography variant='overline' display='block' style={{color:"#747d8c", textAlign:"center"}} gutterBottom>No entries found for <strong>{this.props.type}</strong>. Be the first to add one!</Typography>
                </div>
            );
        } else {
            return (
                <div>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-start", flex:1}}>
                            <IconButton onClick={() => this.setState({showOrganizationList: !this.state.showOrganizationList})}>
                                <LocationCity/>
                            </IconButton>
                            <IconButton onClick={() => this.setState({showSubjectList: !this.state.showSubjectList})}>
                                <LocalLibrary/>
                            </IconButton>
                            <Drawer open={this.state.showOrganizationList} anchor='bottom' onClose={()=>this.setState({showOrganizationList: false})}>
                                <OrganizationSelectorList/>
                            </Drawer>
                            <Drawer open={this.state.showSubjectList} anchor='bottom' onClose={()=>this.setState({showSubjectList:false})}>
                                <SubjectSelectorList/>
                            </Drawer>
                        </div>
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-end", flex:1}}>
                            <IconButton>
                                <Sort/>
                            </IconButton>
                            <IconButton>
                                <ViewList/>
                            </IconButton>
                            <IconButton>
                                <ViewModule/>
                            </IconButton>
                        </div>
                    </div>
                    <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center"}}>
                        <SummativeCard />
                        <SummativeCard />
                        <SummativeCard />
                        <SummativeCard />
                        <SummativeCard />
                        <SummativeCard />
                        <SummativeCard />
                        <SummativeCard />
                        <SummativeCard />
                        <SummativeCard />
                        <SummativeCard />
                        <SummativeCard />
                        <SummativeCard />
                        <SummativeCard />
                    </div>
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