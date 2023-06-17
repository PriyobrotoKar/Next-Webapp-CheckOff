"use client";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";

const AuthUserContext = createContext({
  authUser: null,
  isLoading: true,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  const clear = () => {
    setAuthUser(null);
    setIsloading(false);
  };

  const authStateChanged = async (user) => {
    console.log("auth state changed");
    setIsloading(true);
    if (!user) {
      clear();
      return;
    }
    setAuthUser({
      uid: user.uid,
      email: user.email,
      username: user.displayName,
      image: user.photoURL || "/avatar.jpg",
    });
    setIsloading(false);
  };

  const signOut = () => {
    authSignOut(auth).then(() => clear());
  };

  useEffect(() => {
    const unsubscribe = () => {
      console.log("onAuthStateChanged");
      onAuthStateChanged(auth, authStateChanged);
    };
    return unsubscribe();
  }, []);

  return { authUser, setAuthUser, isLoading, setIsloading, signOut };
}

export const AuthUserProvider = ({ children }) => {
  const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
};

export const useAuth = () => useContext(AuthUserContext);
