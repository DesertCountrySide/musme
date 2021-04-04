import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import AuthContext from './context/AuthContext';
import SignIn from './SignIn';
import SignUp from './SignUp';

const MainAuthentication = () => {
  let currComponent = "</>";
  const status = useContext(AuthContext);
  if(status.currAuthScreen === "SignIn"){
    currComponent = <SignIn />;
  } else if(status.currAuthScreen === "SignUp"){
    currComponent = <SignUp />;
  }

  return (
    currComponent
  );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainAuthentication;