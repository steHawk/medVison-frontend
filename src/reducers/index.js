import { combineReducers } from "redux";
import tests from './tests'
import items from "./items";


export default  combineReducers({
    tests: tests,
    items
})