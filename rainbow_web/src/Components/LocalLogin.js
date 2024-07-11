import '../App.css';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import styled from 'styled-components';
import LoginHeader from './LoginHeader';
import { loginAPI } from '../APIs/LoginAPI';
import { Link, useNavigate } from "react-router-dom";
import { LoginState } from '../Atom';
import { useRecoilState } from 'recoil';
import { UserData } from '../Atom';

const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;

const Login = () => {
    const [ loginCheck, setLoginCheck ] = useState(false);
    const [ isLoggedIn, setIsLoggedIn ] = useRecoilState(LoginState);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ userData, setUserData ] = useRecoilState(UserData);

    const navigate = useNavigate();

    const handleLocalLogin = async (email, password) => {
        try{
            const response = await loginAPI(email, password);
            // localStorage.setItem("token", response); // 로컬 스토리지에 토큰 저장
            // console.log(localStorage.getItem("token"));
            
            // server login 결과
            console.log(response);
            if(response) {
                setLoginCheck(false);
                setIsLoggedIn(true);
                setUserData(response);
                console.log(userData);
                navigate("../main");
            }
            else {
                setLoginCheck(true);
            }
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <>
            <>
                <InputWrapper>
                <Label>이메일</Label>
                <Input type="email" placeholder="type your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                </Input>
                </InputWrapper>
                <InputWrapper>
                    <Label>비밀번호</Label>
                    <Input type="password" placeholder="type your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Input>
                </InputWrapper>
                {loginCheck && (
                    <Msg  style={{color: "red"}}>이메일 혹은 비밀번호가 틀렸습니다.</Msg>
                )}
            </>
            <LoginBtnWrapper>
                {/* Local Login button */}
                <LoginBtn onClick={() => handleLocalLogin(email, password)}>
                    로그인
                </LoginBtn>
            </LoginBtnWrapper>
        </>
    );
};

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 17rem;

    margin: 4px;
`

const Input = styled.input`
    width: 21rem;
    height: 2.5rem;

    margin: 4px;
    padding: 0 0.5rem;

    border: solid 1px #DDD;
    border-radius: 8px;

    &::placeholder {
        color: #B0B0B0;
    }

    &:focus {
        outline: none;
        border-color: #B0B0B0;
    }
`

const Label = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    width: 100%;

    margin-left: -4rem;
`

const Msg = styled.div`
    width: 100%;
    max-height: 22px;
    display: flex;
    justify-content: flex-start;
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    margin-left: 35px;
    margin-top: 0;
    color: #EC221F;
`

const LoginBtnWrapper = styled.div`
    display: flex;
    align-self: stretch;

    height: 76px;
`

const LoginBtn = styled.button`
    width: 100%;
    height: auto;

    margin: 12px;
    padding: 12px;

    background-color: #2C2C2C;
    color: #FEFEFE;

    border: none;
    border-radius: 8px;

    &:hover {
        background-color: #000000;
        cursor: pointer;
    }
`

export default Login;