import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCej0gTCiJpxcliidq9nboVG53oRdG_Xr4",
    authDomain: "bathroomapp-5daa4.firebaseapp.com",
    databaseURL: "https://bathroomapp-5daa4.firebaseio.com",
    projectId: "bathroomapp-5daa4",
    storageBucket: "bathroomapp-5daa4.appspot.com",
    messagingSenderId: "776830632776"
};

export default class AuthLoadingScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authLoading: true,
            authenticated: false
        };

        
        if(!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        
        firebase.auth().onAuthStateChanged(this._onAuthStateChanged);
    }

    _onAuthStateChanged = (user) => {
        this.setState({authLoading: false});
        this.setState({authenticated: !!user});
        this.props.navigation.navigate(this.authenticated ? 'AppNav' : 'LoginScreen'); //not if we should go back to login or auth screen
    }

    render() {
        <View>
            <ActivityIndicator size="rage" color = "#0000ff" />
        </View>
    }
}