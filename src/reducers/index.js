import { combineReducers } from "redux";
import tests from "./tests";
import items from "./items";
import auth from "./auth";
import errors from "./errors";
import messages from "./messages";

export default combineReducers({
  tests: tests,
  items,
  auth,
  errors,
  messages
});
