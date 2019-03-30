import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as firebase from "firebase";

firebase.initializeApp = ({
  apiKey: "AIzaSyCej0gTCiJpxcliidq9nboVG53oRdG_Xr4",
  authDomain: "bathroomapp-5daa4.firebaseapp.com",
  databaseURL: "https://bathroomapp-5daa4.firebaseio.com",
  projectId: "bathroomapp-5daa4",
  storageBucket: "bathroomapp-5daa4.appspot.com",
  messagingSenderId: "776830632776"
});

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bathroom App</Text>
          <TextInput style={styles.usernameText}></TextInput>
          <View style={styles.buttonGroup}>
            <Button title={''}/>
            <Button
              title='LOG IN'
              onPress={this._handleLoginPress}
            />
            <Button
              title='CREATE AN ACCOUNT'
              onPress={this._handleSignupPress}
            />
          </View>
      </View>
    );
  }

  _handleLoginPress = () => {
    this.props.navigation.navigate('AppNav');
  };
  
  _handleSignupPress = () => {
    this.props.navigation.navigate('SignupScreen');
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
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