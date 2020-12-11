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
import {StatusBar} from 'react-native';
import {TouchableOpacity, Alert} from 'react-native';

import {StackActions} from '@react-navigation/native';
import {addItemsToMenu} from '../axios/axios';

const AddToMenu = ({route, navigation}) => {
  const [platName, setPlatName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const userid = route.params.userid;
  const refreshParent = route.params.refresh;

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout style={{flex: 1, marginTop: StatusBar.currentHeight || 0}}>
        <Layout style={{marginTop:20}}>
          <Input
            style={{marginHorizontal: 20}}
            placeholder="Nom du plat"
            value={platName}
            onChangeText={(nextvalue) => setPlatName(nextvalue)}
            keyboardType="email-address"
            returnKeyType="next"
          />

          <Input
            style={{marginHorizontal: 20}}
            placeholder="Prix (EUR)"
            value={price}
            onChangeText={(nextvalue) => setPrice(nextvalue)}
            returnKeyType="done"
            textAlign="left"
            keyboardType = 'numeric'
          />
          <Button
            style={{marginHorizontal: 20, marginTop: 50}}
            onPress={async () => {
              await addItemsToMenu(userid, platName, price)
              refreshParent()
              navigation.dispatch(StackActions.popToTop());
            }}
          >
            Ajouter au menu
          </Button>
        </Layout>
      </Layout>
    </ApplicationProvider>
  );
};

export default AddToMenu;
