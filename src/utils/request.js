import axios from "axios";

export function request(config) {
    // axios instance
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:5000/',
        timeout: 5000
    });

    // Add a request interceptor
    instance.interceptors.request.use(function (config) {
        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    instance.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });

    return instance(config);
}

