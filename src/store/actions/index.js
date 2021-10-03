// export action creators
import * as loginActions from './LoginActions';
import * as profileActions from './ProfileActions';
import * as checkNetworkAction from './NetworkAction';
import * as forkSagaAction from './ForkSagaAction';
import * as spawnSagaAction from './SpawnSagaAction';

export const ActionCreators = Object.assign(
  {},
  ...loginActions,
  ...profileActions,
  ...checkNetworkAction,
  ...forkSagaAction,
  ...spawnSagaAction,
);
