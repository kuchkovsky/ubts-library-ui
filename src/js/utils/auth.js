import axios from 'axios';
import { signedOut } from '../actions/auth';

export const getToken = () => localStorage.getItem('token');

export const saveToken = token => localStorage.setItem('token', token);

export const generateAuthHeader = () => `Bearer ${getToken()}`;

export const deleteToken = () => localStorage.removeItem('token');

export const isAuthenticated = () => !!getToken();

const decodeProfile = () => {
  const token = getToken();
  if (token) {
    const encodedProfile = token.split('.')[1];
    return JSON.parse(window.atob(encodedProfile));
  }
  return null;
};

export const isAdmin = () => {
  const profile = decodeProfile();
  if (profile) {
    return profile.roles.includes('ROLE_ADMIN');
  }
  return false;
};

export const getLogin = () => {
  const profile = decodeProfile();
  if (profile) {
    return profile.sub;
  }
  return null;
};

export const setupAxiosAuthHeader = () => {
  if (isAuthenticated()) {
    axios.defaults.headers.common.Authorization = generateAuthHeader();
  }
};

export const removeAxiosAuthHeader = () => delete axios.defaults.headers.common.Authorization;

export const setupAxiosInterceptor = store => {
  axios.interceptors.response.use(undefined, error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      deleteToken();
      removeAxiosAuthHeader();
      store.dispatch(signedOut());
    }
    return Promise.reject(error);
  });
};
