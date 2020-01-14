// create seperate file for the api call, so that other components can also use it
import fetchErrorChecker from '../ErrorHandler/fetchErrorChecker';
import store from '../../store';

export default function getOrganizations (callback) {
    const curStoreState = store.getState();
    if (sessionStorage.getItem("TAGS_DATA")) {
        callback(JSON.parse(sessionStorage.getItem("TAGS_DATA")));
    } else {
        fetch ('/api/get_tags', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${curStoreState.auth.token}`,
            }
        })
        .then (response => fetchErrorChecker(response))
        .then (responseData => {
            sessionStorage.setItem("TAGS_DATA", JSON.stringify(responseData.data))
            callback(responseData.data)
        })
        .catch (err => console.log (err));
    }
}