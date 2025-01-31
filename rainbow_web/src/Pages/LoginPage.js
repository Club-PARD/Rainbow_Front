import '../App.css';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { jwtDecode } from "jwt-decode";
import styled from 'styled-components';
import LoginHeader from '../Components/LoginHeader';
import LocalLogin from '../Components/LocalLogin';
import { Link, useNavigate } from 'react-router-dom';
import { googleLoginAPI } from '../APIs/LoginAPI';
import { LoginState, UserData } from '../Atom';

const google = window.google;
const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;

function LoginPage() {
  const [ isLoggedIn, setIsLoggedIn ] = useRecoilState(LoginState);
  const [ userData, setUserData ] = useRecoilState(UserData);
  const data = useRecoilValue(UserData);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // Chrome requires returnValue to be set.
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const navigate = useNavigate();

  const handleGoogleLogin = async (res) => {
    try{
      // google login 결과
      // console.log("Encoded JWT ID token: " + res.credential);
      // const googleUser = jwtDecode(res.credential);

      // google login API
      const googleUser = {
        token : res.credential
      };

      const response = await googleLoginAPI(googleUser);
      console.log("Google Login API response: ", response);
      setUserData(response);
      console.log(userData);

      // server login 결과
      if(response.name == null) {
        console.log("to google register");
        navigate("/register-google");
      }
      else {
        setIsLoggedIn(true);
        console.log(response.user_id);
        navigate(`../main/${response.user_id}`);
      }
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    // global google
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleLogin
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", width: "360px", }
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
          {/* <LocalLogin /> */}
          {/*
          <SignUp>
            <Span>계정이 없으신가요?&nbsp;</Span>
            <Span><Link to="/register" >Sign Up</Link></Span>
          </SignUp>
          */}
          {/* <Line /> */}
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
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 108px;
`

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20%;
  width: 24rem;

  padding: 10px;

  border-radius: 8px;
  border: solid 1px #C6C6C6;
  background: #FEFEFE;

  box-shadow: 0px 20px 25px -5px rgba(0, 0, 0, 0.10), 0px 8px 10px -6px rgba(0, 0, 0, 0.10);
`

const Intro = styled.div`
  font-family: "GeistMono";
  text-align: center;
  font-size: 20px;
  color: #2C2C2C;
  margin: 1.6rem;
`

const Line = styled.hr`
  width: 93%;

  margin: 8px;

  border: solid 0.8px #B0B0B0;
`
const LoginBtnWrapper = styled.div`
  display: flex;
  align-self: stretch;

  height: 76px;
`

const LoginBtn = styled.button`
  width: 100%;
  height: auto;

  margin: 8px;
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

const SignUp = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 8px;

  font-size: 15px;
  color: #2C2C2C;

  width: 100%;
  padding-right: 2rem;
`

const Span = styled.span`
  a {
    text-decoration: none;
    color: #8952FF;

    &:hover {
      color: #6A3CCA;
    }
  }
`

const GoogleBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 8px;
  width: 100%;
  height: 100%;
`

const Footer = styled.div`
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
  font-family: Pretendard-Regular;
  font-weight: 500;
  color: #5E5E5E;
  margin-bottom: 2rem;
`

export default LoginPage;