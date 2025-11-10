// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext(null);

// âœ… Custom hook for easy access
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ðŸ”¹ Create new account
  const signup = async (email, password, name, photo) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (name || photo) {
        await updateProfile(result.user, {
          displayName: name || "New User",
          photoURL: photo || "",
        });
      }
      setUser(result.user);
      return result.user;
    } catch (error) {
      console.error("Signup Error:", error.code);
      throw error;
    }
  };

  // ðŸ”¹ My Profile Update
  const updateUserProfile = async (profileData) => {
  try {
    if (!auth.currentUser) throw new Error("No authenticated user");
    await updateProfile(auth.currentUser, profileData);
    setUser({ ...auth.currentUser, ...profileData }); // âœ… update state
  } catch (error) {
    console.error("Profile Update Error:", error.code);
    throw error;
  }
};

  // ðŸ”¹ Email/password login
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      return result.user;
    } catch (error) {
      console.error("Login Error:", error.code);
      throw error;
    }
  };

  // ðŸ”¹ Google sign-in
  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      return result.user;
    } catch (error) {
      console.error("Google Login Error:", error.code);
      throw error;
    }
  };

  // ðŸ”¹ Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error.code);
      throw error;
    }
  };

  // ðŸ”¹ Password reset
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Reset Password Error:", error.code);
      throw error;
    }
  };

  // ðŸ”¹ Keep user logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    googleLogin,
    resetPassword,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
