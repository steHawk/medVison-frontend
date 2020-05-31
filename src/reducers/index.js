import { combineReducers } from "redux";
import tests from "./tests";
import items from "./items";
import auth from "./auth";
import errors from "./errors";
import messages from "./messages";
import cart from "./cart";

export default combineReducers({
  tests: tests,
  items,
  auth,
  errors,
  messages,
  cart,
});
