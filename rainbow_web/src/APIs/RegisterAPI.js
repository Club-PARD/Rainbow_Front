import axios from "axios";

const server = process.env.REACT_APP_API_URL;

export const postMemberAPI = async (data) => {
  try {
    const config = {"Content-Type": 'application/json'};
    const response = await axios.post(`${server}/api/user/register`, data, config);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const patchGoogleMemberAPI = async (userId, data) => {
  try {
    const response = await axios.patch(`${server}/api/user/google/register/${userId}`, data);
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

export const getUserByIDAPI = async (userId) => {
  try {
    const response = await axios.get(`${server}/api/user/find/id/${userId}`);
    return response.data;
  } catch(err) {
    console.error(err);
  }
}