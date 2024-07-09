import axios from "axios";

const server = process.env.REACT_APP_API_URL;

export const postMemberAPI = async (data) => {
  try {
    const response = await axios.post(`${server}/api/user/register`, data);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const getPetNameAPI = async (userId) => {
  try {
    const response = await axios.get(`${server}/api/user/find/pet/${userId}`);
    return response.data;
  } catch(err) {
    console.error(err);
  }
};