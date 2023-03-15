import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  headers: {
    Authorization: 'Basic ZHluaWxhQHlhbmRleC5ydTpHaW8wTnVVJSkw',
  },
});

export default instance;
