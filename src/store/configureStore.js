"use strict";

import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import reducers from "../reducers";

//configuring store for Redux
export default function configureStore() {
  const store = createStore(reducers, applyMiddleware(logger));
  return store;
}
