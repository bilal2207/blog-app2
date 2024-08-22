import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import postService from '../services/postService';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    postService.getPostById(id).then(response => {
      setPost(response.data);
    });
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>by {post.author.name}</p>
      <Link to={`/edit/${post._id}`}>Edit Post</Link>
    </div>
  );
};

export default Post;
