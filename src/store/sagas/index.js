/**
 *  Redux saga class init
 */
import { takeEvery, all, takeLatest, take, call } from 'redux-saga/effects';
import * as types from '../actions/types';
import loginSaga from './LoginSaga';
import { getProfileSaga, updateProfileSaga } from './ProfileSaga';
import startWatchingNetworkConnectivity from './NetworkSaga';
import parallelTasksSaga from './ForkSaga';
import parallelSpawnTasksSaga from './SpawnSaga';

export default function* watch() {
  yield all([
    takeEvery(types.LOGIN_REQUEST, loginSaga),
    takeEvery(types.GET_PROFILE_REQUEST, getProfileSaga),
    takeEvery(types.UPDATE_PROFILE_REQUEST, updateProfileSaga),
    takeEvery(types.NETWORK_CHECK_REQUEST, startWatchingNetworkConnectivity),
    takeEvery(types.FORK_SAGA_REQUEST, parallelTasksSaga),
    takeEvery(types.SPAWN_SAGA_REQUEST, parallelSpawnTasksSaga),
  ]);
}
