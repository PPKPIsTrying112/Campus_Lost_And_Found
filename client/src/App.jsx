import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostPage from "./pages/PostPage";
import Homepage from './pages/Homepage';


function App() {
  const [user, setUser] = useState(null); // track logged-in user

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <Routes>
        {/* Homepage is accessible to everyone */}
        <Route path="/" element={<Homepage />} />
        
        {/*PostPage, only if logged in */}
        <Route
          path="/postpage"
          element={user ? <PostPage user={user} /> : <Navigate to="/login" />}
        />

        {/* Login page */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
        />

        {/* Signup page */}
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup onLogin={handleLogin} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
