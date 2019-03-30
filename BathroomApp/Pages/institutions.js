import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class institutions extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View style={styles.container}>

        {/* <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
        /> */}

        <Text> Test </Text>

      </View>
    );
  }
}


const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'flex-start',
//     backgroundColor: '#5495ff',
//   },
//   title: {
//     flex: 1,
//     marginTop: 100,
//     fontSize: 40,
//     textAlign: 'center',
//     color: '#333333',
//   },
//   buttonGroup: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     marginBottom: 50,
//   }
});