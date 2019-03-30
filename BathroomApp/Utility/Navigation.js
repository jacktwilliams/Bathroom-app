import {createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation';
import Login from '../Pages/Login';
import institutions from '../Pages/institutions';
import { View} from 'react-native'

const Nav = createStackNavigator({
  Login: Login,
  institutions: institutions,
},
{
  initialRouteName: "institutions"
});
  
export default Nav;