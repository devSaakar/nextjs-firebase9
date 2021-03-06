import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Login from "./components/Login";
import Loading from "./components/Loading";
import nookies from "nookies"

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const auth = getAuth();
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        console.log("No User");
        setCurrentUser(null);
        setLoading(false);
        return;
      }

      const token = await user.getIdToken();
      setCurrentUser(user);
      setLoading(false);
      nookies.set (undefined, "token", token, {});

      console.log("token :>> ", token);
      console.log("user :>> ", user);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <Loading type="bars" color="yellowgreen" />
      ) : currentUser ? (
        <AuthContext.Provider value={{currentUser}}>{children}</AuthContext.Provider>
      ) : (
        <Login />
      )}
    </div>
  );
};

export const useAuth = () => useContext(AuthContext);
