import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './Home';
import GoLink from './GoLink';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Auth from './Auth.jsx';

function App() {
  const [user, setUser] = useState(null);  // State to track authenticated user
  const [loading, setLoading] = useState(true);  // State to track if checking auth is still loading

  useEffect(() => {
    const auth = getAuth();
    
    // Monitor the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false); // We are done checking the authentication state
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  return (
    <div className="app">
      <Router>
        <Routes>
        <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
          <Route exact path="/" element={user ? <Home /> : <Navigate to="/auth" />} />
          <Route path="/l/:code" element={ <GoLink />} />  
        </Routes>
      </Router>
    </div>
  );
}

export default App;
