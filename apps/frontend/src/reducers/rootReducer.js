import { combineReducers } from 'redux';
import summativeReducer from '../reducers/summativesReducer';
import navigationReducer from './navigationReducer';
import homeReducer from './homeReducer';
import organizationSelectorReducer from './organizationSelectorReducer';
import subjectSelectorReducer from './subjectSelectorReducer';
import pageReducer from './pageReducer';

const rootReducer = combineReducers({
    navigationDrawer: navigationReducer,
    home: homeReducer,
    organization: organizationSelectorReducer,
    subject: subjectSelectorReducer,
    page: pageReducer,
    // summativeReducer
});

export default rootReducer;