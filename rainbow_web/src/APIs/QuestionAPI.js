import axios from 'axios';

const server = 'process.env.REACT_APP_API_URL';

export const getQuestionAPI = async (userId) => {
  try {
    const response = await axios.get(`${server}/questions/${userId}`);
    if (response.data && Array.isArray(response.data)) {
      return response.data.slice(0, 40);
    } else {
      console.error('Unexpected response data format:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
    return [];
  }
};