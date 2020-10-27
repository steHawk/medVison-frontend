import axios from "axios";
import {
  DATA_LOAD_FAILED,
  DATA_LOAD_SUCCESS,
  DATA_LOAD_INITIATED,
  CLEAR_ITEMS_LIST,
} from "./types";

export const clearItemsList = () => async (dispatch, getState) => {
  //console.log(getState().data)
  dispatch({
    type: CLEAR_ITEMS_LIST,
  });
};


export const search = (searchby, item) => (dispatch) => {
  dispatch({
    type: DATA_LOAD_INITIATED,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = {
    searchby,
    keyword: item,
  };

  axios
    .post("https://api.emetroplus.com/drug/search", body, config)
    .then((res) => {
      console.log(res);
      if (res.data.ok) {
        dispatch({
          type: DATA_LOAD_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: DATA_LOAD_FAILED,
          error: "DATA_LOAD_FAILED",
        });
      }
    })
    .catch((err) => {
      console.log("err", err);
      dispatch({
        type: DATA_LOAD_FAILED,
        error: "DATA_LOAD_FAILED",
      });
    });
};
