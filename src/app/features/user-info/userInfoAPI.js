import api from '../../../api/api';

const userInfoAPI = {
    get: (url, token) => api.get(url, {headers: {Authorization: `${token}`}}),
    post: (url, data, token) => api.post(url, data, {headers: {Authorization: `${token}`}}),
    put: (url, data, token) => api.put(url, data, {headers: {Authorization: `${token}`}}),
    delete: (url, token) => api.delete(url, {headers: {Authorization: `${token}`}})
}   

export default userInfoAPI;





