import axios from "axios";

import { MEDICINE_BY_TYPES} from "./types";


//  FETCH ALL MEDICINE BY TYPE

export const fetchMedicineByType = (limit, skip) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
   
  // Request Body
  const body = {
    "limit": limit,
    "skip": skip
  };

  axios
    .post(
      "https://api.emetroplus.com/drug/data",
      body,
      config
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: MEDICINE_BY_TYPES,
        payload: res.data.data,
      });
    });
};
