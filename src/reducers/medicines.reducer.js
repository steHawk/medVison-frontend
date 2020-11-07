import {FETCH_MED, GET_MED} from "../Context/types";

let initialState = {
    medicines: [],
    isMedicinesLoaded: false,
    isMedicinesLoading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_MED:
            return {
                ...state,
                medicines: action.payload,
                isMedicinesLoaded: true,
                isMedicinesLoading: false
            };
        case FETCH_MED:
            return {
                ...state,
                isMedicinesLoaded: false,
                isMedicinesLoading: true,
            };
        default:
            return state;
    }
}