import photoLibrary from './photo-library';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

/**
 * Combine all reducers
 * @param {object} Application history from redux
 * @returns {object} Combined reducers
 */
const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  photos: photoLibrary.photoLibraryReducer
})
export default createRootReducer
