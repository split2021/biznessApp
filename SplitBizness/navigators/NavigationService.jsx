import { StackActions, CommonActions } from '@react-navigation/native';

let navigator;

const setTopLevelNavigator = (navigatorRef) => {
  navigator = navigatorRef;
};

const navigateH = (routeName, params = {}) => {
  navigator.dispatch(
    CommonActions.navigate({
      routeName,
      params,
    })
  );
};

const navigate = (routeName) => {
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [CommonActions.navigate({ routeName })],
    })
  );
};

// add other navigation functions that you need and export them

export default {
  navigate,
  navigateH,
  setTopLevelNavigator,
};
