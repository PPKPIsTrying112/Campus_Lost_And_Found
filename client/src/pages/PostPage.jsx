import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import CreatePost from '../components/CreatePost'
import PostsList from '../components/PostsList'
import '../App.css';

function PostPage() {
  const [posts, setPosts] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch('/api/posts');
    const data = await response.json();
    setPosts(data);
  };

  const handleLogout = () => {
    logout();           // clears user from AuthContext and localStorage
    navigate("/");      // redirect to homepage
  };

  return (
    <div className="App">
      {/* Header with user info and logout */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
        <h2>My Posts App</h2>
        {user && (
          <div>
            <span style={{ marginRight: '1rem' }}>Hello, {user.name || user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </header>

      <CreatePost onPostCreated={fetchPosts} />
      <PostsList posts={posts} />
    </div>
  );
}

export default PostPage;