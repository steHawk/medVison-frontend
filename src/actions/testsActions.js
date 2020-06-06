import { FETCH_TESTS, FETCH_ALL_TESTS } from "./types";

export const fetchPopularTests = () => (dispatch) => {
  console.log("fetching...");
  fetch(
    "https://api.emetroplus.com/medicaltest/popular"
  )
    .then((res) => res.json())
    .then((tests) =>
      dispatch({
        type: FETCH_TESTS,
        payload: tests.test_details,
      })
    );
};

export const fetchAllTests = () => (dispatch) => {
  console.log("fetching...");
  fetch(
    "https://api.emetroplus.com/medicaltest/getall?testType=normal"
  )
    .then((res) => res.json())
    .then((tests) =>
      dispatch({
        type: FETCH_ALL_TESTS,
        payload: tests.test_details,
      })
    );
};
