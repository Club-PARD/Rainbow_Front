import axios from "axios";

const server = process.env.REACT_APP_API_URL;

export const postMemberAPI = async (data) => {
  try {
    const response = await axios.post(`${server}/user/register`, data);
    return response;
  } catch (err) {
    console.error(err);
  }
};