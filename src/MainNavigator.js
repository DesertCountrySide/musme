import React, {useContext, useEffect} from 'react';
import {Platform, StyleSheet} from 'react-native';
import AuthContext from './context/AuthContext';
import MainAuthentication from './MainAuthentication';
import Main from './Main';

// const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  const status = useContext(AuthContext);

  useEffect(() => {
    // Hub.listen("auth", ({ payload: { event, data } }) => {
    //   if (event === "signIn"){
        // status.setAuthState('signedIn');
    //   }
    // });
  },[]);

  if (status.authState === 'signedIn') {
    // if(Platform.OS === "web"){
      return (
        <Main/>
      );
    // }
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
