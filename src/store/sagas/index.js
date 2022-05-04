import { all, spawn } from 'redux-saga/effects'

import { startWatchingNetworkConnectivity } from './offline'

export default function* rootSaga() {
  yield all([
    spawn(startWatchingNetworkConnectivity)
  ])
}
