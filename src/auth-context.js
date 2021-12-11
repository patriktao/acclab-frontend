import React, { createContext, useEffect, useState } from "react";
import { API } from "./api/api";

/* Context lets you pass states through your entire application  that is particularly below it*/

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState();
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    const getUserSession = async () => {
      const user = sessionStorage.getItem("user");
      console.log(user);
      if (user !== null) {
        await API.authentication.loggedIn(user).then((res) => {
          if (res.loggedIn) {
            setLoggedIn(true);
            setUserSession(res.user);
          }
        });
      }
    };
    getUserSession();
  }, []);

  const getUserSession = () => {
    return userSession;
  };

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  const authContextValue = {
    login,
    logout,
    loggedIn,
    getUserSession,
  };
  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
