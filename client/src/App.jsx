// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext.jsx";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostPage from "./pages/PostPage";
import FoundItemsPage from './pages/FoundItemsPage';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Homepage accessible to everyone */}
        <Route path="/" element={<Homepage />} />
        
        {/* Found items page */}
        <Route path="/found-items" element={<FoundItemsPage />} />
        
        {/* PostPage only for logged-in users */}
        <Route
          path="/postpage"
          element={user ? <PostPage /> : <Navigate to="/login" />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={user ? <Navigate to="/found-items" /> : <Login />}
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={user ? <Navigate to="/found-items" /> : <Signup />}
        />
      </Routes>
    </Router>
  );
}

export default App;