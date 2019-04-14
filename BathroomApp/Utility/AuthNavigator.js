import React from 'react';

import { createStackNavigator } from 'react-navigation';
import LoginScreen from '../Pages/LoginScreen';
import SignupScreen from '../Pages/SignupScreen';

const AuthNav = createStackNavigator({
   LoginScreen: LoginScreen,
   SignupScreen: SignupScreen
  },
  {
    initialRouteName: "SignupScreen"
  });
  
  export default AuthNav;