
import React, { Component } from 'react';
import { TextField, Button, Input } from '@material-ui/core';
import fetchErrorChecker from '../ErrorHandler/fetchErrorChecker';
import getResourceTypes from './getResourceTypes';

export default class ResourceForm extends Component {
    TITLE_CHARACTER_LIMIT = 50;
    DESCRIPTION_CHARACTER_LIMIT = 150;

    state = {
        inputTitle:'',
        inputDescription:'',
        inputUrl:'https://',
        resourceTypeChoices: [],
        selectedResourceType: {"value": "articles_written_resources", "label": "Articles/Written Resources"}
    }

    componentDidMount() {
        getResourceTypes((data) => {
            data.map(resourceType => {
                resourceType["value"] = resourceType["id"]
            })
            this.setState({
                resourceTypeChoices: data,
                selectedResourceType: data[0]
            })
        })
    }

    titleValidator = (event) => {
        if (event.target.value.length <= this.TITLE_CHARACTER_LIMIT) {
            this.setState({inputTitle: event.target.value});
        }
    }

    descriptionValidator = (event) => {
        if (event.target.value.length <= this.DESCRIPTION_CHARACTER_LIMIT) {
            this.setState({inputDescription: event.target.value});
        }
    }

    handleURLChange = (event) => {
        this.setState ({
            inputUrl: event.target.value,
        })
    }

    handleResourceTypeChange = (event) => {
        this.setState ({
            selectedResourceType: {
                value: event.target.value,
            }
        });
    }

    uploadResourceItem = () => {
        let data = {
            title: this.state.inputTitle,
            url: this.state.inputUrl,
            year: this.props.year,
            university:this.props.organizationId,
            program:this.props.programId,
            resource_type: this.state.selectedResourceType.value
        }
        fetch(`/api/resource_items/`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.auth.token}`,
            },
            body: JSON.stringify(data),
        })
        .then(response => fetchErrorChecker(response))
        .then(responseData => {
            this.props.closeDialogCallback();
        })
        .catch(err => console.log (err));
    }

    render() {
        return (
            <div style={{display:"flex", flexDirection:"column"}}>

                <TextField select label='Resource Type' value={this.state.selectedResourceType.value} 
                    SelectProps={{
                        native:true
                    }}
                    onChange={this.handleResourceTypeChange}
                    variant='outlined'
                    margin='dense'
                    style={{flex:1}}
                    placeholder={this.state.selectedResourceType.label}
                    required>
                        {
                            this.state.resourceTypeChoices.map(resourceType => (
                                <option key={resourceType.value} value={resourceType.value}>
                                    {resourceType.label}
                                </option>
                            ))
                        }
                </TextField>

                <TextField 
                    label='Title' 
                    variant='outlined' 
                    margin='dense' 
                    onChange={this.titleValidator}
                    value={this.state.inputTitle}
                    helperText={this.TITLE_CHARACTER_LIMIT - this.state.inputTitle.length + ' characters remaining'}
                    required/>

                <TextField label='URL' variant='outlined' margin='dense' onChange={this.handleURLChange} value={this.state.inputUrl} required/>

                <Button variant='contained' color='primary' style={{marginTop:10}} onClick={this.uploadResourceItem}>Submit</Button>
            </div>
        );
    }
}