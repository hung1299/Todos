import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://621efa81849220b1fca663b3.mockapi.io/todo',
  headers: {
    'content-type': 'application/json',
  },
});

export default axiosClient;
