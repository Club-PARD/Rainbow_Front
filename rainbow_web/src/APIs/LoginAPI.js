import axios from "axios";

const server = process.env.REACT_APP_API_URL;

export const googleLoginAPI = async (data) => {
    try{
        const config = {
            "Content-Type": 'application/json'
        };
        console.log(data);
        const response = await axios.post(
            `${server}/api/auth/googleLogin`,
            data, config, { withCredentials: true }
        ); 
        return response.data;
    } catch(err) {
        console.log(err);
    }
};

export const googleLogoutAPI = async (data) => {
    try{
        const config = {"Content-Type": 'application/json'};

        const response = await axios.delete(
            `${server}/api/auth/googleLogin`,
            data, config, {withCredentials: true}
        );
        return response.data;
    } catch(err) {
        console.log(err);
    }
}

// 유효성 검사
export const validateRefreshAPI = async (data) => {
    try{
        const config = {"Content-Type": 'application/json'};
        
        const response = await axios.get(
            `${server}/api/auth/validate`,
            data, config
        );
        return response.data;
    } catch(err) {
        console.log(err);
    }
};

// access token 갱신
export const renewAccessAPI = async (data) => {
    try{
        const config = {"Content-Type": 'application/json'};
        
        const response = await axios.get(
            `${server}/api/auth/refresh`,
            data, config
        );
        return response.data;
    } catch(err) {
        console.log(err);
    }
}

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
