import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import fetchErrorChecker from '../ErrorHandler/fetchErrorChecker';
import getTags from './getTags';

export default class NotesForm extends Component {

    TITLE_CHARACTER_LIMIT = 50;
    DESCRIPTION_CHARACTER_LIMIT = 150;

    state = {
        inputTitle:'',
        inputDescription:'',
        inputUrl:'https://',
        tags: [],
        selectedTag: "NO_TAG",
    }

    componentDidMount() {
        getTags((data) => {
            this.setState({
                tags: data
            })
        })
    }

    handleTagChange = (event) => {
        this.setState({
            selectedTag: event.target.value
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

    uploadNotes = () => {
        let data = {
            title: this.state.inputTitle,
            description: this.state.inputDescription,
            url: this.state.inputUrl,
            year: this.props.year,
            net_upvotes: 0,
            university:this.props.organizationId,
            program:this.props.programId
        }
        if (this.state.selectedTag != "NO_TAG") {
            data["tag"] = this.state.selectedTag;
        }
        fetch(`/api/supplementary_applications/${this.props.organizationId}/`, {
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

                <TextField select label='Tag' value={this.state.selectedTag} 
                    SelectProps={{
                        native:true
                    }}
                    onChange={this.handleTagChange}
                    variant='outlined'
                    margin='dense'
                    style={{flex:1}}
                    required>
                        <option key={"NO_TAG"} value={"NO_TAG"}>
                            No Tag
                        </option>
                        {
                            this.state.tags.map(tag => (
                                <option key={tag.value} value={tag.value}>
                                    {tag.label}
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

                <TextField 
                    label='Description' 
                    variant='outlined' 
                    multiline={true} 
                    rows={5} 
                    margin='dense' 
                    onChange={this.descriptionValidator}
                    value={this.state.inputDescription}
                    helperText={this.DESCRIPTION_CHARACTER_LIMIT - this.state.inputDescription.length + ' characters remaining'}
                />

                <Button variant='contained' color='primary' style={{marginTop:10}} onClick={this.uploadNotes}>Submit</Button>
            </div>
        );
    }
}