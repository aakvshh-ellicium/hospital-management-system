import api from '../../../api/api';

const loginAPI = {
    get: (url) => api.get(url),
    post: (url, data) => api.post(url, data)
}

export default loginAPI;


