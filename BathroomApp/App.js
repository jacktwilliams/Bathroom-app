/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import * as firebase from "firebase";

  firebase.initializeApp = ({
    apiKey: "AIzaSyCej0gTCiJpxcliidq9nboVG53oRdG_Xr4",
    authDomain: "bathroomapp-5daa4.firebaseapp.com",
    databaseURL: "https://bathroomapp-5daa4.firebaseio.com",
    projectId: "bathroomapp-5daa4",
    storageBucket: "bathroomapp-5daa4.appspot.com",
    messagingSenderId: "776830632776"
  });

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bathroom App</Text>
          <View style={styles.buttonGroup}> 
            <Button title={'LOG IN'}/>
            <Button title={'CREATE AN ACCOUNT'}/>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#5495ff',
  },
  title: {
    flex: 1,
    marginTop: 100,
    fontSize: 40,
    textAlign: 'center',
    color: '#333333',
  },
  buttonGroup: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
  }
});
