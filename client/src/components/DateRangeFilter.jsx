import React from 'react';

function DateRangeFilter({ selectedRange, onRangeChange }) {
  return (
    <div className="date-range-filter">
      <label>Date Range</label>
      <select value={selectedRange} onChange={(e) => onRangeChange(e.target.value)}>
        <option value="">All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
      </select>
    </div>
  );
}

export default DateRangeFilter;