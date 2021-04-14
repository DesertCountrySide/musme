import React, {useContext, useEffect} from 'react';
import {Platform, StyleSheet} from 'react-native';
import AuthContext from './context/AuthContext';
import MainAuthentication from './MainAuthentication';
import setAuthToken from "./utils/setAuthToken";
import Main from './Main';

// const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  const status = useContext(AuthContext);

  useEffect(() => {
    if(localStorage.getItem('jwtToken')){
      setAuthToken(localStorage.getItem('jwtToken'));
      status.setAuthState('signedIn');
    }
  },[status]);

  if (status.authState === 'signedIn') {
      return (
        <Main/>
      );
  } else {
    return (
      <>
        <MainAuthentication />
      </>
    );
  }
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#000000',
    alignItems: 'center',
  },
});

export default MainNavigator;
