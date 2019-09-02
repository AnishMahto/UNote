export default function organizationSelectorReducer(state = null, action) {
    // console.log (action.payload);
    switch (action.type) {
        case "SELECT_SUBJECT":
            return action.payload;
        default:
            return state;
    }
}