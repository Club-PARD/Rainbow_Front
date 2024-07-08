import axios from "axios";

const server = process.env.REACT_APP_API_URL;

export const patchPublicAPI = async (userId, check) => {
  const url = `${server}/api/user/update/publicCheck/${userId}?check=${check}`;
  return axios.patch(url);
};