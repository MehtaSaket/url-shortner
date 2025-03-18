// Auth.js
import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup, signOut, db, setDoc, doc } from './firebase'; // Import setDoc and doc
import './Auth.css';

function Auth() {
  const [user, setUser] = useState(null);

  const handleSignIn = async () => {
    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Store user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });

      // Set the authenticated user in state
      setUser(user);
    } catch (error) {
      console.error("Error during Google Sign-In:", error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);  // Reset the user state after sign-out
    } catch (error) {
      console.error("Error during Sign-Out:", error.message);
    }
  };

  return (
    <div className="auth-container">
      {user ? (
        <div>
          <h3>Welcome, {user.displayName}!</h3>
          <p>Email: {user.email}</p>
          <img src={user.photoURL} alt="Profile" width="100" height="100" />
          <br />
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In with Google</button>
      )}
    </div>
  );
}

export default Auth;
