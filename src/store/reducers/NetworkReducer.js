/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
import createReducer from '../../../lib/createReducer';
import * as types from '../actions/types';
import { NetworkCheck } from '../../utils/Constant';

const initialState = {
  isConnected: NetworkCheck.isConnected,
};

export const networkReducer = createReducer(initialState, {
  [types.ONLINE](state) {
    return { ...state, isConnected: true };
  },
  [types.OFFLINE](state) {
    return { ...state, isConnected: false };
  },
});
