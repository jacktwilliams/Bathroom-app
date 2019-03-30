import {createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation';
import Login from '../Pages/Login';
import { View } from 'react-native'

const Nav = createStackNavigator({
  Login: Login
},
{
  initialRouteName: "Login"
});
  
export default Nav;