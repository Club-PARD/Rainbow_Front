import axios from "axios";

const server = process.env.REACT_APP_API_URL;

export const googleLoginAPI = async (data) => {
    try{
        const config = {"Content-Type": 'application/json'};

        const response = await axios.post(
            `${server}/api/auth/googleLogin`,
            data, config, { withCredentials: true }
        ); 
        return response.data;
    } catch(err) {
        console.log(err);
    }
};

export const loginAPI = async (email, password) => {
    try{
        const response = await axios.get(
            `${server}/api/auth/login?email=${email}&password=${password}`
        );
        return response.data;
    } catch(err) {
        console.log(err);
    }
};
