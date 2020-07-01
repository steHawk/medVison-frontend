import { combineReducers } from "redux";
import tests from "./tests";
import items from "./items";
import auth from "./auth";
import errors from "./errors";
import messages from "./messages";
import cart from "./cart";
import doctors from "./doctors";
import medicine from "./medicine";
import searchItems from "./searchItems";
import itemDetail from "./itemDetail";

export default combineReducers({
  tests: tests,
  items,
  auth,
  errors,
  messages,
  cart,
  doctors,
  medicine,
  searchItems,
  itemDetail
});
