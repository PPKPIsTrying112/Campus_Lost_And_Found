// components/FoundItemsList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FoundItemsList.css';


function FoundItemsList({ foundItems }) {
  //For navigation to "Individual Item" page 
  const navigate = useNavigate(); 

  const handleCardClick = (itemId) => {
    navigate(`/found-items/${itemId}`)
  }

  // Empty state if there are no found items yet
    if (!foundItems || foundItems.length === 0) {
      return (
        <div className="items-container">
          <h2>All Found Items</h2>
          <div className="empty-state">
            <p>No items found yet.</p>
            <p>Be the first to post a found item!</p>
          </div>
        </div>
      );
    }

  return (
    
    <div className="items-container">
      <h2>All Found Items</h2>
      {/* {foundItems.map((item) => (
        <div key={item.id} className="item">
          <h3>{item.itemTitle}</h3>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Location:</strong> {item.locationFound}</p>
          <p><strong>Date Found:</strong> {item.dateFound}</p>
          <p><strong>Time Found:</strong> {item.timeFound}</p>
          {item.photo && <img src={`/uploads/found-items/${item.photo}`} alt={item.itemTitle} />}
          <p><strong>Security Questions:</strong></p>
          <p>Q1: {item.securityQuestion1}</p>
          <p>Q2: {item.securityQuestion2}</p>
          <p>Q3: {item.securityQuestion3}</p>
          <small>{new Date(item.created_at).toLocaleString()}</small>
        </div>
      ))} */}


      {foundItems.map((item) => (
        <div key={item.id} className="item-card"
          onClick={()=> handleCardClick(item.id)} //Navigation in action 
        >
            {/* Image section */}
            {item.photo && <img src={`/uploads/found-items/${item.photo}`} alt={item.itemTitle} className="item-image" />}
            
            {/* Title */}
            <h3 className="item-title">{item.itemTitle}</h3>
            
            {/* Description */}
            <p className="item-description">{item.description}</p>
            
            {/* Description */}
            <p className="item-category">{item.category}</p>

            {/* Location */}
            <p className="item-location">📍 {item.locationFound}</p>
            
            {/* Time posted */}
            <p className="item-time">⏰ {new Date(item.created_at).toLocaleString()}</p>
        </div>
        ))}
    </div>
  );
}

export default FoundItemsList;