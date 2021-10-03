/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { Alert } from 'react-native';
import { put } from 'redux-saga/effects';
// import loginUser from 'app/services/loginUser';
import * as loginActions from '../actions/LoginActions';

//= =====ForLoader=========================================
function sleep(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}

// Our worker Saga that logins the user
export default function* loginAsync() {
  yield put(loginActions.enableLoader());

  // how to call api
  // const response = yield call(loginUser, action.username, action.password);
  // mock response
  const response = { success: true, data: { id: 1 }, message: 'Success' };
  yield sleep(1);
  if (response.success) {
    yield put(loginActions.onLoginResponse(response.data));
    yield put(loginActions.disableLoader());

    // no need to call navigate as this is handled by redux store with SwitchNavigator
    // yield call(navigationActions.navigateToHome);
  } else {
    yield put(loginActions.loginFailed());
    yield put(loginActions.disableLoader());
    setTimeout(() => {
      Alert.alert('BoilerPlate', response.message);
    }, 200);
  }
}
