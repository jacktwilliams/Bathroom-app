import React from 'react';

import { createStackNavigator } from 'react-navigation';
import LoginScreen from '../Pages/LoginScreen';

const AuthNav = createStackNavigator({
   LoginScreen: LoginScreen
  },
  {
    initialRouteName: "LoginScreen"
  });
    
  export default AuthNav;