import api from '../../../api/api';

const uploadDocumentsAPI = {
    get: (url, token) => api.get(url, {headers: {Authorization: `${token}`, "Content-Type": "multipart/form-data"}}),
    post: (url, data, token) => api.post(url, data, {headers: {Authorization: `${token}`, "Content-Type": "multipart/form-data"}}),
    put: (url, data, token) => api.put(url, data, {headers: {Authorization: `${token}`, "Content-Type": "multipart/form-data"}})
}

export default uploadDocumentsAPI;