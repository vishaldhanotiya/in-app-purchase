import axios from 'axios';
import { Platform } from 'react-native';

export default function commonApiAxios(method, url, params) {
  // set request headers end
  const axiosConfig = {
    // authorization: "Bearer " + USER.ACCESS_TOKEN======,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    deviceType: Platform.OS,
    appType: 'customer',
    appVersion: '1.0',
  };

  switch (method) {
    case 'GET':
      return axios
        .get(url, { headers: axiosConfig, params: params })
        .then((response) => {
          if (response.status === 200) {
            return response;
          }
        })
        .catch((error) => {
          throw new Error(JSON.stringify(error.response));
        });

    case 'POST':
      return axios
        .post(url, params, { headers: axiosConfig })
        .then((response) => {
          if (response.status === 200) {
            return response;
          }
        })
        .catch((error) => {
          throw new Error(JSON.stringify(error.response));

          // ShowError(error.response);
        });

    case 'PUT':
      return axios
        .put(url, params, { headers: axiosConfig })
        .then((response) => {
          if (response.status === 200) {
            return response;
          }
        })
        .catch((error) => {
          throw new Error(JSON.stringify(error.response));
        });

    case 'DELETE':
      return axios
        .delete(url, { headers: axiosConfig, data: params })
        .then((response) => {
          if (response.status === 200) {
            return response;
          }
        })
        .catch((error) => {
          throw new Error(JSON.stringify(error.response));
        });
    default:
      return axios
        .delete(url, { headers: axiosConfig, data: params })
        .then((response) => {
          if (response.status === 200) {
            return response;
          }
        })
        .catch((error) => {
          throw new Error(JSON.stringify(error.response));
        });
  }
}
