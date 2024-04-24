import api from '../../../api/api';

const usersAPI = {
    get: (url) => api.get(url),
    post: (url, data) => api.post(url, data)
}

export default usersAPI;