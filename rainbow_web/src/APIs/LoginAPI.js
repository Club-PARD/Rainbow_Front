import axios from "axios";

const server = process.env.REACT_APP_API_URL;

export const googleLoginAPI = async (jwt) => {
    try{
        const response = await axios.post(
            `${server}/`,
            jwt
        );
        return response;
    } catch(err) {
        console.log(err);
    }
};

export const loginAPI = async (email, password) => {
    try{
        const response = await axios.post(
            `${server}/`,
            email, password
        );
        return response;
    } catch(err) {
        console.log(err);
    }
};
