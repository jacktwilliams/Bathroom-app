import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TextInput, TouchableHighlight, Image, Alert } from 'react-native';
import * as firebase from 'firebase';
import consts from '../Utility/Constants';

const addr = consts.addr + "newUser/";

export default class LoginScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    let headerTitle = (<Text style={styles.HeaderTitle}>Register</Text>);
    
    
    return {headerTitle, headerStyle: {
        backgroundColor: '#5495ff'
     }}
  }

  constructor(props) {
    super(props);
    state = {
      email   : '',
      password: '',
      username: ''
    }
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  _handleCreatePressed = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      this.props.navigation.navigate('AppNav');
      let user = firebase.auth().currentUser;
      user.getIdToken(true)
      .then((tok) => {
        fetch(addr,
          {
            method: "POST",
            body: JSON.stringify({
              uid: user.uid,
              uname: user.displayName,
              token: tok
            })
          });
      });
    }).catch((error) => {
      alert(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.logo}>
          <Image source={require('../images/goGuide.png')}/> 
          <Image source={require('../images/tp.png')}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ultraviolet/40/000000/gender-neutral-user.png'}}/>
          <TextInput autoCapitalize="none" style={styles.inputs}
              placeholder="Username"
              underlineColorAndroid='transparent'
              onChangeText={(username) => this.setState({username})}/>
        </View>


        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput autoCapitalize="none" style={styles.inputs}
              placeholder="Enter email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput autoCapitalize="none" style={styles.inputs}
              placeholder="Enter password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this._handleCreatePressed}>
          <Text style={styles.loginText}>Create Account</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#30405A',
  },
  logo: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20
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
    marginBottom:60,
    marginTop:10,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: '#38BEB5',

  },
  loginText: {
    color: 'white',
  }
});
