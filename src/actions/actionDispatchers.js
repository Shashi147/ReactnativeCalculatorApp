"use strict";

import {
  NUMBER_INPUT,
  NUMBER_SIGNED_INPUT,
  DECIMAL_INPUT,
  OPERATION_INPUT,
  CLEAR,
  CALCULATE
} from "./actionTypes";

export function inputNumber(value) {
  return {
    type: NUMBER_INPUT,
    value
  };
}

export function inputSigned() {
  return {
    type: NUMBER_SIGNED_INPUT
  };
}

export function inputDecimal() {
  return {
    type: DECIMAL_INPUT
  };
}

export function performOperation(operation) {
  return {
    type: OPERATION_INPUT,
    operation
  };
}

export function clear() {
  return {
    type: CLEAR
  };
}

export function calculate() {
  return {
    type: CALCULATE
  };
}
