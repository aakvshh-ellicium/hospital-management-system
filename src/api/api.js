import axios from "axios";

const baseURL = 'http://127.0.0.1:3000';

const instance = axios.create({ baseURL });

export default instance;
// export default baseURL;