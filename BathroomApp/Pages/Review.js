import React, {Component} from 'react';
import {Dimensions, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AdjBoxes from '../Components/AdjBoxes';

export default class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adjText1: "Clean",
      adjText2: "Stocked",
      adjText3: "Quiet",
      clean: true,
      stocked: true,
      quiet: true,
    };
  }

  _handleAdjBoxClick(adjId) {
    let clean = this.state.clean; let stocked = this.state.stocked; let quiet = this.state.quiet;
    if (adjId === 1) {
      clean = !clean;
    }
    else if (adjId === 2) {
      stocked = !stocked;
    }
    else {
      quiet = !quiet;
    }

    this.setState({
      clean: clean,
      stocked: stocked,
      quiet: quiet,
      adjText1: clean ? "Clean" : "Dirty",
      adjText2: stocked ? "Stocked" : "Empty",
      adjText3: quiet ? "Quiet" : "Busy",
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.adjContainer}>
          <AdjBoxes
            adjText1 = {this.state.adjText1}
            adjText2 = {this.state.adjText2}
            adjText3 = {this.state.adjText3}
            onClick = {this._handleAdjBoxClick.bind(this)}
          />
        </View>
      </View>
    )
  }
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  adjContainer: {
    width: width * .85,
    height: height * .10,
    marginTop: height * .03
  },
});