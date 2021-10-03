import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import * as RNLocalize from 'react-native-localize';

const axiosConfig = {
  authorization:
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYmFyYmVyby5jb2RpYW50ZGV2LmNvbVwvYXBpXC9hY2NvdW50XC92ZXJpZnktb3RwIiwiaWF0IjoxNjE2NDAyMjEyLCJleHAiOjE2MzE5NTQyMTIsIm5iZiI6MTYxNjQwMjIxMiwianRpIjoicFd1SkpwQ2JHNUpEb1IxZyIsInN1YiI6OCwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSIsImlkIjo4LCJuYW1lIjoiU21pdGhNIiwiZW1haWwiOiJzbWl0aEBtYWlsaW5hdG9yLmNvbSIsInBob25lX251bWJlcl9jb3VudHJ5IjoiSU4iLCJwaG9uZV9udW1iZXJfY291bnRyeV9jb2RlIjoiKzkxIiwicGhvbmVfbnVtYmVyIjoiOTg5ODk4OTg5OCJ9.azxx3X3Y8Gr26b7ZQTrRUeazcOJIP_KrkQAqKxMZjJc',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  timezone: RNLocalize.getTimeZone(),
  language: 'en',
  'currency-code': 'INR',
  'app-version': DeviceInfo.getVersion(),
  'device-type': Platform.OS,
  'app-type': 'barber',
  certification_type: __DEV__ ? 'development' : 'distribution',
};

export function loginUser(username, password) {
  return apiClient.post(ApiConfig.LOGIN, { username, password });
}

export function getProfileUser() {
  return apiClient.get(ApiConfig.GET_PROFILE, {
    headers: axiosConfig,
  });
}

export function updateProfileUser(data) {
  return apiClient.put(ApiConfig.UPDATE_PROFILE, data, {
    headers: axiosConfig,
  });
}
