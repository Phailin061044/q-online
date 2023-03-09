import axios from 'axios';

export const baseURL = 'http://localhost:8000/';

export const InstanceFormBody = axios.create({
  baseURL: baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

export const InstanceFormData = axios.create({
  baseURL: baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
