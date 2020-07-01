import { FETCH_ITEMS, SEARCH_ITEMS, ITEM_DETAIL } from "./types";
import axios from "axios";


export const getItems = () => (dispatch) => {
  fetch("https://5e9fd95611b078001679ce9a.mockapi.io/api/tests")
    .then((res) => res.json())
    .then((items) =>
      dispatch({
        type: FETCH_ITEMS,
        payload: items,
      })
    );   
};


export const getItem = (item_id) => (dispatch) => {

  let requrl = 'https://api.emetroplus.com/drug/';
  let data = { 'drug_id': item_id };
  fetch(requrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  })
      .then(response =>
          response.json()
      )
      .then(data => {
          //console.log(data);
          if (data.ok && data) {
              console.log(data)  
              dispatch({
                type: ITEM_DETAIL,
                payload: data.drug_details,
              }) 
          }
      })
};


export const itemSearch = (searchKey) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = {
    "keyword": searchKey 
  };

  axios
    .post(
      "https://api.emetroplus.com/drug/search",
      body,
      config
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: SEARCH_ITEMS,
        payload: res.drug_details,
      })
      
    });
};

