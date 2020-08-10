import {
    FETCH_ALL_TEST
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case FETCH_ALL_TEST:
            return {
                ...state,
                alltest: action.payload,
            };
        default:
            return state;
    }
};