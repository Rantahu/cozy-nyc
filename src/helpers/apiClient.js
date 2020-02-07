import axios from 'axios';
import config from 'config';
import cookie from 'js-cookie';

export default function apiClient(req) {
  const instance = axios.create({
    baseURL: __SERVER__ ? `${config.apiHost}` : '/api'
  });

  let token = cookie.get('jwt');

  instance.setJwtToken = newToken => {
    token = newToken;
  };

  instance.interceptors.request.use(
    conf => {
      if (__SERVER__) {
        if (req.header('cookie')) {
          conf.headers.Cookie = req.header('jwt');
        }
        if (req.header('Authorization')) {
          conf.headers.authorization = req.header('Authorization');
        }
      }

      if (token) {
        conf.headers.authorization = `Bearer ${token}`;
      }

      return conf;
    },
    error => Promise.reject(error)
  );

  instance.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error.response ? error.response.data : error)
  );

  return instance;
}
