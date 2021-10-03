/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { call, put, race, delay } from 'redux-saga/effects';
import { getProfileUser, updateProfileUser } from '../../services/loginUser';
import * as profileActions from '../actions/ProfileActions';

export function* getProfileSaga() {
  // how to call api
  const response = yield call(getProfileUser);

  // mock response

  if (response.data.success) {
    // no need to call navigate as this is handled by redux store with SwitchNavigator
    // yield call(navigationActions.navigateToHome);
    yield put(profileActions.getProfileResponse(response.data));
  }
}

export function* updateProfileSaga(action) {
  // how to call api
  const response = yield call(updateProfileUser, action.data);

  // //how to call api
  //  const response = yield call(updateProfileUser, action.data);
  //  console.log('response on updateProfile', JSON.stringify(response.data))

  // if(response.data.success){
  //   yield put(profileActions.updateProfileResponse(response.data))
  // }

  // RaceSaga============Implementation
  const { posts, timeout } = yield race({
    posts: call(updateProfileUser, action.data),
    timeout: delay(500),
  });
}
