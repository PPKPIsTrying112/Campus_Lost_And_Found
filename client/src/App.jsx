// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext.jsx";

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostPage from "./pages/PostPage";
import ItemDetailPage from './pages/ItemDetailPage';
import FoundItemsPage from './pages/FoundItemsPage';
import CreateFoundItemPage from './pages/CreateFoundItemPage';
import Profile from "./pages/ProfilePage";
import "./App.css";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Homepage accessible to everyone */}
          <Route path="/" element={<Homepage />} />
          
          { /* Detailed Individual Item Page where user can navigate to claim */}
          <Route path="/found-items/:id" element={<ItemDetailPage />} />

          {/* Found items list page */}
          <Route path="/found-items" element={<FoundItemsPage />} />
          
          {/* Create found item page - only for logged-in users */}
          <Route
            path="/create-found-item"
            element={user ? <CreateFoundItemPage /> : <Navigate to="/login" />}
          />
          
          {/* PostPage only for logged-in users */}
          <Route
            path="/postpage"
            element={user ? <PostPage /> : <Navigate to="/login" />}
          />

          {/* Login */}
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />

          {/* Signup */}
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;