import { defineNuxtPlugin } from '#app';
import axios  from 'axios';

export default defineNuxtPlugin(nuxtApp => {
    const createClient = () => axios.create({
        // baseURL: process.env.VUE_APP_ROOT_API,
        baseURL: 'http://localhost:8000',
        timeout: 5000,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return { provide: { httpClient: createClient() } };
})
