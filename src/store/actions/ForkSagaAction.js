import * as types from './types';

export function forkSagaAction() {
  return {
    type: types.FORK_SAGA_REQUEST,
  };
}
