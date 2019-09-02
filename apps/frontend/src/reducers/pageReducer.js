export default function pageReducer (state = "HOME", action) {
    switch (action.type) {
        case "CHANGE_PAGE":
            return action.payload;
        default:
            return state;
    }
}