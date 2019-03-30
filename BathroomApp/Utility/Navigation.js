import {createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation';
import Login from '../Pages/Login';
import Institution from '../Pages/Institution';
import { View} from 'react-native'

const Nav = createStackNavigator({
  Login: Login,
  Institution: Institution,
},
{
  initialRouteName: "Institution"
});
  
export default Nav;