import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  // recomment to send post/patch + use brouser extention to off CORS
  // headers: {
  //   Authorization: 'Basic ZHluaWxhQHlhbmRleC5ydTpHaW8wTnVVJSkw',
  // },
});

export default instance;
