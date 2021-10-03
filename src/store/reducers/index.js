/*
 * combines all th existing reducers
 */
import * as loadingReducer from './LoadingReducer';
import * as loginReducer from './LoginReducer';
import * as profileReducer from './ProfileReducer';
import * as updateProfileReducer from './UpdateProfileReducer';
import * as networkReducer from './NetworkReducer';

export default Object.assign(
  loginReducer,
  loadingReducer,
  profileReducer,
  updateProfileReducer,
  networkReducer,
);
