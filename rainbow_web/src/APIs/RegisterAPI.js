import axios from "axios";

const server = process.env.REACT_APP_API_URL;

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

// export const getAPI = async (id) => {
//   // your code here
//   try {
//     const response = await axios
//     .get(`${server}/${id}`);
//     return response.data;
//   } catch(err) {
//     console.error(err);
//   }
// };

// 아래 코드는 잘 돌아가는 코드이니 참고해서 작성해보세요.
export const postAPI = async (data) => {
  try {
    const response = await axios.post(`${server}`, data);
    return response;
  } catch (err) {
    console.error(err);
  }
};

// export const patchAPI = async (id, data) => {
//   try {
//     const response = await axios.patch(`${server}/${id}`, data);
//     console.log(response);
//     return response;
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const deleteAPI = async (id) => {
//   // your code here
//   try {
//     const response = await axios
//     .delete(`${server}/${id}`);
//     console.log(response);
//     return response;
//   } catch(err) {
//     console.error(err);
//   }
// };