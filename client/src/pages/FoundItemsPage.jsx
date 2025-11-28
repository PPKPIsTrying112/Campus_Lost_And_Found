import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import FoundItemsList from '../components/FoundItemsList'
import CategoryFilter from '../components/CategoryFilter'
import DateRangeFilter from '../components/DateRangeFilter'
import '../App.css';


function FoundItemsPage() {
  const [foundItems, setFoundItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch all found items when page loads
  useEffect(() => {
    fetchFoundItems();
  }, []);

  // Get found items from backend
  const fetchFoundItems = async () => {
    const response = await fetch('/api/found-items');
    const data = await response.json();
    setFoundItems(data);
  };

  // Handle logout
  const handleLogout = () => {
    logout();           // clears user from AuthContext and localStorage
    navigate("/");      // redirect to homepage
  };

  // Helper function to calculate date range based on selection
  const getDateRange = (range) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let startDate = new Date();

    switch(range) {
      case 'today':
        // For today: items from 00:00 to 23:59
        return { start: today, end: new Date(today.getTime() + 24 * 60 * 60 * 1000) };
      case 'week':
        // Items from 7 days ago until now
        startDate.setDate(today.getDate() - 7);
        return { start: startDate, end: null };
      case 'month':
        // Items from 1 month ago until now
        startDate.setMonth(today.getMonth() - 1);
        return { start: startDate, end: null };
      case 'year':
        // Items from 1 year ago until now
        startDate.setFullYear(today.getFullYear() - 1);
        return { start: startDate, end: null };
      default:
        return null;
    }
  };

  // Start with all items
  let filteredItems = foundItems;

  // Filter by category if selected
  if (selectedCategory) {
    filteredItems = filteredItems.filter(item => item.category === selectedCategory);
  }

  // Filter by date range if selected
  if (selectedDateRange) {
    const dateRange = getDateRange(selectedDateRange);
    filteredItems = filteredItems.filter(item => {
      // Parse the date string (format: "2025-11-20")
      const [year, month, day] = item.dateFound.split('-');
      const itemDate = new Date(year, month - 1, day); // month is 0-indexed in JS
      
      // Check if item date is within the range
      if (dateRange.end) {
        // If there's an end date (like for "today"), check between start and end
        return itemDate >= dateRange.start && itemDate < dateRange.end;
      } else {
        // Otherwise just check if date is >= start date
        return itemDate >= dateRange.start;
      }
    });
  }

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

         {/* Navigation button to create found item */}
        <button 
          onClick={() => navigate("/create-found-item")}
          style={{ marginLeft: '1rem'}}
        >
          Post Found Item
        </button>

      </header>
      
     

      {/* Filters */}
      <div className="filters-container">
        {/* Category filter dropdown */}
        <div className="filter-group">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
        
        <div className="filter-group">
          {/* Date range filter dropdown */}
          <DateRangeFilter 
            selectedRange={selectedDateRange}
            onRangeChange={setSelectedDateRange}
          />
        </div>
      </div>
      {/* Display filtered items as list */}
      <FoundItemsList foundItems={filteredItems} />
    </div>
  );
}

export default FoundItemsPage;