import { put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import NetInfo from '@react-native-community/netinfo';
import * as types from '../actions/types';

export default function* startWatchingNetworkConnectivity() {
  const channel = eventChannel((emitter) => {
    const unsubcribe = NetInfo.addEventListener((state) =>
      emitter(state.isConnected),
    );
    return () => unsubcribe();
  });
  try {
    while (true) {
      const isConnected = yield take(channel);

      if (isConnected) {
        yield put({ type: types.ONLINE });
      } else {
        yield put({ type: types.OFFLINE });
      }
    }
  } finally {
    channel.close();
  }
}
