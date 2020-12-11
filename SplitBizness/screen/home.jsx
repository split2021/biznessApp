import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import QrCode from './QrCode';
import Menu from './menu';
import Table from './table';
import AddToMenu from './AddToMenu';

/**
 * THEMING
 */

const MenuStack = createStackNavigator();

const menuStackScreen = ({route}) => {
  login = route.params.login;
  modify = false;
  userid = route.params.userid;
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <MenuStack.Navigator>
        <MenuStack.Screen
          name="Menu"
          component={Menu}
          initialParams={{login, userid ,modify}}
        />
        <MenuStack.Screen
          name="Ajouter au Menu"
          component={AddToMenu}
          initialParams={{login, userid, modify}}
        />
      </MenuStack.Navigator>
    </ApplicationProvider>
  );
};

const TableStack = createStackNavigator();

const tableStackScreen = ({route}) => {
  login = route.params.login;
  userid = route.params.userid;
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <TableStack.Navigator>
        <TableStack.Screen
          name="Paiement"
          component={Table}
          initialParams={{login, userid}}
        />
        <TableStack.Screen
          name="QrCode"
          component={QrCode}
          initialParams={{login}}
        />
      </TableStack.Navigator>
    </ApplicationProvider>
  );
};

const QrCodeStack = createStackNavigator();

const qrcodeStackScreen = ({route}) => {
  login = route.params.login;
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <QrCodeStack.Navigator>
        <QrCodeStack.Screen
          name="QrCode"
          component={QrCode}
          initialParams={{login}}
        />
      </QrCodeStack.Navigator>
    </ApplicationProvider>
  );
};

const Tab = createBottomTabNavigator();

const Home = ({route}) => {
  login = route.params.login;
  userid = route.params.userid;
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Tab.Navigator>
        <Tab.Screen
          name="Menu"
          component={menuStackScreen}
          initialParams={{login, userid}}
        />
        <Tab.Screen
          name="Paiement"
          component={tableStackScreen}
          initialParams={{login, userid}}
        />
        {/* <Tab.Screen
          name="QrCode"
          component={qrcodeStackScreen}
          initialParams={{login, userid}}
        /> */}
      </Tab.Navigator>
    </ApplicationProvider>
  );
};

export default Home;
