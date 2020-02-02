import { fork, all } from 'redux-saga/effects';
import {
  photoLibrarySaga
} from './photo-library/sagas';

const sagas = [
  photoLibrarySaga
];

/**
 * Combine all sagas
 * @returns {object} Combined sagas
 */
function* globalSagas() {
  const globalSagasForks = sagas.map((saga) => fork(saga));
  yield all([...globalSagasForks]);
}

export default globalSagas;