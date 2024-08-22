import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const register = async (name, email, password) => {
  return await axios.post(`${API_URL}register`, { name, email, password });
};

const login = async (email, password) => {
  return await axios.post(`${API_URL}login`, { email, password })
    .then(response => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = async () => {
  await localStorage.removeItem('user');
};


const authService = {
  register,
  login,
  logout,
};

export default authService;
