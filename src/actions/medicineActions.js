import axios from "axios";

import { MEDICINE_BY_TYPES} from "./types";


//  FETCH ALL MEDICINE BY TYPE

export const fetchMedicineByType = (drugType) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = {
    drugType,
  };

  axios
    .post(
      "http://medlifeapi-env.eba-3pdzjp57.us-east-2.elasticbeanstalk.com/drug/type",
      body,
      config
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: MEDICINE_BY_TYPES,
        payload: res.data.drugs,
      });
    });
};
