import React, { Component } from 'react';
import { TextField, Typography, Button, Paper, Tabs, Tab } from '@material-ui/core';
import fetchErrorChecker from '../ErrorHandler/fetchErrorChecker';
import getOrganizations from '../OrganizationSelectorList/getOrganizations';
import getPrograms from '../ProgramSelectorList/getPrograms';
import { connect } from 'react-redux';
import ResourceForm from './ResourceForm'
import NotesForm from './NotesForm';


const SUPPLEMENTARY_APPLICATION = "Supplementary Application";
const INTERVIEW_QUESTION = "Interview Question";
const INTERVIEW_QUESTION_ANSWER = "Interview Question Answer";
const SCHOLARSHIP_APPLICATION = "Scholarship Application";
const RESOURCE = "Resource";

class UploadForm extends Component {

    state = {
        yearChoices: [{value: "2018", label: "2018/2019"}, {value: "2019", label: "2019/2020"}],
        selectedYear: {value: "2018", label: "2018/2019"},
        contentTypeChoices: [SUPPLEMENTARY_APPLICATION, INTERVIEW_QUESTION, INTERVIEW_QUESTION_ANSWER, SCHOLARSHIP_APPLICATION, RESOURCE],
        selectedContentType: SUPPLEMENTARY_APPLICATION,
        organizations: [],
        selectedOrganization: 1,
        programs: [],
        selectedProgram: 1,
        tab: SUPPLEMENTARY_APPLICATION,
    }

    componentDidMount() {
        getOrganizations ((data) => {
            this.setState({
                organizations: data,
                selectedOrganization: data[0].id
            })
        })
        getPrograms ((data) => {
            this.setState({
                programs: data,
                selectedProgram: data[0].id
            })
        })
        let yearChoices = [];
        for (let x = 2007; x <= (new Date()).getFullYear()+1; x++) {
            yearChoices.push({
                value:x,
                label:`${x}/${x+1}`
            })
        }
        this.setState({
            yearChoices: yearChoices,
            selectedYear: {
                value: (new Date()).getFullYear(),
                label: `${(new Date()).getFullYear()}/${(new Date()).getFullYear()+1}`
            }
        })
    }

    handleYearChange = (event) => {
        this.setState ({
            selectedYear: {
                value: event.target.value,
                label: event.target.value + "/" + (parseInt(event.target.value)+1)
            }
        });
    }

    handleContentTypeChange = (event) => {
        this.setState ({
            selectedContentType: event.target.value
        });
    }

    handleOrganizationChange = (event) => {
        this.setState ({
            selectedOrganization: event.target.value
        })
    }

    handleProgramChange = (event) => {
        this.setState ({
            selectedProgram: event.target.value
        })
        console.log (this.state.selectedProgram);
    }

    handleTabChange = (event, value) => {
        this.setState({
            tab: value
        })
    }

    isMobile = () => {
        return window.innerWidth <= 400;
    }

    render() {
        return (
                <div style={this.isMobile() ? {}:{display:"flex", flexDirection:"row"}}>

                    <Paper style={{flex:1, display:"flex", justifyContent:"center", alignItems:"center"}} square>
                        <Tabs 
                            orientation={this.isMobile() ? 'horizontal':'vertical'} 
                            variant='scrollable' 
                            scrollButtons='auto' 
                            value={this.state.tab} 
                            indicatorColor='primary' 
                            textColor='primary'
                            onChange={this.handleTabChange}
                            >
                            <Tab label="Notes" value={SUPPLEMENTARY_APPLICATION}/>
                            <Tab label="Resource" value={RESOURCE}/>
                        </Tabs>
                    </Paper>

                    {/* <Typography variant='h3' style={{fontSize:20, paddingBottom:20, paddingTop:10, fontSize:25}} align='center'>UPLOAD CONTENT</Typography> */}

                    <form autoComplete="off" style={{display:"flex", flexDirection:"column", marginTop:8, flex:6, padding:20}}>

                        <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>

                            <TextField select label='School Year' value={this.state.selectedYear.value} 
                            SelectProps={{
                                native:true
                            }}
                            onChange={this.handleYearChange}
                            variant='outlined'
                            margin='dense'
                            style={{flex:1}}
                            placeholder={this.state.selectedYear.label}
                            required>
                                {
                                    this.state.yearChoices.map(year => (
                                        <option key={year.value} value={year.value}>
                                            {year.label}
                                        </option>
                                    ))
                                }
                            </TextField>
                        </div>

                        <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>

                            <TextField select label='University' value={this.state.selectedOrganization} 
                            SelectProps={{
                                native:true
                            }}
                            onChange={this.handleOrganizationChange}
                            variant='outlined'
                            margin='dense'
                            style={{flex:1}}
                            required>
                                {
                                    this.state.organizations.map(organization => (
                                        <option key={organization.id} value={organization.id}>
                                            {organization.name}
                                        </option>
                                    ))
                                }
                            </TextField>

                            <TextField select label='Program' value={this.state.selectedProgram} 
                            SelectProps={{
                                native:true
                            }}
                            onChange={this.handleProgramChange}
                            variant='outlined'
                            margin='dense'
                            style={{flex:1, marginLeft:10}}
                            required>
                                {
                                    this.state.programs.map(program => (
                                        <option key={program.id} value={program.id}>
                                            {program.name}
                                        </option>
                                    ))
                                }
                            </TextField>
                        </div>

                        {this.state.tab === SUPPLEMENTARY_APPLICATION ? 
                            <NotesForm 
                                year={this.state.selectedYear.value} 
                                auth={this.props.auth} 
                                closeDialogCallback={this.props.closeDialogCallback}
                                organizationId={this.state.selectedOrganization}
                                programId={this.state.selectedProgram}
                            />:null}
                        {this.state.tab === RESOURCE ? 
                            <ResourceForm 
                                year={this.state.selectedYear.value} 
                                auth={this.props.auth} 
                                closeDialogCallback={this.props.closeDialogCallback}
                                organizationId={this.state.selectedOrganization}
                                programId={this.state.selectedProgram}
                            />:null}
                    </form>
                </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        auth: store.auth,
    }
}

export default connect(mapStateToProps)(UploadForm)