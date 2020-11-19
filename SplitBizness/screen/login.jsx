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
import {TouchableOpacity, Alert} from 'react-native';

import {StackActions} from '@react-navigation/native';
import {getToken} from '../axios/axios';

const Login = ({navigation}) => {

  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  const Title = () => (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 200,
      }}
    >
      <Text category="h1">Login</Text>
    </Layout>
  );

  const RegisterText = () => (
    <Layout
      style={{justifyContent: 'center', paddingTop: 10, flexDirection: 'row'}}
    >
      <Text>Don't have an account ? Click </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(StackActions.replace('Register', {}));
        }}
      >
        <Text style={{color: 'yellow'}}>here</Text>
      </TouchableOpacity>
    </Layout>
  );

  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <Layout style={{flex: 1}}>
        <Title />
        <Layout>
          <Input
            style={{marginHorizontal: 20}}
            placeholder="Login"
            value={login}
            onChangeText={(nextvalue) => setLogin(nextvalue)}
            keyboardType="email-address"
            returnKeyType="next"
            autoCapitalize="none"
          />

          <Input
            style={{marginHorizontal: 20}}
            placeholder="Password"
            value={password}
            onChangeText={(nextvalue) => setPassword(nextvalue)}
            secureTextEntry
            returnKeyType="done"
            textAlign="left"
          />
          <Button
            style={{marginHorizontal: 20, marginTop: 50}}
            onPress={async () => {
              const token = await getToken(login, password);
              if (token) {
                navigation.dispatch(
                  StackActions.replace('Home', {login:login}),
                );
              } else {
                Alert.alert('Error', 'An Error Occured');
              }
            }}
          >
            Continue
          </Button>
        </Layout>
        <RegisterText />
      </Layout>
    </ApplicationProvider>
  );
};

export default Login;
