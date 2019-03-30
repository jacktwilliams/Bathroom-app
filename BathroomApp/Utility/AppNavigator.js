import React from 'react';

import { createStackNavigator } from 'react-navigation';
import { institutions } from '../Pages/institutions';

const AppNav = createStackNavigator({
    Main: institutions
  },
  {
    initialRouteName: "Main"
  });
    
  export default AppNav;

// This will just point to the main screen that says "this is the app" for now

