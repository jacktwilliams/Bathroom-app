import { createSwitchNavigator } from 'react-navigation';
import AppNav from '../Utility/AppNavigator';
import AuthNav from '../Utility/AuthNavigator';

const Nav = createSwitchNavigator({
  AppNav: AppNav,
  AuthNav: AuthNav
},
{
  initialRouteName: "AuthNav"
});
  
export default Nav;