import {
    GET_MED,
} from './types';

export default (state, action) => {
    switch (action.type) {
        case GET_MED:
            return {
                ...state,
                current: action.payload,
            };
        default:
            return state;
    }
};