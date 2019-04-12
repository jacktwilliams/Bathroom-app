import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import navigate from '../Utility/NavigationService';
import consts from '../Utility/Constants';

export default class ReviewsButton extends Component{

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={styles.tabButton}
            onPress={() => {
              console.log("Navigating to review list. Sending: \n" + this.props.dataHolder);
              navigate.navigate("ReviewList", {dataHolder: this.props.dataHolder});
            }}  
          >
            <Text style={styles.buttonText}>All Reviews</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: accentColor,
    height: height * .07,
  },
  buttonText: {
    fontSize: 18
  },
  tabButton: {
    width: width,
    height: height * .07,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: consts.accentColor,
  },
});