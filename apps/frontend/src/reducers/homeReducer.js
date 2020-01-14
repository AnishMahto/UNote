export default function homeReducer (state = {}, action) {
    switch (action.type) {
        case "DISPLAY_TAB":
            return Object.assign({}, state, {tab: action.payload});
        case "EXPAND_CARD":
            return Object.assign({}, state, {expandedCard: action.payload});
        default:
            return state;
    }
}