import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { userReducer } from "./Reducer";

const store = createStore(userReducer,applyMiddleware(logger))

export default store