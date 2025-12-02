import React, { useState, useEffect } from 'react';
import FoundItemsList from '../components/FoundItemsList'
import CategoryFilter from '../components/CategoryFilter'
import DateRangeFilter from '../components/DateRangeFilter'

import './FoundItemsPage.css';

function FoundItemsPage() {
  const [foundItems, setFoundItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');

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

  // Helper function to calculate date range based on selection
  const getDateRange = (range) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let startDate = new Date();

    switch(range) {
      case 'today':
        return { start: today, end: new Date(today.getTime() + 24 * 60 * 60 * 1000) };
      case 'week':
        startDate.setDate(today.getDate() - 7);
        return { start: startDate, end: null };
      case 'month':
        startDate.setMonth(today.getMonth() - 1);
        return { start: startDate, end: null };
      case 'year':
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
      const [year, month, day] = item.dateFound.split('-');
      const itemDate = new Date(year, month - 1, day);
      
      if (dateRange.end) {
        return itemDate >= dateRange.start && itemDate < dateRange.end;
      } else {
        return itemDate >= dateRange.start;
      }
    });
  }

  return (
    <div className="found-items-page">
      {/* Filters - side by side */}
      <div className="filters-container">
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <DateRangeFilter 
          selectedRange={selectedDateRange}
          onRangeChange={setSelectedDateRange}
        />
      </div>

      {/* Display filtered items as list */}
      <FoundItemsList foundItems={filteredItems} />
    </div>
  );
}

export default FoundItemsPage;