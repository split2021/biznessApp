/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {Button, ThemeProvider, Header} from 'react-native-elements';

const App = () => {
  return (
    <ThemeProvider>
      <Header
        leftComponent={{icon: 'menu', color: '#fff'}}
        centerComponent={{text: 'MY TITLE', style: {color: '#fff'}}}
        rightComponent={{icon: 'home', color: '#fff'}}
      />
      <Button title="Hey !" />
    </ThemeProvider>
  );
};

export default App;
