import React, { useState, useEffect } from 'react';
import CreatePost from '../components/CreatePost'
import PostsList from '../components/PostsList'
import '../App.css';

function PostPage() {
  const [posts, setPosts] = useState([]);

  // useEffect(): When PostPage appears on screen, run this
  useEffect(() => {
    fetchPosts();
  }, []); // [] run only once when component loads 

  const fetchPosts = async () => {
    // Gettin' the posts 
    const response = await fetch('/api/posts');
    const data = await response.json();
    setPosts(data);
  };

  return (
    <div className="App">
      <h1>My Posts App</h1>
      <CreatePost onPostCreated={fetchPosts} />
      <PostsList posts={posts} />
    </div>
  );
}

export default PostPage;