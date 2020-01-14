export default function errorReducer (state = {}, action) {
    switch (action.type) {
        case "GET_ERROR":
            return Object.assign ({}, state, {message: action.payload, read:false});
        case "READ_ERROR":
            return Object.assign({}, state, {read:true});
        case "DELETE_ERROR":
            return Object.assign ({}, state, {message:null, read:false});
        default:
            return state;
    }
}