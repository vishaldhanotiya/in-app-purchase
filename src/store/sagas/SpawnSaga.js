import { call, delay, spawn } from 'redux-saga/effects';

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
  const firstTask = yield spawn(taskOne);
  const secondTask = yield spawn(taskTwo);
  const thirdTask = yield spawn(taskThree);
}

export default function* parallelSpawnTasksSaga() {
  yield call(runTasks);
}
