import { FETCH_TESTS,  FETCH_SUPER60_TEST } from "./types";

import axios from "axios";

export const fetchPopularTests = () => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = {
    testType: ["super60"],
    limit: 10,
    skip: 0,
  };

  axios
    .post("https://api.emetroplus.com/medicaltest/getall", body, config)
    .then((res) => {
      console.log(res);
      dispatch({
        type: FETCH_TESTS,
        payload: res.data.test_details,
      });
    });
};

// export const fetchAllTests = (skip, limit) => (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   // Request Body
//   const body = {
//     testType: ["normal", "advanced", "super60"],
//     limit: limit,
//     skip: skip,
//   };

//   axios
//     .post("https://api.emetroplus.com/medicaltest/getall", body, config)
//     .then((res) => {
//       console.log(res);
//       dispatch({
//         type: FETCH_ALL_TESTS,
//         payload: res.data.test_details,
//       });
//     });
// };

export const getSuper60 = () => (dispatch) => {
  let skip = 0;

  // let mrp = 0;

  for (var index = 0; index < 3; index++) {
    console.log("getSuper60");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("Super60");

    console.log(skip);
    // Request Body
    const body = {
      testType: ["super60"],
      skip: skip,
      limit: 20,
    };

    skip = skip + 20;
    axios
      .post("https://api.emetroplus.com/medicaltest/getall", body, config)
      .then((res) => {
        console.log(res);
        res.data.test_details.forEach((el) => {
          console.log(el.MRP);
          // mrp = mrp + parseInt(el.MRP);
          // console.log(mrp);
          dispatch({
            type: FETCH_SUPER60_TEST,
            payload: el,
          });
        });
      });

  }


};
