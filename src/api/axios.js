// axios
import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  auth: {
    username: 'artur',
    password: '7282759gGg',
  },
});

export default instance;
