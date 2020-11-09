import axios from "axios";
import {
  DATA_LOAD_FAILED,
  DATA_LOAD_SUCCESS,
  DATA_LOAD_INITIATED,
  CLEAR_ITEMS_LIST, MED_SEARCH_ITEMS_SUCCESS, MED_SEARCH_ITEMS_INIT, MED_SEARCH_ITEMS_FAILURE,
} from "./types";

export const clearItemsList = () => async (dispatch, getState) => {
  //console.log(getState().data)
  dispatch({
    type: CLEAR_ITEMS_LIST,
  });
};


export const search = (item) => (dispatch) => {//searchby,
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
    // searchby,
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

export const searchTests = (item)=> async (dispatch, getState)=>{
  dispatch({
    type: MED_SEARCH_ITEMS_INIT,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = {
    // searchby,
    keyword: item,
  };

  axios
      .post("https://api.emetroplus.com/medicaltest/search", body, config)
      .then((res) => {
        console.log(res);
        if (res.data.ok) {
          dispatch({
            type: DATA_LOAD_SUCCESS,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: MED_SEARCH_ITEMS_SUCCESS,
            error: "DATA_LOAD_FAILED",
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
        dispatch({
          type: MED_SEARCH_ITEMS_FAILURE,
          error: "DATA_LOAD_FAILED",
        });
      });
}

