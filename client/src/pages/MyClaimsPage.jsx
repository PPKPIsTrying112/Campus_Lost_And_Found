import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './MyClaimsPage.css';

function MyClaimsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyClaims = async () => {
      if (!user) return;
      
      try {
        const response = await fetch(`/api/claims/my-claims/${user.id}`);
        const data = await response.json();
        setClaims(data);
      } catch (error) {
        console.error('Error fetching claims:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyClaims();
  }, [user]);

  // Helper function for status badge styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved':
        return { background: '#e8f5e9', color: '#2e7d32' };
      case 'denied':
        return { background: '#ffebee', color: '#c62828' };
      default:
        return { background: '#fff3e0', color: '#e65100' };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Approved';
      case 'denied': return 'Denied';
      default: return 'Pending';
    }
  };

  if (!user) {
    return <div className="claims-page">Please login to view your claims.</div>;
  }

  if (loading) {
    return <div className="claims-page">Loading...</div>;
  }

  return (
    <div className="claims-page">
    
      <h1>My Claims</h1>
      <p className="page-subtitle">Track the status of items you've claimed</p>

      {claims.length === 0 ? (
        <div className="empty-state">
          <p>You haven't submitted any claims yet.</p>
          <button onClick={() => navigate('/found-items')}>Browse Found Items</button>
        </div>
      ) : (
        <div className="claims-list">
          {claims.map((claim) => (
            <div key={claim.id} className="claim-card">
              <div className="claim-info">
                {claim.photo && (
                  <img 
                    src={`/uploads/found-items/${claim.photo}`} 
                    alt={claim.itemTitle}
                    className="claim-thumbnail"
                  />
                )}
                <div>
                  <h3>{claim.itemTitle}</h3>
                  <p className="claim-date">
                    Claimed on {new Date(claim.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div 
                className="status-badge"
                style={getStatusStyle(claim.status)}
              >
                {getStatusText(claim.status)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyClaimsPage;