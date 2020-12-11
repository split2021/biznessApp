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
import {StyleSheet, StatusBar} from 'react-native'
/**
 * QrCode
 */
import QRCode from 'react-native-qrcode-svg';

/**
 * import and create QrCodeLogo
 */
import logo from '../public/images/Logo_Split_QRCODE.png';

const QrCode = ({route}) => {
  const login = route.params.login;
  const data = route.params.data;

  console.log(route.params)
  console.log(data)

  const [detail, setdetail] = React.useState(data)
  const [bamount, setbAmount] = React.useState('');
  const [email, setEmail] = React.useState(login);
  const [amount, setAmount] = React.useState('');

  const segs = {
    receiver: login,
    detail
    //price: amount,
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
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <QRCode
        size={400}
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
    <ApplicationProvider {...eva} theme={eva.light}>
      {/* <Title />
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
      <GenerateQrCode /> */}
      <HomeScreen style={styles.container}/>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginBottom: StatusBar.currentHeight || 0,
    marginVertical: 20,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 150,
    borderRadius: 20,
    margin: 20,
  },
  itemIvisible: {
    backgroundColor: 'transparent',
  },
  addItem: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#A2A2A2',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default QrCode;
