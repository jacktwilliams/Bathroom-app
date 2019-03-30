/* Usually you navigate by passing the navigation props to all pages.
    If you need to navigate while in a different class which hasn't been sent the prop,
    you can use this service.
*/
import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  console.log("PARAMS provided to nav service: " + JSON.stringify(params));
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
};