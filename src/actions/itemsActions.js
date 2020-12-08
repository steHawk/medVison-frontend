import { FETCH_ITEMS, SEARCH_ITEMS, ITEM_DETAIL } from "./types";
import axios from "axios";
import baseURL from "../api/baseURL";
import instance from "../api/instance";


export const getItems = () => (dispatch) => {
  fetch(`${baseURL}api/tests`)
    .then((res) => res.json())
    .then((items) =>
      dispatch({
        type: FETCH_ITEMS,
        payload: items,
      })
    );   
};


export const getItem = (item_id) => (dispatch) => {

  let reqUrl = `${baseURL}drug/`;
  let data = { 'drug_id': item_id };
  fetch(reqUrl, {
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
   // Request Body
  const body = {
    "keyword": searchKey 
  };
instance.post('drug/search', body)
    .then((res) => {
      console.log(res);
      dispatch({
        type: SEARCH_ITEMS,
        payload: res.drug_details,
      })
      
    });
};

