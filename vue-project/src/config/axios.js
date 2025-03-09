import axios from 'axios';


// byt mot vad man får i aws

const apiClient = axios.create({
    baseURL: 'http://13.60.197.58/api',
    withCredentials: true,
});





apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error)
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if(error.status === 403 && !originalRequest._retry){
            localStorage.removeItem('accessToken');
            router.push('/login');
        }

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Prevent infinite retry loops
      
            try {
              // Refresh the access token
              const newAccessToken = await refreshAccessToken();
      
              // Attach the new token to the original request
              originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
      
              // Retry the original request
              return apiClient(originalRequest);
            } catch (refreshError) {
              console.error('Token refresh failed:', refreshError);
              // Redirect to login page if refresh token fails
              router.push('/Login');
            }
          }
      
          return Promise.reject(error);
    }
)

export default apiClient;