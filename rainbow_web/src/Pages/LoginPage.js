import '../App.css';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { jwtDecode } from "jwt-decode";
import styled from 'styled-components';
import LoginHeader from '../Components/LoginHeader';
import LocalLogin from '../Components/LocalLogin';
import { useNavigate } from 'react-router-dom';
import { googleLoginAPI } from '../APIs/LoginAPI';
import { LoginState } from '../Atom';

const google = window.google;
const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;

function LoginPage() {
  const [ isLoggedIn, setIsLoggedIn ] = useRecoilState(LoginState);
  const [ user, setUser ] = useState({});

  const navigate = useNavigate();

  const handleGoogleLogin = async (res) => {
    console.log("Encoded JWT ID token: " + res.credential);
    const googleUser = jwtDecode(res.credential);
    setUser(googleUser);
    try{
      // const response = await googleLoginAPI(res.credential);
      // const response = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg3YmJlMDgxNWIwNjRlNmQ0NDljYWM5OTlmMGU1MGU3MmEzZTQzNzQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMzg0ODc0NzAwNDEtcW8yaGFucjI3OTFidnIzdGg0dHVudm03MjlncWJicXMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxMzg0ODc0NzAwNDEtcW8yaGFucjI3OTFidnIzdGg0dHVudm03MjlncWJicXMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTQ2MjQ4NjgzNjg3MTE3NTgyNTkiLCJlbWFpbCI6InVtaW5uYW5jeTAzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MjAwNjIzNTAsIm5hbWUiOiLtmansnKDrr7wiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS3JRRlhTTklZaVVEMkFyTVpNVi0yTUhObWtBWUQwaTVIVF9NbEp2cXdsYnVmUmFRPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IuycoOuvvCIsImZhbWlseV9uYW1lIjoi7ZmpIiwiaWF0IjoxNzIwMDYyNjUwLCJleHAiOjE3MjAwNjYyNTAsImp0aSI6ImExMDU1NmFmYzZlNjU3ZmRhMTVkOTBkODE2MTliNWVkYmNjZjU3ZDQifQ.aldKYvsf_uSvftAOlJVl8X1WfCgYY2JhGldF2AxPWBrVrAjitSMlumG0Ut2D-281l9eHnNnYOMioeCOP76cDMZAHLNXfreje0nC9cL9QvXcFKBLSwueRwkGYRRKczJnYpEdg6kDTBODX1JaIBcaYNEjHGZqKnuSpZvUIzl1vH2-lteC5PBQk9iayPD9Sv1sexrP4l18aTp6tFpvd4RWdwYo43-5btjj2J5ugPGJBF7IWi1bcag8c7Ar_Wn-kx5MDwHRUG0r-jV-mfTvUAw9i2Ekayu-6Fq3mHVi6Z4f-7m0sf6riZ1YaMm8GPesdln9EjizY0OnLgr48hAXi6Jj0_Q";
      const response = await googleLoginAPI(user.email, user.password);
      localStorage.setItem("token", response); // 로컬 스토리지에 토큰 저장
      // Google Login data 받아와짐
      console.log(googleUser);
      // server login 결과
      console.log(localStorage.getItem("token"));
      console.log(response);
      setIsLoggedIn(true);
      navigate("../main");
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // global google
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleLogin
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", width: "360px" }
    )
    google.accounts.id.prompt();
  }, []);

  return (
    <Container>
      <LoginHeader />
      <Wrapper>
        <Intro>
          <span>
            Sincerely, 에 오신 것을 환영합니다<br />
            이메일을 입력해 주세요
          </span>
        </Intro>
        <LoginWrapper>
          <LocalLogin />
          <Line />
          {/* Google Login button */}
          <GoogleBtn id="signInDiv"></GoogleBtn>
        </LoginWrapper>
      </Wrapper>
      <Footer>
        계속 진행할 경우 Sincerely,의 개인정보 약관<br />
        및 이용정책에 동의하는 것으로 간주됩니다.
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100vw;
  height: 100vh;

  background: radial-gradient(at 50% 160%, #8952FF, #E5DBF7, #FFFFFD, #FFFFFD);
  color: #2C2C2C;
  font-size: 0.9rem;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 24rem;

  padding: 24px;

  border-radius: 8px;
  border: solid 1px #C6C6C6;
  background: #FEFEFE;
`

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

const Intro = styled.div`
  text-align: center;
  font-size: 1.5rem;
  margin: 1.6rem;
`

const Line = styled.hr`
  width: 93%;

  margin: 0.7rem;

  border: solid 0.8px #B0B0B0;
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

const GoogleBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 12px;
  width: 100%;
  height: 100%;
`

const Footer = styled.div`
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
  font-weight: 500;
  color: #5E5E5E;
  margin-bottom: 1.6rem;
`

export default LoginPage;
