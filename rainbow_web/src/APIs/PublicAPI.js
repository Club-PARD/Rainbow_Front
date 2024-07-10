import axios from "axios";

const server = process.env.REACT_APP_API_URL;

export const patchPublicAPI = async (userId, check) => {
  const url = `${server}/api/user/update/publicCheck/${userId}?check=${check}`;
  return axios.patch(url);
};

export const patchDetailAPI = async (postId, data) => {
  try {
      const response = await axios
          .patch(`${server}/api/post/${postId}`, data);
      console.log(response);
      return response;
  } catch (err) {
      console.error(err);
  }
};

export const getDetailAPI = async (postId) => {
  try {
      const response = await axios.get(`${server}/api/post/${postId}`);
      console.log(response.data);
      return response.data;
  } catch (err) {
      console.error(err);
  }
}