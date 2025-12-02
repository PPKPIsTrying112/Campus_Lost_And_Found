import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ArchivePage.css';

function ArchivePage() {
  const navigate = useNavigate();
  const [claimedItems, setClaimedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch claimed items when page loads
  useEffect(() => {
    const fetchClaimedItems = async () => {
      try {
        const response = await fetch('/api/found-items/archive');
        const data = await response.json();
        setClaimedItems(data);
      } catch (error) {
        console.error('Error fetching archived items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClaimedItems();
  }, []);

  if (loading) {
    return <div className="archive-page">Loading...</div>;
  }

  return (
    <div className="archive-page">

      <h1>Archive</h1>
      <p className="page-subtitle">Items that have been successfully claimed</p>

      {claimedItems.length === 0 ? (
        <div className="empty-state">
          <p>No items have been claimed yet.</p>
        </div>
      ) : (
        <div className="archive-grid">
          {claimedItems.map((item) => (
            <div key={item.id} className="archive-card">
              {item.photo && (
                <img
                  src={`/uploads/found-items/${item.photo}`}
                  alt={item.itemTitle}
                  className="archive-image"
                />
              )}
              <div className="archive-content">
                <h3>{item.itemTitle}</h3>
                <p className="archive-description">{item.description}</p>
                <div className="archive-meta">
                  <span>📍 {item.locationFound}</span>
                  <span>📅 {item.dateFound}</span>
                </div>
                <div className="archive-footer">
                  <span className="found-by">Found by: {item.userName || 'Unknown'}</span>
                  <span className="claimed-badge">Claimed ✓</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArchivePage;