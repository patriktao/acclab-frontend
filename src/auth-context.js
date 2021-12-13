import React, { createContext, useEffect, useState } from "react";
import { API } from "./api/api";

/* Context lets you pass states through your entire application  that is particularly below it*/

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserSession = async () => {
      const storedUserEmail = sessionStorage.getItem("email");
      if (storedUserEmail !== null) {
        await API.authentication.loggedIn(storedUserEmail).then((res) => {
          if (res.loggedIn) {
            setLoggedIn(true);
            setUser(res.user);
          }
        });
      }
    };
    getUserSession();
  }, []);

  const userSession = () => {
    return user;
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
    userSession,
  };
  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
