import axios from "axios";

const server = process.env.REACT_APP_API_URL;

export const loginAPI = async (userData) => {
    const response = await axios.post(
        `${server}/login`,
        userData
    );

    return response;
};