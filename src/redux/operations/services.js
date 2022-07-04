import axios from 'axios';
import qs from 'qs';
import config from '../../config';

const { api } = config;

export default async function makeRequest({ path, resourceType, perPage, offset }) {
  const token = localStorage.getItem("token");
  const res = await axios.get(
    `${api.baseUrl}/browse/${path}?locale=en_US&limit=${perPage}&offset=${offset}`,
    {  headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data[resourceType].items;
}

export  async function getToken() {
  const response = await axios.post(
    api.authUrl,
    qs.stringify({ 'grant_type': 'client_credentials' }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${window.btoa(`${api.clientId}:${api.clientSecret}`)}`
      }
    }
  );
 
  const { data: { access_token: token, expires_in: expiresIn } } = response;

  if (token) {
    localStorage.setItem('token', token)
    localStorage.setItem('expiresIn', expiresIn)
    return token;
  }
  return ''
}


