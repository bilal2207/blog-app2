import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import postService from '../services/postService';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getPosts().then(response => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      {posts.map(post => (
        <div key={post._id}>
          <h2><Link to={`/posts/${post._id}`}>{post.title}</Link></h2>
          <p>by {post.author.name}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
