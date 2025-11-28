// components/CreateFoundItem.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './CreateFoundItem.css'; 

function CreateFoundItem({ onItemCreated }) {
    const { user } = useAuth(); //Gettin' logged in user 

    const [itemTitle, setItemTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [locationFound, setLocationFound] = useState('');
    const [dateFound, setDateFound] = useState('');
    const [timeFound, setTimeFound] = useState('');
    const [photo, setPhoto] = useState(null);
    const [securityQuestion1, setSecurityQuestion1] = useState('');
    const [securityQuestion2, setSecurityQuestion2] = useState('');
    const [securityQuestion3, setSecurityQuestion3] = useState('');

    const handleSubmit = async (e) => {
    console.log('User object:', user);    
    console.log('User ID:', user?.id); 
    console.log('Form submitted!'); 
    e.preventDefault();
    
    // Create FormData (special format for files)
    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('itemTitle', itemTitle);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('locationFound', locationFound);
    formData.append('dateFound', dateFound);
    formData.append('timeFound', timeFound);
    formData.append('photo', photo);  // The actual file
    formData.append('securityQuestion1', securityQuestion1);
    formData.append('securityQuestion2', securityQuestion2);
    formData.append('securityQuestion3', securityQuestion3);

    console.log('About to fetch...', formData);
    // Send to backend
    await fetch('/api/found-items', {
        method: 'POST',
        body: formData  // NOT JSON.stringify!
        // NO Content-Type header! FormData sets it automatically
    });
    console.log('Fetch completed!');
        // Clearing the form 
    onItemCreated();
    };

  return (
    <div className="form-container">
        <h2>Post a Found Item</h2>
        <form onSubmit={handleSubmit}>
        
        <div className="form-group">
            <label>Item Title</label>
            <input 
            type="text" 
            placeholder="e.g. Black Leather Wallet" 
            value={itemTitle} 
            onChange={(e) => setItemTitle(e.target.value)} 
            required
            />
        </div>

        <div className="form-group">
            <label>Description</label>
            <textarea 
            placeholder="Provide a detailed description..." 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required
            />
        </div>

        <div className="form-group">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select a category</option>
            <option value="Wallet">Wallet</option>
            <option value="Phone">Phone</option>
            <option value="Keys">Keys</option>
            <option value="Other">Other</option>
            </select>
        </div>

        <div className="form-group">
            <label>Location Found</label>
            <input
            type="text"
            placeholder="e.g. Powell Library"
            value={locationFound}
            onChange={(e) => setLocationFound(e.target.value)}
            required
            />
        </div>

        <div className="date-time-row">
            <div className="field-group">
            <label>Date Found</label>
            <input
                type="date"
                value={dateFound}
                onChange={(e) => setDateFound(e.target.value)}
                required
            />
            </div>
            <div className="field-group">
            <label>Time Found</label>
            <input
                type="time"
                value={timeFound}
                onChange={(e) => setTimeFound(e.target.value)}
            />
            </div>
        </div>

        <div className="form-group">
            <label>Upload Image</label>
            <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            accept="image/*"
            required
            />
        </div>

        <div className="form-group">
            <label>Security Questions</label>
            <div className="security-questions">
            <input
                type="text"
                placeholder="Question 1 (required)"
                value={securityQuestion1}
                onChange={(e) => setSecurityQuestion1(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Question 2 (optional)"
                value={securityQuestion2}
                onChange={(e) => setSecurityQuestion2(e.target.value)}
            />
            <input
                type="text"
                placeholder="Question 3 (optional)"
                value={securityQuestion3}
                onChange={(e) => setSecurityQuestion3(e.target.value)}
            />
            </div>
        </div>

        <button type="submit">Post Item</button>
        </form>
    </div>
    );
}

export default CreateFoundItem;