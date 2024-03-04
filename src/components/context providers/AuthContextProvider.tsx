import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import AuthContext from "../../contexts/AuthContext";

import "firebase/auth";
import database from "../../data/database";

const provider = new firebase.auth.GoogleAuthProvider();

const checkForRole = async (role: string, userId: string | undefined) => {
  if (!userId) {
    return false;
  }

  try {
    const roleRes = await database.roles.get(role);
    console.log(roleRes.users);

    return roleRes.users.includes(userId);
  } catch (error: any) {
    console.error(error.message);
    return false;
  }
};

export const AuthContextProvider: React.FC = ({ children }) => {
  const [loginSource, setLoginSource] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const checkRoles = async (userId: string | undefined) => {
    const isDeveloper = await checkForRole("developer", userId);
    console.log(isDeveloper ? "Is developer" : "Is not a developer");

    setIsDeveloper(isDeveloper);

    const isOwner = await checkForRole("owner", userId);
    console.log(isOwner ? "Is owner" : "Is not an owner");

    setIsOwner(isOwner);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(function (newUser) {
      if (newUser && !newUser.isAnonymous) {
        setUser(newUser);
        checkRoles(newUser?.uid).then();
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setIsOwner(false);
        setIsDeveloper(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (
    email: string,
    password: string,
    shouldRememberUser: boolean
  ) => {
    let persistence = firebase.auth.Auth.Persistence.SESSION;

    if (shouldRememberUser) {
      persistence = firebase.auth.Auth.Persistence.LOCAL;
    }

    return firebase
      .auth()
      .setPersistence(persistence)
      .then(() => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
      });
  };

  const handleLoginWithGoogle = async (shouldRememberUser: boolean) => {
    let persistence = firebase.auth.Auth.Persistence.SESSION;

    if (shouldRememberUser) {
      persistence = firebase.auth.Auth.Persistence.LOCAL;
    }

    return firebase
      .auth()
      .setPersistence(persistence)
      .then(() => {
        return firebase.auth().signInWithPopup(provider);
      });
  };

  const handleRegister = async (
    email: string,
    password: string,
    shouldRememberUser: boolean
  ) => {
    let persistence = firebase.auth.Auth.Persistence.SESSION;

    if (shouldRememberUser) {
      persistence = firebase.auth.Auth.Persistence.LOCAL;
    }

    return firebase
      .auth()
      .setPersistence(persistence)
      .then(() => {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
      });
  };

  const handleLogout = () => {
    return firebase.auth().signOut();
  };

  const wentToLogin = (source: string) => {
    setLoginSource(source);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login: handleLogin,
        loginWithGoogle: handleLoginWithGoogle,
        logout: handleLogout,
        wentToLogin,
        register: handleRegister,
        loginSource,
        isDeveloper,
        isOwner,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
