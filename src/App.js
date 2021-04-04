/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {AuthProvider} from './context/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './MainNavigator';

const App = () => {
  return (
    <AuthProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
    </AuthProvider>
  );
};

export default App;