import axios from "axios";

/**
 * Fetch all photos api request
 */
export const fetchPhotos = async () => {
  return axios({
    method: "GET",
    url: `https://dev-pb-apps.s3-eu-west-1.amazonaws.com/collection/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json`
  });
};

/**
 * Create user grid api request
 */
export const createGrid = async body => {
  return axios({
    method: "POST",
    url: `http://localhost:3001/api/v1/myGrid`,
    data: body
  });
};

/**
 * Fetch user grid api request
 */
export const fetchGrid = async uid => {
  return axios({
    method: "GET",
    url: `http://localhost:3001/api/v1/myGrid/${uid}`
  });
};

/**
 * Update user grid api request
 */
export const updateGrid = async body => {
  return axios({
    method: "PUT",
    url: `http://localhost:3001/api/v1/myGrid`,
    data: body
  });
};
