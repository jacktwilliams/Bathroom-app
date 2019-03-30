import {createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation';
import Login from '../Pages/Login';
import { AppNav } from '../Utility/AppNavigator';
import { View} from 'react-native'

const Nav = createStackNavigator({
  Auth: AuthNavigator,
  App: AppNav
},
{
  initialRouteName: "institutions"
});
  
export default Nav;