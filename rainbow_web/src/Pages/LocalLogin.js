import '../App.css';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import styled from 'styled-components';
import LoginHeader from '../Components/LoginHeader';
import { loginAPI } from '../APIs/LoginAPI';
import { Link, useNavigate } from "react-router-dom";
import { LoginState } from '../Atom';
import { useRecoilState } from 'recoil';

const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;

const Login = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useRecoilState(LoginState);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const navigate = useNavigate();

    const handleLocalLogin = async (email, password) => {
        try{
            const response = await loginAPI(email, password);
            // const response = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg3YmJlMDgxNWIwNjRlNmQ0NDljYWM5OTlmMGU1MGU3MmEzZTQzNzQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMzg0ODc0NzAwNDEtcW8yaGFucjI3OTFidnIzdGg0dHVudm03MjlncWJicXMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxMzg0ODc0NzAwNDEtcW8yaGFucjI3OTFidnIzdGg0dHVudm03MjlncWJicXMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTQ2MjQ4NjgzNjg3MTE3NTgyNTkiLCJlbWFpbCI6InVtaW5uYW5jeTAzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MjAwNjIzNTAsIm5hbWUiOiLtmansnKDrr7wiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS3JRRlhTTklZaVVEMkFyTVpNVi0yTUhObWtBWUQwaTVIVF9NbEp2cXdsYnVmUmFRPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IuycoOuvvCIsImZhbWlseV9uYW1lIjoi7ZmpIiwiaWF0IjoxNzIwMDYyNjUwLCJleHAiOjE3MjAwNjYyNTAsImp0aSI6ImExMDU1NmFmYzZlNjU3ZmRhMTVkOTBkODE2MTliNWVkYmNjZjU3ZDQifQ.aldKYvsf_uSvftAOlJVl8X1WfCgYY2JhGldF2AxPWBrVrAjitSMlumG0Ut2D-281l9eHnNnYOMioeCOP76cDMZAHLNXfreje0nC9cL9QvXcFKBLSwueRwkGYRRKczJnYpEdg6kDTBODX1JaIBcaYNEjHGZqKnuSpZvUIzl1vH2-lteC5PBQk9iayPD9Sv1sexrP4l18aTp6tFpvd4RWdwYo43-5btjj2J5ugPGJBF7IWi1bcag8c7Ar_Wn-kx5MDwHRUG0r-jV-mfTvUAw9i2Ekayu-6Fq3mHVi6Z4f-7m0sf6riZ1YaMm8GPesdln9EjizY0OnLgr48hAXi6Jj0_Q";
            localStorage.setItem("token", response); // 로컬 스토리지에 토큰 저장
            // server login 결과
            console.log(response);
            console.log(localStorage.getItem("token"));
            setIsLoggedIn(true);
            navigate("../main");
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
                {/* {loginCheck && (
                    <label  style={{color: "red"}}>이메일 혹은 비밀번호가 틀렸습니다.</label>
                )} */}
            </>
            <LoginBtnWrapper>
                {/* Local Login button */}
                <LoginBtn onClick={() => handleLocalLogin(email, password)}>
                    로그인
                </LoginBtn>
            </LoginBtnWrapper>
        </>
    );
    }

    const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 17rem;

    margin: 0.7rem;
    `

    const Input = styled.input`
    width: 21rem;
    height: 2.5rem;

    margin: 0.5rem;
    padding: 0 0.5rem;

    border: solid 1px #DDD;
    border-radius: 8px;

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

    const LoginBtnWrapper = styled.div`
    display: flex;
    align-self: stretch;

    height: 76px;
    `

    const LoginBtn = styled.button`
    width: 100%;
    height: 46px;

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

    // {/* Sign Out button 이 로그인 성공 시에만 보여지도록 하는 코드 */}
    // { Object.keys(user).length != 0 &&
    //   <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
    // }

    // {/* 로그인 성공 시, 즉 user 변수에 어떤 값이 들어갈 시, 유저 프로필과 이름이 보여지도록 하는 코드 */}
    // { user &&
    //   <div>
    //     <img src={user.picture}></img>
    //     <h3>{user.name}</h3>
    //   </div>
    // }
