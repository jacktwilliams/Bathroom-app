import {createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation';
import Login from '../Pages/Login';
import institution from '../Pages/institution';
import { View} from 'react-native'

const Nav = createStackNavigator({
  Login: Login,
  institution: institution,
},
{
  initialRouteName: "institution"
});
  
export default Nav;