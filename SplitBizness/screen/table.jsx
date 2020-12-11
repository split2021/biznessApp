import React from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text, Button} from '@ui-kitten/components';
import {StackActions} from '@react-navigation/native';
import {getMenuItems} from '../axios/axios';
import logo from '../public/images/kart.png';

const numColumns = 4;

const quantityItemsData = [];

// TO REDO
const formatData = (data, numColumns) => {
  return data;
};

const Table = ({route, navigation}) => {
  const {userid} = route.params;
  // const [quantityItemsData, setQuantityItem] = React.useState([]);
  const [menuItems, setmenuItems] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0);

  const refreshPage = () => {
    setRefresh(refresh + 1);
  };

  const MenuItem = ({id, name, price, empty}) => {
    if (empty) {
      return <View style={[styles.item, styles.itemIvisible]} />;
    }
    return (
      <TouchableOpacity
        onPress={() => {
          let flag = false;
          quantityItemsData.forEach((element) => {
            if (element.id == id) {
              element.quantity += 1;
              flag = true;
            }
          });
          if (flag == false) {
            quantityItemsData.push({
              id,
              name,
              price,
              quantity: 1,
            });
          }
          refreshPage();
        }}
      >
        <View style={styles.item}>
          <Text style={styles.title}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const MenurenderItem = ({item}) => (
    <MenuItem
      id={item.id}
      name={item.name}
      price={item.price}
      empty={item.empty}
    />
  );

  const QuantityItem = ({id, name, price, quantity, empty}) => {
    if (empty) {
      return <View style={[styles.item, styles.itemIvisible]} />;
    }
    return (
      <TouchableOpacity
        onPress={() => {
          quantityItemsData.forEach((element, index) => {
            if (element.id == id) {
              element.quantity -= 1;
              element.quantity <= 0 ? quantityItemsData.splice(index, 1) : null;
            }
          });
          refreshPage();
        }}
      >
        <View style={styles.item}>
          <Text style={styles.title}>{quantity}</Text>
          <Text style={styles.title}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const QuantityrenderItem = ({item}) => (
    <QuantityItem
      id={item.id}
      name={item.name}
      price={item.price}
      quantity={item.quantity}
      empty={item.empty}
    />
  );

  React.useEffect(() => {
    const fetch_items = async () => {
      const a = await getMenuItems(userid);
      setmenuItems(a);
    };
    fetch_items();
  }, [refresh]);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout
        style={{flex: 10, justifyContent: 'flex-start', alignItems: 'center'}}
      >
        <Layout style={styles.kartborder}>
          {/* <Text>Menu</Text> */}
          <SafeAreaView style={[styles.container]}>
            <FlatList
              data={formatData(menuItems, numColumns)}
              renderItem={MenurenderItem}
              keyExtractor={(item) => item.id}
              numColumns={numColumns}
            />
          </SafeAreaView>
        </Layout>
      </Layout>
      <Layout style={{flex: 0.1, backgroundColor: 'white'}} />
      <Layout
        style={{flex: 10, justifyContent: 'flex-start', alignItems: 'center'}}
      >
        
        {/* <Text>Quantity</Text> */}
        <ImageBackground source={logo} style={styles.image}>
          <Text style={{color:'transparent'}}>_____________________________________________________________________</Text>
          <SafeAreaView style={styles.container}>
            <FlatList
              data={formatData(quantityItemsData, numColumns)}
              renderItem={QuantityrenderItem}
              keyExtractor={(item) => item.id}
              numColumns={numColumns}
            />
          </SafeAreaView>
        </ImageBackground>
      </Layout>
      <Layout
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'blue',
        }}
      >
        <Button
          style={{flex: 1, width: '100%'}}
          onPress={() => {
            console.log(quantityItemsData);
            navigation.dispatch(
              StackActions.push('QrCode', {data: quantityItemsData}),
            );
          }}
        >
          Générer un paiement !
        </Button>
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
    height: 140,
    width: 140,
    borderRadius: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
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
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },

  kartborder: {
    borderColor: '#A2A2A2',
    borderWidth: 1,
    padding: 5,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    resizeMode: 'repeat',
    justifyContent: 'center',
  },
});

export default Table;
