import React, {useReducer} from 'react';
import ApiContext from './ApiContext';
import ApiReducer from './ApiReducer';
import {GET_MED,} from './types';
import instance from "../api/instance";

const ApiState = props => {
    const initialState = {
        current: [],
    };

    const [state, dispatch] = useReducer(ApiReducer, initialState);

    // Get Contacts
    const getmed = async (category, postsPerPage, currentPage) => {
        const process = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        // let skip = postsPerPage*currentPage;
        // let limit = postsPerPage;
        const value = {
            category,
        };
        try {
            const res = await instance.post('drug/data/?skip=' + postsPerPage + '&limit=' + currentPage, value)
            console.log("---->", res.data);
            dispatch({
                type: GET_MED,
                payload: res.data.data,
            });
        } catch (err) {
            console.log(err)

        }
    };
    return (
        <ApiContext.Provider
            value={{
                current: state.current,
                getmed
            }}
        >
            {props.children}
        </ApiContext.Provider>
    );
};

export default ApiState;