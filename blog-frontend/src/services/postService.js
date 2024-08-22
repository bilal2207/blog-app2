import axios from 'axios';

const API_URL = 'http://localhost:5000/api/posts/';

const getPosts = () => {
  return axios.get(API_URL);
};

const getPostById = (id) => {
  return axios.get(`${API_URL}${id}`);
};

const createPost = (title, content) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return axios.post(API_URL, { title, content }, {
    headers: { 'x-auth-token': token }
  });
};

const updatePost = (id, title, content) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return axios.put(`${API_URL}${id}`, { title, content }, {
    headers: { 'x-auth-token': token }
  });
};

const deletePost = (id) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return axios.delete(`${API_URL}${id}`, {
    headers: { 'x-auth-token': token }
  });
};

// Assign the object to a variable
const postService = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};


export default postService;

