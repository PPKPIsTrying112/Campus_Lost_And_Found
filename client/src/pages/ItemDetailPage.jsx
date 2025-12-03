import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ItemDetailPage.css';

import ClaimModal from '../components/ClaimModal';
import { useAuth } from '../contexts/AuthContext';

function ItemDetailPage() {
  const { id } = useParams(); //Extract id from the url 
  const navigate = useNavigate(); //For back button 

  const [item, setItem] = useState(null); //Store data for the item 
  const [loading, setLoading] = useState(true); //Trackin' loading state
  
  const { user } = useAuth();
  const [showClaimModal, setShowClaimModal] = useState(false);

  // Stuff to run when component is rendering 
    // We will fetch the specific item using extracted id 
  useEffect(() => {
    const fetchItem = async() =>{
      try{
        const response = await fetch(`/api/found-items/${id}`)
        const data = await response.json();
        setItem(data);
      } catch(error){
        console.error('Error getting item:', error);
      } finally {
        setLoading(false); //Change Loading state to False 
      }
    }

    fetchItem(); 

  }, [id]); //To Rerun if id changes


  //Show loading while fetching
  if (loading) {
    return <div className="detail-loading">Loading...</div>;
  }

  //Show error if item is not found 
  if (!item) {
    return <div className="detail-error">Item not found</div>;
  }

  // Check if current user is the owner
    // isOwner will only after after confirming that item exists 
  const isOwner = user && user.id === item.user_id;

   return (
      <div className="detail-page">
        <button className="back-button" onClick={() => navigate('/found-items')}>
          ← Back to Home
        </button>

        <div className="detail-container">
          {/* Left: Item Info */}
          <div className="detail-main">
            <div className="detail-card">
              {item.photo && (
                <img 
                  src={`/uploads/found-items/${item.photo}`} 
                  alt={item.itemTitle} 
                  className="detail-image"
                />
              )}

              <div className="detail-content">
                <h1 className="detail-title">{item.itemTitle}</h1>

                {/* Description */}
                <div className="detail-section">
                  <h2>Description</h2>
                  <p>{item.description}</p>
                </div>

                {/* Location & Time - single row */}
                <div className="detail-info-row">
                  <div className="detail-info">
                    <span className="info-label">📍 Location</span>
                    <span className="info-value">{item.locationFound}</span>
                  </div>
                  <div className="detail-info">
                    <span className="info-label">📅 Date Found</span>
                    <span className="info-value">{item.dateFound} {item.timeFound && `at ${item.timeFound}`}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="detail-sidebar">
            {/* Found By */}
            <div className="sidebar-card">
              <h3>Found By</h3>
              {item.user_id ? (
                <div
                  className="finder-info"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/profile/${item.user_id}`)}
                >
                  <div className="finder-avatar">
                    {item.userProfilePic ? (
                      <img
                        src={item.userProfilePic}  
                        alt="Profile"
                        className="finder-avatar-img"
                      />
                    ) : (
                      <span>{item.userName ? item.userName[0].toUpperCase() : 'U'}</span>
                    )}
                  </div>

                  <div>
                    <p className="finder-name">{item.userName || 'User'}</p>
                  </div>
                </div>
              ) : (
                <div className="finder-info">
                  <div className="finder-avatar">U</div>
                  <div>
                    <p className="finder-name">User</p>
                  </div>
                </div>
              )}
            </div>

            {/* Claim Card */}
            <div className="sidebar-card">
              <h3>Is This Yours?</h3>
              <p className="claim-description">
                To claim this item, you'll need to answer some verification questions.
              </p>
              
              {!user ? (
                <button className="claim-button disabled" disabled>
                  Login to Claim
                </button>
              ) : isOwner ? (
                <button className="claim-button disabled" disabled>
                  You posted this item
                </button>
              ) : (
                <button className="claim-button" onClick={() => setShowClaimModal(true)}>
                  Claim This Item
                </button>
              )}
            </div>

            {/* Claim Modal where claimer answers security questions and send claim request */}
            <ClaimModal
              item={item}
              isOpen={showClaimModal}
              onClose={() => setShowClaimModal(false)}
            />
          </div>
        </div>
      </div>
    );
}

export default ItemDetailPage;