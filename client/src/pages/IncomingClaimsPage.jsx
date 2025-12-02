import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './IncomingClaimsPage.css';

function IncomingClaimsPage() {
  // Get logged-in user (the item owner)
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Store all claims on items this user posted
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch claims when component loads
  useEffect(() => {
    const fetchIncomingClaims = async () => {
      if (!user) return;

      try {
        // This calls: GET /api/claims/incoming/:userId
        // Backend finds all items WHERE found_items.user_id = user.id
        // Then returns all claims on those items
        const response = await fetch(`/api/claims/incoming/${user.id}`);
        const data = await response.json();
        setClaims(data);
      } catch (error) {
        console.error('Error fetching incoming claims:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncomingClaims();
  }, [user]);

  // When owner clicks "Approve"
  const handleApprove = async (claimId) => {
    try {
      // Send PUT request to update claim status in database
      await fetch(`/api/claims/${claimId}/approve`, { method: 'PUT' });
      
      // Update local state so UI reflects change immediately
      // without needing to refetch from database
      setClaims(claims.map(claim =>
        claim.id === claimId ? { ...claim, status: 'approved' } : claim
      ));
    } catch (error) {
      console.error('Error approving claim:', error);
    }
  };

  // When owner clicks "Deny"
  const handleDeny = async (claimId) => {
    try {
      // Send PUT request to update claim status in database
      await fetch(`/api/claims/${claimId}/deny`, { method: 'PUT' });
      
      // Update local state so UI reflects change immediately
      setClaims(claims.map(claim =>
        claim.id === claimId ? { ...claim, status: 'denied' } : claim
      ));
    } catch (error) {
      console.error('Error denying claim:', error);
    }
  };

  // Helper function to render status badge
  // Only shows badge for approved/denied (not pending)
  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="status-badge approved">Approved ✓</span>;
      case 'denied':
        return <span className="status-badge denied">Denied ✗</span>;
      default:
        return null; // No badge for pending
    }
  };

  // Guard: If not logged in, show message
  if (!user) {
    return <div className="incoming-claims-page">Please login to view incoming claims.</div>;
  }

  // Guard: Show loading while fetching
  if (loading) {
    return <div className="incoming-claims-page">Loading...</div>;
  }

  return (
    <div className="incoming-claims-page">

      <h1>Incoming Claims</h1>
      <p className="page-subtitle">Review claims on items you've found</p>

      {/* If no claims exist, show empty state */}
      {claims.length === 0 ? (
        <div className="empty-state">
          <p>No one has claimed your items yet.</p>
          <button onClick={() => navigate('/found-items')}>Browse Found Items</button>
        </div>
      ) : (
        // Loop through each claim and render a card
        <div className="claims-list">
          {claims.map((claim) => (
            <div key={claim.id} className="incoming-claim-card">
              
              {/* Header: Shows item photo, title, claimer info, and status badge */}
              <div className="claim-header">
                <div className="claim-item-info">
                  {claim.photo && (
                    <img
                      src={`/uploads/found-items/${claim.photo}`}
                      alt={claim.itemTitle}
                      className="claim-thumbnail"
                    />
                  )}
                  <div>
                    <h3>{claim.itemTitle}</h3>
                    {/* Show who is trying to claim this item */}
                    <p className="claimer-info">
                      Claimed by <strong>{claim.claimerName}</strong> ({claim.claimerEmail})
                    </p>
                    <p className="claim-date">
                      {new Date(claim.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {/* Only show badge if already approved/denied */}
                {claim.status !== 'pending' && getStatusBadge(claim.status)}
              </div>

              {/* Answers Section: Shows the security questions and claimer's answers */}
              {/* This helps owner verify if claimer is the real owner */}
              <div className="answers-section">
                <h4>Their Answers:</h4>
                
                {/* Question 1 will always exist */}
                <div className="answer-item">
                  <span className="question">Q1: {claim.securityQuestion1}</span>
                  <span className="answer">"{claim.answer1}"</span>
                </div>
                
                {/* Question 2 will only show if it exists */}
                {claim.securityQuestion2 && claim.answer2 && (
                  <div className="answer-item">
                    <span className="question">Q2: {claim.securityQuestion2}</span>
                    <span className="answer">"{claim.answer2}"</span>
                  </div>
                )}
                
                {/* Question 3 will also only show if it exists */}
                {claim.securityQuestion3 && claim.answer3 && (
                  <div className="answer-item">
                    <span className="question">Q3: {claim.securityQuestion3}</span>
                    <span className="answer">"{claim.answer3}"</span>
                  </div>
                )}
              </div>

              {/* Appove/Deny will only show if claim is still pending */}
              {/* Once approved/denied, the buttons will disappear */}
              {claim.status === 'pending' && (
                <div className="action-buttons">
                  <button className="deny-btn" onClick={() => handleDeny(claim.id)}>
                    Deny
                  </button>
                  <button className="approve-btn" onClick={() => handleApprove(claim.id)}>
                    Approve
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default IncomingClaimsPage;