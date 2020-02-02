import {
  FETCH_PHOTOS_REQUEST,
  CREATE_GRID_REQUEST,
  FETCH_GRID_REQUEST,
  UPDATE_GRID_REQUEST
} from './actionTypes';

/**
 * Get all photos action creator
 */
export const photoListRequest = () => ({
  type: FETCH_PHOTOS_REQUEST
});

/**
 * Create user grid action creator
 */
export const createGridRequest = (data) => ({
  type: CREATE_GRID_REQUEST,
  payload: data
});

/**
 * Fetch user grid action creator
 */
export const fetchGridRequest = (data) => ({
  type: FETCH_GRID_REQUEST,
  payload: data
});

/**
 * Update user grid action creator
 */
export const updateGridRequest = (data) => ({
  type: UPDATE_GRID_REQUEST,
  payload: data
});
