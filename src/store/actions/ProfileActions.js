import * as types from './types';

export function getProfile() {
  return {
    type: types.GET_PROFILE_REQUEST,
  };
}

export function getProfileFailed() {
  return {
    type: types.GET_PROFILE_FAILED,
  };
}

export function getProfileResponse(response) {
  return {
    type: types.GET_PROFILE_RESPONSE,
    response,
  };
}

export function updateProfile(data) {
  return {
    type: types.UPDATE_PROFILE_REQUEST,
    data,
  };
}

export function updateProfileResponse(response) {
  return {
    type: types.UPDATE_PROFILE_RESPONSE,
    response,
  };
}

export function updateProfileFailed() {
  return {
    type: types.UPDATE_PROFILE_RESPONSE,
  };
}
