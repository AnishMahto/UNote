export default function navigationReducer (state=[], action) {
    switch (action.type) {
        case "OPEN_DRAWER":
            return Object.assign({}, state, {open: true});
        case "CLOSE_DRAWER":
                return Object.assign({}, state, {open: false});
        default:
            return state;
    }
}