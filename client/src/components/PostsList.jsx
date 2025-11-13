// components/PostsList.jsx
import React from 'react';

function PostsList({ posts }) {
  return (
    <div className="posts-container">
      <h2>All Posts</h2>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>{new Date(post.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default PostsList;