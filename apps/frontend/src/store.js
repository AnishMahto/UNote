import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const initialState = {
    auth: {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        isLoading: false,
        user:null,
    },
    navigationDrawer: {
        open:false,
    },
    home: {
        tab: "SUMMATIVES",
        expandedCard:null,
    },
    organization: null,
    subject: null,
    page: "HOME",
    error: {
        message: null,
        read: false,
    },
};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;