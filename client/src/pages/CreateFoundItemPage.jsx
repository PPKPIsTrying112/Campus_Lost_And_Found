import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import CreateFoundItem from '../components/CreateFoundItem'
import '../App.css';

function CreateFoundItemPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // After item created, redirect back to list
  const handleItemCreated = () => {
    navigate("/found-items");
  };

  return (
    <div className="App">
      {/* Header with user info and logout */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
        {user && (
          <div>
            <span style={{ marginRight: '1rem' }}>Hello, {user.name || user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        {/* Navigation button back to list */}
        <button 
          onClick={() => navigate("/found-items")} 
          style={{ marginLeft: '1rem'}}
        >
          View All Items
        </button>
      </header>
      
      {/* Use existing CreateFoundItem component */}
      <CreateFoundItem onItemCreated={handleItemCreated} />
      
      
    </div>
  );
}

export default CreateFoundItemPage;