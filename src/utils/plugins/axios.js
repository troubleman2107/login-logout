import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'http://streaming.nexlesoft.com:4000/api/auth',
});


axiosConfig.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response && response.status !== 200) {
            return Promise.reject(response);
        }

        return Promise.reject(response);
    },
);

export default axiosConfig;
