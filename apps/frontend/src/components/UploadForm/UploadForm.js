import React, { Component } from 'react';
import { DialogTitle, TextField } from '@material-ui/core';

export default class UploadForm extends Component {

    TITLE_CHARACTER_LIMIT = 50;
    DESCRIPTION_CHARACTER_LIMIT = 150;

    state = {
        yearChoices: [{value: "2018/2019", label: "2018/2019"}, {value: "2019/2020", label: "2019/2020"}],
        selectedYear: {value: "2018/2019", label: "2018/2019"},
        inputTitle:'',
        inputDescription:'',
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

    render() {
        return (
                <div style={{padding:10}}>
                    <DialogTitle>Upload</DialogTitle>
                    <form autoComplete="off" style={{display:"flex", flexDirection:"column"}}>
                        <TextField 
                            label='Title' 
                            variant='outlined' 
                            margin='dense' 
                            onChange={this.titleValidator}
                            value={this.state.inputTitle}
                            helperText={this.TITLE_CHARACTER_LIMIT - this.state.inputTitle.length + ' characters remaining'}
                            required/>
                        <TextField label='Link' variant='outlined' margin='dense' required/>
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
                        <div style={{display:"flex"}}>
                            <TextField select label='Year' value={this.state.selectedYear.label} 
                            SelectProps={{
                                native:true
                            }}
                            variant='outlined'
                            helperText='Select school year this content was originally created for'
                            margin='dense'
                            style={{flex:1}}
                            required>
                                {
                                    this.state.yearChoices.map(year => (
                                        <option key={year.value} value={year.value}>
                                            {year.label}
                                        </option>
                                    ))
                                }
                            </TextField>
                            <TextField select label='IB Level' value={7} 
                            SelectProps={{
                                native:true
                            }}
                            variant='outlined'
                            helperText='Select IB level grade for this summative'
                            margin='dense'
                            style={{flex:1, marginLeft:10}}
                            required>
                                {
                                    [1,2,3,4,5,6,7].map(grade => (
                                        <option key={grade} value={grade}>
                                            {grade}
                                        </option>
                                    ))
                                }
                            </TextField>
                        </div>
                    </form>
                </div>
        );
    }
}