import * as types from './types';

export function checkNetworkAction() {
  return {
    type: types.NETWORK_CHECK_REQUEST,
  };
}
