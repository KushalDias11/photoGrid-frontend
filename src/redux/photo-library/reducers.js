import {
  FETCH_PHOTOS_REQUEST,
  FETCH_PHOTOS_SUCCESS,
  FETCH_PHOTOS_FAILURE,
  FETCH_GRID_REQUEST,
  FETCH_GRID_SUCCESS,
  CREATE_GRID_REQUEST
} from './actionTypes';

const initialPhotoState = {
  photoList: [],
  gridList: [],
  fetchingList: true,
  fetchingGrid: true,
  error: null
};

/**
 * Redux reducer to handle state managment
 */
const photoLibraryReducer = (state = initialPhotoState, action) => {
  switch (action.type) {
    case FETCH_PHOTOS_REQUEST:
      return { ...state, fetchingList: true, error: null };
    case FETCH_GRID_REQUEST: 
      return { ...state, fetchingList: true,  error: null };
      case CREATE_GRID_REQUEST: 
        return { ...state, fetchingList: true, error: null};
    case FETCH_PHOTOS_SUCCESS:
      return { ...state, fetchingList: false, fetchingGrid: true, error: null, photoList: action.photos, gridList: []  };
    case FETCH_GRID_SUCCESS:
      return { ...state, fetchingList: false, fetchingGrid: false, error: null, gridList: action.photos  };
    case FETCH_PHOTOS_FAILURE:
      return { ...state, fetchingList: false, error: action.err, photoList: [], gridList: [] };
    default:
      return state;
  }
};

export default photoLibraryReducer;
