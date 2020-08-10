import React, { useReducer } from 'react';
import axios from 'axios';
import TestContext from './TestContext';
import TestReducer from './TestReducer';
import {
    FETCH_ALL_TEST
} from '../types';

const TestState = props => {
    const initialState = {
        alltest: [],
    };

    const [state, dispatch] = useReducer(TestReducer, initialState);

    // Get Contacts
    const fetchalltest = async (skip, limit) => {
        const process = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const value = {
            testType: ["normal", "advanced", "super60"],
            limit: limit,
            skip: skip,
        };
        try {
            const res = await axios.post("https://api.emetroplus.com/medicaltest/getall", value, process)
            // console.log(res);
            dispatch({
                type: FETCH_ALL_TEST,
                payload: res.data.test_details,
            });
        } catch (err) {
            console.log(err)

        }
    };
    return (
        <TestContext.Provider
            value={{
                alltest: state.alltest,
                fetchalltest
            }}
        >
            {props.children}
        </TestContext.Provider>
    );
};

export default TestState;




// export const fetchAllTests = (skip, limit) => (dispatch) => {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     // Request Body
//     const body = {
//       testType: ["normal", "advanced", "super60"],
//       limit: limit,
//       skip: skip,
//     };

//     axios
//       .post("https://api.emetroplus.com/medicaltest/getall", body, config)
//       .then((res) => {
//         console.log(res);
//         dispatch({
//           type: FETCH_ALL_TESTS,
//           payload: res.data.test_details,
//         });
//       });
//   };