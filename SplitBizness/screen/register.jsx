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
import {axiosRegister} from '../axios/axios';

const Register = ({navigation}) => {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const Title = () => (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 200,
      }}
    >
      <Text category="h1">Register</Text>
    </Layout>
  );

  const RegisterText = () => (
    <Layout
      style={{justifyContent: 'center', paddingTop: 10, flexDirection: 'row'}}
    >
      <Text>Already have an account ? Click </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(StackActions.replace('Login', {}));
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
            placeholder="Email"
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
          <Input
            style={{marginHorizontal: 20}}
            placeholder="Password"
            value={password2}
            onChangeText={(nextvalue) => setPassword2(nextvalue)}
            secureTextEntry
            returnKeyType="done"
            textAlign="left"
          />
          <Input
            style={{marginHorizontal: 20}}
            placeholder="User Name"
            value={username}
            onChangeText={(nextvalue) => setUsername(nextvalue)}
            returnKeyType="done"
            textAlign="left"
          />
          <Input
            style={{marginHorizontal: 20}}
            placeholder="First Name"
            value={firstname}
            onChangeText={(nextvalue) => setFirstname(nextvalue)}
            returnKeyType="done"
            textAlign="left"
          />
          <Input
            style={{marginHorizontal: 20}}
            placeholder="Last Name"
            value={lastname}
            onChangeText={(nextvalue) => setLastname(nextvalue)}
            returnKeyType="done"
            textAlign="left"
          />
          <Input
            style={{marginHorizontal: 20}}
            placeholder="Phone Number"
            value={phone}
            onChangeText={(nextvalue) => setPhone(nextvalue)}
            returnKeyType="done"
            textAlign="left"
          />
          <Button
            style={{marginHorizontal: 20, marginTop: 50}}
            onPress={async () => {
              const is_register = await axiosRegister(
                login,
                password,
                username,
                firstname,
                lastname,
                phone,
              );
              if (is_register) {
                navigation.dispatch(
                  StackActions.replace('Home', {R_user:login, R_pwd:password}),
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

export default Register;
