import { call, fork, delay } from 'redux-saga/effects';

function* taskOne() {
  yield delay(7000);
}

function* taskTwo() {
  yield delay(5000);
}

function* taskThree() {
  yield delay(3000);
}

function* runTasks() {
  const firstTask = yield fork(taskOne);
  const secondTask = yield fork(taskTwo);
  const thirdTask = yield fork(taskThree);
}

export default function* parallelTasksSaga() {
  yield call(runTasks);
}
