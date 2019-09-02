export default function homeReducer (state = {}, action) {
    switch (action.type) {
        case "DISPLAY_TAB":
            return Object.assign({}, state, {tab: action.payload});
        default:
            return state;
    }
}