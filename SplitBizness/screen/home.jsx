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
import logo from '../public/images/Logo_Split_QRCODE.png';

const Home = ({route}) => {
  const { login } = route.params;

  const [bemail, setbEmail] = React.useState('');
  const [bamount, setbAmount] = React.useState('');

  const [email, setEmail] = React.useState(login);
  const [amount, setAmount] = React.useState('');
  const [name, setName] = React.useState('');

  const segs = {
    receiver: email,
    price: amount,
  };

  const updateQrcode = (price) => {
    setEmail(login);
    setAmount(price);
  };

  const Title = () => (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 200,
      }}
    >
      <Text category="h1">PAYMENT</Text>
    </Layout>
  );

  const GenerateQrCode = () => {
    return (
      <Layout
        style={{flex: 0.25, justifyContent: 'center', alignItems: 'center'}}
      >
        <Button
          onPress={() => {
            updateQrcode(bamount);
          }}
        >
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
    <ApplicationProvider {...eva} theme={eva.dark}>
      <Title />
      <Layout>
        <Input
          style={{marginHorizontal: 20}}
          placeholder="Amount to pay in €"
          pla
          value={bamount}
          onChangeText={(nextvalue) => setbAmount(nextvalue)}
          keyboardType="numeric"
          returnKeyType="done"
          textAlign="left"
        />
      </Layout>
      <GenerateQrCode />
      <HomeScreen />
    </ApplicationProvider>
  );
};

export default Home;
