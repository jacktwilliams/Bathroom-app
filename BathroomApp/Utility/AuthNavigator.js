import React from 'react';

import { createStackNavigator } from 'react-navigation';
import LoginScreen from '../Pages/LoginScreen';
import SignupScreen from '../Pages/SignupScreen';
import AuthLoadingScreen from '../Pages/AuthLoadingScreen';

const AuthNav = createStackNavigator({
   LoginScreen: LoginScreen,
   SignupScreen: SignupScreen,
   AuthLoadingScreen: AuthLoadingScreen
  },
  {
    initialRouteName: "AuthLoadingScreen"
  });
    
  export default AuthNav;