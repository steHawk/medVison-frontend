import { combineReducers } from "redux";
import tests from "./tests";
import items from "./items";
import auth from "./auth";
import errors from "./errors";
import messages from "./messages";
import cart from "./cart";
import doctors from "./doctors";
import searchItems from "./searchItems";
import itemDetail from "./itemDetail";
import dataReducer from "./data.reducer"
import orders from './orders.reducer';
import medicines from './medicines.reducer';


export default combineReducers({
  tests: tests,
  items,
  auth,
  errors,
  messages,
  cart,
  doctors,
  searchItems,
  itemDetail,
  data: dataReducer,
  orders,
  medicines,
});
