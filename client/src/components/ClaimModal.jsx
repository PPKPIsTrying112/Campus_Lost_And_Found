import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './ClaimModal.css';

function ClaimModal({ item, isOpen, onClose }) {
  const { user } = useAuth();
  
  // State for each answer
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Don't render anything if modal is closed
  if (!isOpen) return null;

  const handleSubmit = async () => {
    // Must answer to every existing question..cannot leave blank
    if (!answer1.trim()) {
        setError('Please answer question 1');
        return;
    }
    if (item.securityQuestion2 && !answer2.trim()) {
        setError('Please answer question 2');
        return;
    }
    if (item.securityQuestion3 && !answer3.trim()) {
        setError('Please answer question 3');
        return;
    }

    try {
      const response = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item_id: item.id,
          claimer_id: user.id,
          answer1,
          answer2,
          answer3
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      // Success - show confirmation
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit claim');
    }
  };

  // Reset and close modal
  const handleClose = () => {
    setAnswer1('');
    setAnswer2('');
    setAnswer3('');
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {!submitted ? (
          <>
            {/* Header */}
            <div className="modal-header">
              <h2>Claim: {item.itemTitle}</h2>
              <button className="close-btn" onClick={handleClose}>✕</button>
            </div>

            {/* Instructions */}
            <p className="modal-subtitle">
              Answer the security questions to verify ownership. The finder will review your answers.
            </p>

            {/* Error message */}
            {error && <p className="modal-error">{error}</p>}

            {/* Questions */}
            {/* At least one question will exist */}
            <div className="question-group">
              <label>Q1: {item.securityQuestion1}</label>
              <textarea
                value={answer1}
                onChange={(e) => setAnswer1(e.target.value)}
                placeholder="Your answer..."
              />
            </div>

            {item.securityQuestion2 && (
              <div className="question-group">
                <label>Q2: {item.securityQuestion2}</label>
                <textarea
                  value={answer2}
                  onChange={(e) => setAnswer2(e.target.value)}
                  placeholder="Your answer..."
                />
              </div>
            )}

            {item.securityQuestion3 && (
              <div className="question-group">
                <label>Q3: {item.securityQuestion3}</label>
                <textarea
                  value={answer3}
                  onChange={(e) => setAnswer3(e.target.value)}
                  placeholder="Your answer..."
                />
              </div>
            )}

            {/* Buttons: Cancel and Submit */}
            <div className="modal-actions">
              <button className="cancel-btn" onClick={handleClose}>Cancel</button>
              <button className="submit-btn" onClick={handleSubmit}>Submit Claim</button>
            </div>
          </>
        ) : (
          /* Dispaly Success Message */
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Claim Submitted!</h2>
            <p>Your claim has been sent to the finder. You'll see the status in "My Claims".</p>
            <button className="submit-btn" onClick={handleClose}>Done</button>
          </div>
        )}

      </div>
    </div>
  );
}

export default ClaimModal;