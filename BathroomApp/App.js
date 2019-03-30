/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import * as firebase from "firebase";
import Nav from './Utility/Navigation';
import {createAppContainer} from 'react-navigation';
import NavigationService from './Utility/NavigationService';

const Navi = createAppContainer(Nav);

  firebase.initializeApp = ({
    apiKey: "AIzaSyCej0gTCiJpxcliidq9nboVG53oRdG_Xr4",
    authDomain: "bathroomapp-5daa4.firebaseapp.com",
    databaseURL: "https://bathroomapp-5daa4.firebaseio.com",
    projectId: "bathroomapp-5daa4",
    storageBucket: "bathroomapp-5daa4.appspot.com",
    messagingSenderId: "776830632776"
  });

export default class App extends Component {
  render() {
    return (
      <Navi ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }} />
    );
  }
}
