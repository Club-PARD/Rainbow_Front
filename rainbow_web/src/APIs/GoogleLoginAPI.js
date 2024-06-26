import axios from "axios";

const server = process.env.REACT_APP_API_URL;

export const googleLoginAPI = async (jwt) => {
    const response = await axios.post(
        `${server}/login/google`,
        jwt
    );

    return response;
};