// create seperate file for the api call, so that other components can also use it
import fetchErrorChecker from '../ErrorHandler/fetchErrorChecker';
import store from '../../store';

export default function getPrograms (callback) {
    const curStoreState = store.getState();
    if (sessionStorage.getItem("PROGRAM_DATA")) {
        callback(JSON.parse(sessionStorage.getItem("PROGRAM_DATA")))
    } else {
        fetch ('/api/get_programs', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${curStoreState.auth.token}`,
            }
        })
        .then (response => fetchErrorChecker(response))
        .then (responseData => {
            responseData.data.sort((a, b) => a.name.localeCompare(b.name))
            sessionStorage.setItem("PROGRAM_DATA", JSON.stringify(responseData.data))
            callback(responseData.data);
        })
        .catch (err => console.log (err));
    }
}