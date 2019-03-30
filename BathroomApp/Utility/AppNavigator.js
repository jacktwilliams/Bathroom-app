import React from 'react';
import { createStackNavigator } from 'react-navigation';
import InstitutionScreen from '../Pages/InstitutionScreen';

const AppNav = createStackNavigator({
  InstitutionScreen: InstitutionScreen
},
{
  initialRouteName: "InstitutionScreen"
});
  
export default AppNav;

// This will just point to the main screen that says "this is the app" for now

