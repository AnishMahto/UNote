import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const initialState = {
    navigationDrawer: {
        open:false,
    },
    home: {
        tab: "SUMMATIVES",
    },
    organization: null,
    subject: null,
    page: "HOME",
};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;