import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/home';
import Login from '../screen/login';
import Register from '../screen/register';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default RootStack;
