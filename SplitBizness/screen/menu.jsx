import React, { useEffect } from 'react';

import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import {
  FlatList,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackActions} from '@react-navigation/native';
import {getMenuItems, deleteItem} from '../axios/axios';

const AddItem = [
  {
    id: 'additemElement',
    name: 'Ajouter\n au\n menu',
    type: 'addItem',
  },
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow != numColumns &&
    numberOfElementsLastRow != 0
  ) {
    data.push({title: `blanc-${numberOfElementsLastRow}`, empty: true});
    numberOfElementsLastRow += 1;
  }

  return data;
};


const numColumns = 3;
const Menu = ({route, navigation}) => {
  const login = route.params.login;
  const modify = route.params.modify;
  const userid = route.params.userid;
  const [menuItems, setmenuItems] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0)
  
  const refreshPage = () => {
    setRefresh(refresh + 1)
  }

  React.useEffect( () => {
    const fetch_items = async () => {
      let a = await getMenuItems(userid)
      setmenuItems(a)
    }
    fetch_items()
  }, [refresh])

  const Item = ({id, name, price, empty, type, navigation}) => {
    if (type == 'addItem') {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(StackActions.push('Ajouter au Menu', {refresh: refreshPage}));
          }}
        >
          <View style={[styles.item, styles.addItem]}>
            <Text style={styles.title}>{name}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    if (empty) {
      return <View style={[styles.item, styles.itemIvisible]} />;
    }
    return (
      <TouchableOpacity
        onPress={() => {
          Alert.alert("Attention","Voulez vous supprimer se plat ?", [{text:"Annuler"},{text:"Supprimer", onPress: async () => {await deleteItem(id);refreshPage()}}])
        }}
      >
        <View style={styles.item}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.title}>{price} €</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => (
    <Item id={item.id} name={item.name} price={item.price} empty={item.empty} type={item.type} navigation={navigation} />
  );

  const Visio = () => {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={formatData(menuItems.concat(AddItem), numColumns)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
        />
      </SafeAreaView>
    );
  };

  const Myscreen = () => {
    return Visio();
  };

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <Myscreen />
      </Layout>
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
    backgroundColor: 'white',
    borderColor: '#A2A2A2',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 200,
    borderRadius: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  itemIvisible: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  addItem: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#A2A2A2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
});
export default Menu;
