import React, { Component } from 'react';
import { IconButton, Drawer, Tooltip } from '@material-ui/core';
import { ViewList, ViewModule, Sort, LocationCity, LocalLibrary } from '@material-ui/icons';
import OrganizationSelectorList from '../OrganizationSelectorList/OrganizationSelectorList';
import SubjectSelectorList from '../ProgramSelectorList/ProgramSelectorList';

export default class HomePageToolBar extends Component {

    state = {
        data: [],
        showOrganizationList:false,
        showSubjectList:false,
    }

    closeSelectorLists = () => {
        this.setState({
            showOrganizationList:false,
            showSubjectList:false,
        })
    }
    
    render () {
        return (
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-start", flex:1}}>
                    <Tooltip title="Select University">
                        <IconButton onClick={() => this.setState({showOrganizationList: !this.state.showOrganizationList})}>
                            <LocationCity/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Select Program">
                        <IconButton onClick={() => this.setState({showSubjectList: !this.state.showSubjectList})}>
                            <LocalLibrary/>
                        </IconButton>
                    </Tooltip>
                    <Drawer open={this.state.showOrganizationList} anchor='bottom' onClose={()=>this.setState({showOrganizationList: false})}>
                        <OrganizationSelectorList closeSelectorLists={this.closeSelectorLists}/>
                    </Drawer>
                    <Drawer open={this.state.showSubjectList} anchor='bottom' onClose={()=>this.setState({showSubjectList:false})}>
                        <SubjectSelectorList closeSelectorLists={this.closeSelectorLists}/>
                    </Drawer>
                </div>
            </div>
        );
    }
}