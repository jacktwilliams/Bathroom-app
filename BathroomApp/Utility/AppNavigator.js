import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Institution from '../Pages/Institution';
import Building from '../Pages/Building';
import ReviewList from '../Pages/ReviewList';

const AppNav = createStackNavigator({
  Institution: Institution,
  Building: Building,
  ReviewList: ReviewList,
},
{
  initialRouteName: "Institution"
});
  
export default AppNav;

// This will just point to the main screen that says "this is the app" for now
