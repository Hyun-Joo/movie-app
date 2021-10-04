import axios from 'axios';

const axiosInstance = axios.create({
   timeout: 2000,
   headers: {
      "Content-Type": "application/json"
   }
});

axiosInstance.interceptors.request.use(
   (config) => {
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

axiosInstance.interceptors.response.use(
   (config) => {
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

const fetch = {
   get: function(path, callback) {
      return axiosInstance.get(path)
         .then((response) => {
            callback(response.status, response.data);
         });
   },
   post: function(path, payload, callback) {
      return axiosInstance.post(path, payload)
         .then((response) => {
            callback(response.status, response.data);
         });
   }
}

export default fetch;