import React, {Component} from 'react';
import {Dimensions, View, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default class AdjBoxes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      styles1: styles.adjBoxNotSelected,
      styles2: styles.adjBoxNotSelected,
      styles3: styles.adjBoxNotSelected,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.adjContainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.onClick(1);
              this.setState({ 
                styles1: this.state.styles1 === styles.adjBoxSelected ? styles.adjBoxNotSelected : styles.adjBoxSelected
              });
            }}
            style={[styles.adjBox, this.state.styles1]}
          >
            <Text>{this.props.adjText1}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.onClick(2);
              this.setState({ 
                styles2: this.state.styles2 === styles.adjBoxSelected ? styles.adjBoxNotSelected : styles.adjBoxSelected
              });
            }}
            style={[styles.adjBox, this.state.styles2]}
          >
            <Text>{this.props.adjText2}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.onClick(3);
              this.setState({ 
                styles3: this.state.styles3 === styles.adjBoxSelected ? styles.adjBoxNotSelected : styles.adjBoxSelected
              });
            }}
            style={[styles.adjBox, this.state.styles3]}
          >
            <Text>{this.props.adjText3}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  adjBox: {
    height: '50%',
    width: '25%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adjBoxSelected: {
    backgroundColor: consts.accentColor,
  },
  adjBoxNotSelected: {
    backgroundColor: '#e2e2e2',
  },
  adjContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});