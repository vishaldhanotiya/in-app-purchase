/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
import createReducer from '../../../lib/createReducer';
import * as types from '../actions/types';

const initialState = {
  data: null,
  updateProfile: null,
};

export const updateProfileReducer = createReducer(initialState, {
  [types.UPDATE_PROFILE_REQUEST](state, action) {
    return { ...state, updateProfile: action.data };
  },
  [types.UPDATE_PROFILE_RESPONSE](state, action) {
    return { ...state, updateProfile: action.response };
  },
  [types.GET_PROFILE_FAILED](state, action) {
    return { ...state, updateProfile: null };
  },
});
