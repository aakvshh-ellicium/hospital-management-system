import api from '../../../api/api'

const adminAPI = {
    get: (url, token) => api.get(url, {headers: {Authorization: `${token}`}}),
    post: (url, data, token) => api.post(url, data, {headers: {Authorization: `${token}`}})
}

export default adminAPI;