import api from '../../../api/api';

const usersAPI = {
    get: (url) => api.get(url),
    post: (url, data) => api.post(url, data),
    delete: (url, token) => api.delete(url, {headers: {Authorization: `${token}`}})
}

export default usersAPI;