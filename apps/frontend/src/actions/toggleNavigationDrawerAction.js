import store from '../store';

export default function toggleNavigationDrawerAction(open=false) {
    let type = "CLOSE_DRAWER";
    if (open) {
        type ="OPEN_DRAWER";
    }
    let action = {
        type,
    }
    store.dispatch(action);
}