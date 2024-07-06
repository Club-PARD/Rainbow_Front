import axios from 'axios';

const server = 'process.env.REACT_APP_API_URL';

export const getQuestionAPI = async (userId) => {
  try {
    const response = await axios.get(`${server}/questions/${userId}`);
    return response.data;
  } catch(err) {
    console.error(err);
  }
};

export const postQuestionAPI = async (userId, questionId, data) => {
  try {
    const response = await axios.post(`${server}/questions/${userId}/${questionId}/answer`, data);
    return response;
  } catch (err) {
    console.error(err);
  }
};