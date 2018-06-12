"use strict";

import React from "react";
import { Provider } from "react-redux";
import configureStore from "../store/configureStore";
import Calculator from "./Calculator";
const store = configureStore();
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Calculator />
      </Provider>
    );
  }
}
