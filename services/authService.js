import axios from 'axios';

const service = axios.create({
  // baseURL: process.env.urlDev + '/api/v1/auth',
  baseURL: process.env.apiUrl + '/auth',
  withCredentials: true
});

export const signup = (name, email, password) => {
  return service
    .post('/signup', { name, email, password })
    .then((response) => response.data);
};

export const login = (email, password) => {
  return service
    .post('/login', { email, password })
    .then((response) => {
      response.data
      console.log(response.data)
    })
    .catch( error => {
      console.log(error)
    });
};

export const loggedin = () => {
  return service.get('/loggedin')
  .then((response) => response.data);
};

export const logout = () => {
  return service.get('/logout')
  .then((response) => response.data);
};
