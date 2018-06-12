"use strict";

import {
  NUMBER_INPUT,
  NUMBER_SIGNED_INPUT,
  DECIMAL_INPUT,
  OPERATION_INPUT,
  CLEAR,
  CALCULATE
} from "../actions/actionTypes";
import { CalculatorHistory } from "../helper";

const initialState = {
  offset: null,
  operation: "MULTIPLY",
  currentInput: [],
  history: []
};

export default function calculationReducer(state = initialState, action) {
  var currentInput = state.currentInput.slice();
  var history = state.history.slice();
  switch (action.type) {
    case NUMBER_INPUT:
      currentInput.push(action.value);
      return {
        ...state,
        currentInput
      };
    case NUMBER_SIGNED_INPUT:
      if (currentInput[0] === "-") {
        currentInput.splice(0, 1);
      } else {
        currentInput.unshift("-");
      }
      return {
        ...state,
        currentInput
      };
    case DECIMAL_INPUT:
      // only allow one decimal
      if (state.currentInput.indexOf(".") > -1) {
        return state;
      }
      currentInput.push(".");
      return {
        ...state,
        currentInput
      };
    case OPERATION_INPUT:
      // assign the current operation
      if (history.length === 0 && currentInput.length > 0) {
        history.push({
          input: parseFloat(currentInput.join("")),
          operation: action.operation
        });
        currentInput = [];
        return {
          ...state,
          operation: action.operation,
          currentInput,
          history
        };
      }
      return {
        ...state,
        operation: action.operation
      };
    case CALCULATE:
      if (currentInput.length === 0) {
        // @TODO - apply the operation to the last item in the history to repeat the calculation
        return state;
      }
      history.push({
        input: parseFloat(currentInput.join("")),
        operation: state.operation
      });
      currentInput = [];
      return {
        ...state,
        history,
        currentInput
      };
    case CLEAR:
      var lastInput = (history.length = 0);
      currentInput = [];
      return {
        ...state,
        currentInput,
        history
      };
    default:
      return state;
  }
}
