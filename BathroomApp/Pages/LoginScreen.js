import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, TouchableHighlight, Image, Alert } from 'react-native';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCej0gTCiJpxcliidq9nboVG53oRdG_Xr4",
    authDomain: "bathroomapp-5daa4.firebaseapp.com",
    databaseURL: "https://bathroomapp-5daa4.firebaseio.com",
    projectId: "bathroomapp-5daa4",
    storageBucket: "bathroomapp-5daa4.appspot.com",
    messagingSenderId: "776830632776"
}

firebase.initializeApp(config);

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
      authenticated: false
    };


  //if(!firebase.apps.length) {
      //const app = firebase.initializeApp({});
  //}
  
  // firebase.auth().onAuthStateChanged(this._onAuthStateChanged);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput autoCapitalize="none" style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput autoCapitalize="none" style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this._handleLoginPress}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={this._handleForgotPress}>
            <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={this._handleSignupPress}>
            <Text>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }

//   _onAuthStateChanged = (user) => {
//     this.setState({authenticated: !!user});
//     if(!this.authenticated){
//       alert("Invalid credentials")

//     }
//     else{
//       this.props.navigation.navigate('AppNav'); //not if we should go back to login or auth screen

//     }
// }


  _handleLoginPress = () => {
    //this.props.navigation.navigate('AppNav');
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      this.props.navigation.navigate('AppNav');
    }).catch((error) => {
      alert("credentials invalid. Please try again")
    });
  };
  
  _handleSignupPress = () => {
    this.props.navigation.navigate('SignupScreen');
  }

  _handleForgotPress = () => {
    alert('Seek not what you want, but what you need and you shall find the answer.');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#30405A',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:300,
      height:45,
      marginBottom:40,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#38BEB5",
    marginTop: 30
  },
  loginText: {
    color: 'white',
  }
});
 