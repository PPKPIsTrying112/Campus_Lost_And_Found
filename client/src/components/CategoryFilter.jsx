import React from 'react';
import './Filters.css';  

function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="filter-group"> 
      <label>Category</label>
      <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Wallet">Wallet</option>
        <option value="Phone">Phone</option>
        <option value="Keys">Keys</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
}

export default CategoryFilter;