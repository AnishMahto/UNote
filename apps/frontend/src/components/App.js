import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import store from "../store";
import theme from '../themes';
import Page from './Page';

class App extends Component {
    render() {
        return (
            <AlertProvider template = {AlertTemplate}>
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        <Page/>
                    </ThemeProvider>
                </Provider>
            </AlertProvider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));