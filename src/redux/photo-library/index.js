import photoLibraryReducer from './reducers';
import { photoListRequest, createGridRequest, fetchGridRequest, updateGridRequest } from './actionCreators';

const photoLibrary = {
  photoLibraryReducer: photoLibraryReducer,
  actions: {
    photoListRequest,
    createGridRequest,
    fetchGridRequest,
    updateGridRequest
  }
}

export default photoLibrary;