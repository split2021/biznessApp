/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

/**
 * THEMING
 */
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';

/**
 * QrCode
 */
import QRCode from 'react-native-qrcode-svg';

let segs = {
  token: 'secret-weapon',
  receiver: 'resto@paypal.fr', 
  amount: 10.5, 
  weblink: 'http://chiliwa.me',
}

segs = JSON.stringify(segs)

const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category="h1">HOME</Text>
    <QRCode size={300} value={segs} />
  </Layout>
);

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <HomeScreen />
    </ApplicationProvider>
  );
};

export default App;
