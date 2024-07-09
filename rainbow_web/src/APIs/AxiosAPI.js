import axios from "axios";

const server = process.env.REACT_APP_API_URL;

// 여기는 게시물 API

export const getAPI = async (postId) => {
  // your code here
  try {
    const response = await axios
    .get(`${server}/api/post/${postId}`);
    return response.data;
  } catch(err) {
    console.error(err);
  }
};

export const postAPI = async (userId, data) => {
  try {
    const config = {"Content-Type": 'application/json'};
    const response = await axios.post(`${server}/api/post/${userId}`, data, config);
    return response;
  } catch (err) {
    console.error(err);
  }
};

//작성페이지 이미지 API
export const postImgAPI = async (data) => {
  try {
    const response = await axios.post(`${server}/api/file/profile`, data, {
      headers: {
        'image': 'multipart/form-data',
      },
    });
    console.log(response);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const patchAPI = async (postId, data) => {
  try {
    const response = await axios
    .patch(`${server}/api/post/${postId}`, data);
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
    .delete(`${server}/api/post/${postId}`);
    console.log(response);
    return response;
  } catch(err) {
    console.error(err);
  }
};

export const getAllAPI = async (userId) => {
  try {
    const response = await axios
    .get(`${server}/api/post/find/${userId}`);
    return response.data;
  } catch(err) {
    console.error(err);
  }
};

export const getCountAPI = async (userId) => {
  try {
    const response = await axios
    .get(`${server}/api/post/count/${userId}`);
    return response;
  } catch(err) {
    console.log(err);
  }
}

export const getPostDataAPI = async (userId) => {
  // your code here
  try {
    const response = await axios
    .get(`${server}/api/post/find/${userId}`);
    return response.data;
  } catch(err) {
    console.error(err);
  }
};

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