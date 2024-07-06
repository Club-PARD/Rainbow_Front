import axios from "axios";

const server = process.env.REACT_APP_API_URL;

// 여기는 게시물 API

export const getAPI = async (postId) => {
  // your code here
  try {
    const response = await axios
    .get(`${server}/post/${postId}`);
    return response.data;
  } catch(err) {
    console.error(err);
  }
};

export const postAPI = async (userId, data) => {
  try {
    const response = await axios.post(`${server}/post/${userId}`, data);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const patchAPI = async (postId, data) => {
  try {
    const response = await axios
    .patch(`${server}/post/${postId}`, data);
    console.log(response);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const deleteAPI = async (postId) => {
  // your code here
  try {
    const response = await axios
    .delete(`${server}/post/${postId}`);
    console.log(response);
    return response;
  } catch(err) {
    console.error(err);
  }
};

export const getAllAPI = async (userId) => {
  try {
    const response = await axios
    .get(`${server}/post/find/${userId}`);
    return response.data;
  } catch(err) {
    console.error(err);
  }
};

export const getCountAPI = async (userId) => {
  try {
    const response = await axios
    .get(`${server}/post/count/${userId}`);
    return response;
  } catch(err) {
    console.log(err);
  }
}

// 참고용
// export const getDataAPI = async () => {
//     try {
//         const response = await axios
//         .get();
//         return response.data;
//     } catch(err) {
//         console.error(err);
//     }
// };

// export const getDataAPI = async (part) => {
//   // your code here
//   try {
//     const response = await axios
//     .get(part == "all" ? `${server}` : `${server}?part=${part}`);

//     // .get(part === "ALL" ? `${server}` : `${server}?part=${part}`);
//     return response.data;
//   } catch(err) {
//     console.error(err);
//   }
// };