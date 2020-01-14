import store from "../../store";

export default function fetchErrorChecker (response) {
    let responseData;
    if (!response.headers.get('content-type') || !response.headers.get('content-type').includes('application/json')) {
        responseData = response;
    } else {
        responseData = response.json();
    }
    if (response.status < 200 || response.status >= 300) {
        releaseErrorToStore(responseData);
        throw "Error";
    }
    return responseData;
}

function releaseErrorToStore (response) {
    response.then(responseData => {
        // console.log (JSON.stringify(responseData));
        store.dispatch({
            type: "GET_ERROR",
            payload: JSON.stringify(responseData),
        })
        return responseData;
    })
}