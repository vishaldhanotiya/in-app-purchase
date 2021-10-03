import * as types from './types';

export function spawnSagaAction() {
  return {
    type: types.SPAWN_SAGA_REQUEST,
  };
}
