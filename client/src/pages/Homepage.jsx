import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
function Homepage() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  return (


    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-3xl font-bold mb-4">Lost & Found</h1>
      <p className="text-lg mb-6">Reconnect with your belongings.</p>

      {/* Buttons:
      <button
            className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded border-2 border-green-800"
            style={{ borderColor: '#646cffaa' }}
            onClick={() => setMessage('You clicked Search for Lost Item!')}
        >
          Search for Lost Item
        </button>

        <button
            className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded border-2 border-green-800"
            style={{ borderColor: '#646cffaa' }}
            onClick={() => setMessage('You clicked Post a Found Item!')}
        >
          Post a Found Item
        </button> 
      
      */}

      <div className="flex gap-4">
        

        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/signup")}>Sign Up</button>


      </div>

      {/* Inserted Display message until we implement navigation*/}
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>

  );
}

export default Homepage;
