import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router'
import {
  FETCH_PHOTOS_REQUEST,
  FETCH_PHOTOS_SUCCESS,
  CREATE_GRID_REQUEST,
  FETCH_GRID_REQUEST,
  FETCH_GRID_SUCCESS,
  UPDATE_GRID_REQUEST
} from './actionTypes';
import api from '../../api';

/**
 * Main saga listner to capture action dispatchs
 */
export function* photoLibrarySaga() {
  yield takeLatest(FETCH_PHOTOS_REQUEST, photoList);
  yield takeLatest(CREATE_GRID_REQUEST, createGrid);
  yield takeLatest(FETCH_GRID_REQUEST, fetchGrid);
  yield takeLatest(UPDATE_GRID_REQUEST, updateGrid);
}

/**
 * Retrieve photo list saga watcher
 */
function* photoList() {
  try {
    const photos = yield call(api.fetchPhotos);
    yield put({ type: FETCH_GRID_REQUEST, payload: 101 });
    yield put({ type: FETCH_PHOTOS_SUCCESS, photos: photos.data });
  } catch (error) {
    // errorHandler(error, null);
  }
}

/**
 * Create photo grid saga watcher
 */
function* createGrid(data) {
  try {
    yield call(api.createGrid, data.payload);
    yield put(push(`/grid/${data.payload.user_id}`));
  } catch (error) {
    // errorHandler(error, null);
  }
}

/**
 *Fetch user grid saga watcher
 */
function* fetchGrid(data) {
  try {
    const photos = yield call(api.fetchGrid, data.payload);
    yield put({ type: FETCH_GRID_SUCCESS, photos: photos.data });
  } catch (error) {
    // errorHandler(error, null);
  }
}

/**
 *Update user grid saga watcher
 */
function* updateGrid(data) {
  console.log("aaaaawa")
  try {
    yield call(api.updateGrid, data.payload);
    yield put(push(`/grid/${data.payload.user_id}`));
  } catch (error) {
    // errorHandler(error, null);
  }
}
