"use strict";

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as CalculatorActionCreators from "../actions/actionDispatchers";
import InputComponent from "../components/InputComponent";
import OutputComponent from "../components/OutputComponent";

class Calculator extends React.Component {
  render() {
    var { dispatch, calculations } = this.props;
    var boundActionCreators = bindActionCreators(
      CalculatorActionCreators,
      dispatch
    );
    return (
      <View style={styles.container}>
        <OutputComponent
          style={styles.outputScreen}
          calculations={calculations}
        />
        <InputComponent {...boundActionCreators} style={{ flex: 1 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  outputScreen: {
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40
  }
});

const selector = state => ({
  calculations: state.calculations
});

export default connect(selector)(Calculator);
