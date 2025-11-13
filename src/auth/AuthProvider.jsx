import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import AuthContext from "./AuthContext";
import { auth } from "../firebase/firebase.config";

// Google auth provider for google popup login
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  // Current user information state
  const [user, setUser] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Firebase Auth functions
  // Create new user function
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Google popup login function
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Email login function
  const emailLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Profile update function
  const profileUpdate = ({ displayName, photoURL }) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  // Forget password function
  const forgetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Logout function
  const logout = () => {
    return signOut(auth);
  };

  // Observer for current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // reuseable functions, state and information for the entire app
  const authInfo = {
    user,
    loading,
    setUser,
    createUser,
    googleLogin,
    emailLogin,
    profileUpdate,
    forgetPassword,
    logout,
  };

  return <AuthContext value={authInfo}> {children} </AuthContext>;
};

export default AuthProvider;
