"use strict";

import React from "react";
import {
  TouchableHighlight,
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Platform
} from "react-native";

import {
  OPERATION_ADD,
  OPERATION_SUBTRACT,
  OPERATION_DIVIDE,
  OPERATION_MULTIPLY
} from "../actions/actionTypes";

var Types = {
  NUMBER: "NUMBER",
  DECIMAL: "DECIMAL",
  SIGN: "SIGN"
};

/*input values */

var inputs = [
  { value: 1, type: Types.NUMBER },
  { value: 2, type: Types.NUMBER },
  { value: 3, type: Types.NUMBER },
  { value: 4, type: Types.NUMBER },
  { value: 5, type: Types.NUMBER },
  { value: 6, type: Types.NUMBER },
  { value: 7, type: Types.NUMBER },
  { value: 8, type: Types.NUMBER },
  { value: 9, type: Types.NUMBER },
  { value: "+/-", type: Types.SIGN },
  { value: 0, type: Types.NUMBER },
  { value: ".", type: Types.DECIMAL }
];

/*operations*/
var operations = [
  {
    value: "/",
    color: "#c77ccc",
    altColor: "#b16eb7",
    operation: OPERATION_DIVIDE
  },
  {
    value: "-",
    color: "#f8b055",
    altColor: "#dc9c4c",
    operation: OPERATION_SUBTRACT
  },
  {
    value: "+",
    color: "#f796d2",
    altColor: "#e088be",
    operation: OPERATION_ADD
  },
  {
    value: "x",
    color: "#6fcdf4",
    altColor: "#65badd",
    operation: OPERATION_MULTIPLY
  }
];

class InputComponent extends React.Component {
  render() {
    return (
      <View style={this.props.style}>
        {this.renderInputRows()}
        {this.renderOperationRow()}
        {this.renderActionRow()}
      </View>
    );
  }
  renderInputRows() {
    var { inputNumber, inputSigned, inputDecimal } = this.props;
    return inputs
      .reduce(
        (collection, input) => {
          if (collection[collection.length - 1].length === 3) {
            collection.push([]);
          }
          collection[collection.length - 1].push(input);
          return collection;
        },
        [[]]
      )
      .map((group, rowIndex) => {
        var columns = group.map((item, columnIndex) => {
          return (
            <View style={{ flex: 1 }}>
              {Platform == "android" ? (
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple()}
                  style={styles.input}
                  onPress={() => {
                    if (item.type === Types.NUMBER) {
                      inputNumber(item.value);
                    } else if (item.type === Types.DECIMAL) {
                      inputDecimal();
                    } else if (item.type === Types.SIGN) {
                      inputSigned();
                    }
                  }}
                >
                  <Text style={styles.inputText}>{item.value}</Text>
                </TouchableNativeFeedback>
              ) : (
                <TouchableHighlight
                  key={"inputRow_" + rowIndex + "_inputCol_" + columnIndex}
                  underlayColor="#ededed"
                  style={styles.input}
                  onPress={() => {
                    if (item.type === Types.NUMBER) {
                      inputNumber(item.value);
                    } else if (item.type === Types.DECIMAL) {
                      inputDecimal();
                    } else if (item.type === Types.SIGN) {
                      inputSigned();
                    }
                  }}
                >
                  <Text style={styles.inputText}>{item.value}</Text>
                </TouchableHighlight>
              )}
            </View>
          );
        });
        return (
          <View
            style={[styles.row, styles.inputRow]}
            key={"inputRow_" + rowIndex}
          >
            {columns}
          </View>
        );
      });
  }
  renderOperationRow() {
    var { performOperation } = this.props;
    var columns = operations.map((operation, index) => {
      return (
        <TouchableHighlight
          key={"operationRow" + index}
          style={[styles.operationInput, { backgroundColor: operation.color }]}
          underlayColor={operation.altColor}
          onPress={() => performOperation(operation.operation)}
        >
          <Text style={styles.operationInputText}>{operation.value}</Text>
        </TouchableHighlight>
      );
    });
    return <View style={[styles.row, styles.operationRow]}>{columns}</View>;
  }
  renderActionRow() {
    var { calculate, clear } = this.props;
    return (
      <View style={styles.btn}>
        <TouchableHighlight
          style={[styles.actionButton, styles.actionButtonUndo]}
          underlayColor="transparent"
          onPress={clear}
        >
          <Text style={[styles.txt, styles.actionButtonUndoText]}>
            CLEAR ALL
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.actionButton, styles.actionButtonEquals]}
          underlayColor="transparent"
          onPress={calculate}
        >
          <Text
            style={[styles.actionButtonText, styles.actionButtonEqualsText]}
          >
            =
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1
  },
  inputRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#ededed"
  },
  input: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#ededed"
  },
  text: {
    color: "#000",
    fontSize: 18
  },
  operationRow: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "space-around",
    alignItems: "center"
  },
  operationInput: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 50,
    height: 50
  },
  operationInputText: {
    color: "#fff"
  },
  btn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15
  },
  actionRow: {
    flex: 1,
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  actionButton: {
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  actionButtonText: {
    fontSize: 24,
    color: "#fff"
  },
  txt: {
    fontSize: 18,
    color: "#fff"
  },
  actionButtonUndo: {
    marginRight: 10,
    backgroundColor: "grey"
  },
  actionButtonEquals: {
    marginLeft: 10,
    backgroundColor: "#9575CD"
  }
});

export default InputComponent;
