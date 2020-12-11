import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import QrCode from '../screen/QrCode';
import Login from '../screen/login';
import Register from '../screen/register';
import Home from '../screen/home'

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="QrCode" component={QrCode} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default RootStack;
