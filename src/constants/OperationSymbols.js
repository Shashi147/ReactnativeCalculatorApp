"use strict";

import {
  OPERATION_ADD,
  OPERATION_SUBTRACT,
  OPERATION_DIVIDE,
  OPERATION_MULTIPLY
} from "../actions/actionTypes";

const OperationSymbols = {
  [OPERATION_ADD]: "+",
  [OPERATION_SUBTRACT]: "-",
  [OPERATION_DIVIDE]: "/",
  [OPERATION_MULTIPLY]: "X"
};

export default OperationSymbols;
