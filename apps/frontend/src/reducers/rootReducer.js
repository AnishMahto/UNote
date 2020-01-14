import { combineReducers } from 'redux';
import summativeReducer from '../reducers/summativesReducer';
import authReducer from './authReducer';
import navigationReducer from './navigationReducer';
import homeReducer from './homeReducer';
import organizationSelectorReducer from './organizationSelectorReducer';
import subjectSelectorReducer from './subjectSelectorReducer';
import pageReducer from './pageReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    navigationDrawer: navigationReducer,
    home: homeReducer,
    organization: organizationSelectorReducer,
    subject: subjectSelectorReducer,
    page: pageReducer,
    error: errorReducer,
});

export default rootReducer;