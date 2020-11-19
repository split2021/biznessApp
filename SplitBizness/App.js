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
import {
  ApplicationProvider,
  Layout,
  Text,
  Input,
  Button,
} from '@ui-kitten/components';

/**
 * QrCode
 */
import QRCode from 'react-native-qrcode-svg';

/**
 * import and create QrCodeLogo
 */
import logo from './public/images/Logo_Split_QRCODE.png';

const App = () => {
  const [bemail, setbEmail] = React.useState('');
  const [bamount, setbAmount] = React.useState('');

  const [email, setEmail] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [name, setName] = React.useState('');

  const segs = {
    token: 'secret-weapon',
    receiverName: name,
    receiver: email,
    price: amount,
    weblink: 'http://chiliwa.me',
    deeplink: 'fb://chiliwaa',
  };

  const updateQrcode = (resto, price) => {
    setEmail(resto);
    setAmount(price);
  };

  const Title = () => (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 200,
      }}>
      <Text category="h1">PAYMENT</Text>
    </Layout>
  );

  const Information = () => (
    <Layout>
      <Input
        style={{marginHorizontal: 20}}
        placeholder="Enter your Email"
        value={bemail}
        onChangeText={(nextvalue) => setbEmail(nextvalue)}
        keyboardType="email-address"
        returnKeyType="next"
      />
      <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
        <Input
          style={{marginRight: 5, marginHorizontal: 20, width: '50%'}}
          placeholder="Amount to pay in €"
          pla
          value={bamount}
          onChangeText={(nextvalue) => setbAmount(nextvalue)}
          keyboardType="numeric"
          returnKeyType="done"
          textAlign="left"
        />
        <Text>EUR</Text>
      </Layout>
    </Layout>
  );

  const GenerateQrCode = () => {
    return (
      <Layout
        style={{flex: 0.25, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          onPress={() => {
            updateQrcode(bemail, bamount);
            console.log(segs);
          }}>
          Generate QrCode
        </Button>
      </Layout>
    );
  };

  const HomeScreen = () => (
    <Layout style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
      <QRCode
        size={300}
        value={JSON.stringify(segs)}
        logo={logo}
        logoSize={50}
        logoBackgroundColor="white"
        quietZone={1}
        logoMargin={0}
      />
    </Layout>
  );

  return (
    <ApplicationProvider {...eva} theme={eva.light} >
      <Title />
      <Information />
      <GenerateQrCode />
      <HomeScreen />
    </ApplicationProvider>
  );
};

export default App;
