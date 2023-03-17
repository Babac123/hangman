import { createStore } from "redux";
import AppReducer from "./reducers/appReducer";

const store = createStore(AppReducer);

export default store;
