import { SummativeTypes } from '../actions/actionTypes';

export default function (previousState = [], action) {
    switch (action.type) {
        case SummativeTypes.GET_SUMMATIVES: 
            return "all summatives";
        default:
            return previousState;
    }
}