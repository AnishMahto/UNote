import React, { Component } from 'react';
import { Snackbar } from '@material-ui/core';
import { connect } from 'react-redux';
import store from '../../store';
import { useAlert } from 'react-alert';

class ErrorHandler extends Component {

    state = {
        displayMessage:true,
    }

    messageDisplayTimeout;

    render () {
        let errorMessage = this.props.error.message;
        let read = this.props.error.read;
        if (errorMessage !== null && !read) {            

            clearTimeout(this.messageDisplayTimeout);

            this.messageDisplayTimeout = setTimeout (function () {
                store.dispatch({
                    type: "DELETE_ERROR",
                    payload:null,
                })
            }, 3000);

            store.dispatch ({
                type:"READ_ERROR",
                payload:true,
            })

            return (<Snackbar
                open={true}
                anchorOrigin={{
                    vertical:'bottom',
                    horizontal:'right',
                }}
                message={errorMessage}
                />);
        } else if (errorMessage !== null && read) {

            return (<Snackbar
                open={true}
                anchorOrigin={{
                    vertical:'bottom',
                    horizontal:'right',
                }}
                message={errorMessage}
                />);
        } else {
            return null;
        }
    }
}

const mapStateToProps = (store) => {
    return {
        error: store.error
    }
}

export default connect(mapStateToProps)(ErrorHandler);