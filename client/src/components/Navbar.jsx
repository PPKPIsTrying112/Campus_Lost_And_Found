import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  // Get logged-in user info and logout function from AuthContext
  const { user, logout } = useAuth();
  
  // useNavigate: lets us redirect to different pages programmatically
  const navigate = useNavigate();
  
  // useLocation: tells us the current URL path (e.g., "/found-items")
  // We use this to highlight which nav link is currently active
  const location = useLocation();

  // Handle logout: clear user data then redirect to homepage
  const handleLogout = () => {
    logout();       // Clears user from context and localStorage
    navigate('/');  // Redirect to homepage
  };

  // Helper function to check if a nav link matches current page
  // Returns true if we're on that page, false otherwise
  // Used to add 'active' class for styling the current page link
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      {/* LEFT SECTION: Logo/Brand */}
      {/* Clicking logo takes you to homepage */}
      <div className="navbar-left">
        <h1 className="navbar-logo" onClick={() => navigate('/')}>
          🔍 Campus Lost & Found
        </h1>
      </div>

      {/* CENTER SECTION: Navigation Links */}
      <div className="navbar-center">
        {/* Found Items - visible to everyone */}
        {/* isActive adds 'active' class if we're on /found-items */}
        <button 
          className={`nav-link ${isActive('/found-items') ? 'active' : ''}`}
          onClick={() => navigate('/found-items')}
        >
          Found Items
        </button>

        {/* These links only show if user is logged in */}
        {/* The && operator means: if user exists, render what's after */}
        {user && (
          <>
            {/* My Claims - where user sees claims they submitted */}
            <button 
              className={`nav-link ${isActive('/my-claims') ? 'active' : ''}`}
              onClick={() => navigate('/my-claims')}
            >
              My Claims
            </button>

            {/* Incoming Claims - where user sees claims on their posts */}
            <button 
              className={`nav-link ${isActive('/incoming-claims') ? 'active' : ''}`}
              onClick={() => navigate('/incoming-claims')}
            >
              Incoming Claims
            </button>
          </>
        )}

        {/* Archive - visible to everyone */}
        <button 
          className={`nav-link ${isActive('/archive') ? 'active' : ''}`}
          onClick={() => navigate('/archive')}
        >
          Archive
        </button>
      </div>

      {/* RIGHT SECTION: User actions */}
      <div className="navbar-right">
        {/* Conditional rendering based on login status */}
        {/* If logged in: show welcome message + post button + logout */}
        {/* If not logged in: show login button */}
        {user ? (
          <>
            { /* Profile Picture - quick access to your profile */ }
            <div
              onClick={() => navigate(`/profile/${user.id}`)}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                overflow: "hidden",
                cursor: "pointer",
                border: "2px solid #ccc",
              }}
            >
              <img
                src={user.profileImage || defaultProfileImage}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            
            {/* Post Item button - quick access to create new found item */}
            <button 
              className="nav-btn post-btn" 
              onClick={() => navigate('/create-found-item')}
            >
              + Post Item
            </button>
            
            {/* Logout button */}
            <button 
              className="nav-btn logout-btn" 
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Not logged in - show Login and Sign up buttons */}
            <button 
              className="nav-btn login-btn" 
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button 
              className="nav-btn signup-btn" 
              onClick={() => navigate('/signup')}
            >
              Sign-Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;