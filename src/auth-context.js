import React, { createContext, useEffect, useState } from "react";

/* Context lets you pass states through your entire application  that is particularly below it*/

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  /* useEffect(() => {
    // pull saved login state from localStorage
  }, []); */

  const login = () => {
    console.log('logged in')
    setLoggedIn(true);
  };

  const logout = () => {
    console.log('logged out')
    setLoggedIn(false);
  };

  const authContextValue = {
    login,
    logout,
    loggedIn,
  };
  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
