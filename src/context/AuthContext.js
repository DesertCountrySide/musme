import React, {useState} from 'react';

/*****************************************************************************
 * Module to keep track of the login/signin state
 * This is just for switching screens
 *****************************************************************************/

const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
  const [state, setState] = useState(null);
  const [username, setUsername] = useState('');
  const [authScreen, setAuthScreen] = useState("SignIn");

  const setAuthState = updateState => {
    setState(updateState);
  };

  const setCurrentAuthScreen = screen => {
    setAuthScreen(screen);
  }

  const setCurrUsername = user => {
    setUsername(user);
  }

  const status = {
    authState: state,
    setAuthState,
    currAuthScreen: authScreen,
    setCurrentAuthScreen,
    currUsername: username,
    setCurrUsername,
  };

  return <AuthContext.Provider value={status}>{children}</AuthContext.Provider>;
};

export default AuthContext;
