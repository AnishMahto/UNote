// create seperate file for the api call, so that other components can also use it
import fetchErrorChecker from '../ErrorHandler/fetchErrorChecker';
import store from '../../store';

export default function getResourceTypes (callback) {
    const curStoreState = store.getState();
    if (sessionStorage.getItem("RESOURCE_TYPES_DATA")) {
        callback(JSON.parse(sessionStorage.getItem("RESOURCE_TYPES_DATA")));
    } else {
        fetch ('/api/resource_types', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${curStoreState.auth.token}`,
            }
        })
        .then (response => fetchErrorChecker(response))
        .then (responseData => {
            sessionStorage.setItem("RESOURCE_TYPES_DATA", JSON.stringify(responseData.data))
            callback(responseData.data)
        })
        .catch (err => console.log (err));
    }
}