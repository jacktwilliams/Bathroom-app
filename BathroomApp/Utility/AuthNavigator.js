import React from 'react';

import { createStackNavigator } from 'react-navigation';
import { Login } from '../Pages/Login';

const AuthNav = createStackNavigator({
   Login : Login
  },
  {
    initialRouteName: "Login"
  });
    
  export default AuthNav;