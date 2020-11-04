import {FETCH_ORDERS_FAILED, FETCH_ORDERS_INIT, FETCH_ORDERS_SUCCESS} from '../actions/types';

let initialState = {
    isOrdersLoading: false,
    isOrdersLoaded: false,
    orders: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDERS_INIT:
            return {
                isOrdersLoading: true,
            }
        case FETCH_ORDERS_FAILED:
            return {
                isOrdersLoading: false,
                isOrdersLoaded: true,
                error: action.error,
            }
        case FETCH_ORDERS_SUCCESS:
            return {
                isOrdersLoading: false,
                isOrdersLoaded: true,
                orders: action.payload,
            }
        default:
            return state;
    }
}