import React, { createContext, useEffect, useState } from "react";
import { API } from "./api/api";

/* Context lets you pass states through your entire application  that is particularly below it*/

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user !== null) {
      const isLoggedIn = API.authentication.loggedIn(user);
      if(isLoggedIn){
        setLoggedIn(true)
      }
    }
  }, []);

  const login = () => {
    console.log("logged in");
    setLoggedIn(true);
  };

  const logout = () => {
    console.log("logged out");
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
