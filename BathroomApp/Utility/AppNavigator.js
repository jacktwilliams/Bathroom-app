import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { InstitutionList } from '../Pages/InstitutionList';

const AppNav = createStackNavigator({
  Home: InstitutionList
},
{
  initialRouteName: 'Home'
});
    
export default AppNav;

// This will just point to the main screen that says "this is the app" for now

