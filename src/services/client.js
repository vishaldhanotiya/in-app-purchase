import axios from 'axios';
import ApiConfig from './apiConfig';

const apiClient = axios.create({
  baseURL: ApiConfig.BASE_URL,
  responseType: 'json',
  withCredentials: true,
});

export default { apiClient };
