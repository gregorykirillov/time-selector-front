import axios from 'axios';

import { API_URL } from '@/settings';
import { LocalStorage } from '@/services';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${LocalStorage.get('token')}`;

    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status == 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const reponse = await axios.get(`${API_URL}/refresh`, {
                    withCredentials: true,
                });
                LocalStorage.set('token', reponse.data.accessToken);

                return $api.request(originalRequest);
            } catch (e) {
                alert('Для выполнения необходимо авторизоваться');
            }
        }

        throw error;
    },
);

export default $api;
