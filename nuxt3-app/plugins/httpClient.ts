import { defineNuxtPlugin } from '#app';
import axios from 'axios';

// Create axios client with options
const createClient = () =>
  axios.create({
    // baseURL: process.env.VUE_APP_ROOT_API,
    baseURL: 'http://localhost:8000',
    timeout: 5000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export default defineNuxtPlugin(() => {
  return {
    provide: {
      httpClient: createClient(),
    },
  };
});
