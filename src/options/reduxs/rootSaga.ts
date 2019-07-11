import {SagaIterator} from 'redux-saga'
import {all, fork} from 'redux-saga/effects'

import {navigationSaga} from './navigation/saga'
import {optionsSaga} from './options/saga'

export function* rootSaga(): SagaIterator {
  try {
    yield all([navigationSaga, optionsSaga].map(fork))
  } catch (err) {
    console.error(err)
  }
}