import React from 'react';
import { createStackNavigator } from 'react-navigation';
import InstitutionScreen from '../Pages/InstitutionScreen';
import Institution from '../Pages/institution';

const AppNav = createStackNavigator({
  Institution: Institution
},
{
  initialRouteName: "Institution"
});
  
export default AppNav;

// This will just point to the main screen that says "this is the app" for now
