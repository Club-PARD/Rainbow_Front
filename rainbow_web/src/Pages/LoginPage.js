import '../App.css';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import styled from 'styled-components';
import LoginHeader from '../Components/LoginHeader';
// import { postAPI } from '../APIs/AxiosAPI';

const google = window.google;
const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;

function LoginPage() {
  const [ user, setUser ] = useState({});

  function handleLoginResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwtDecode(response.credential);
    // const APIresponse = await postAPI(response.credential);
    console.log(userObject);
    setUser(userObject);
    // document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    // setUser({});
    // document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    // global google
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleLoginResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
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
          <div>
            <InputWrapper>
              <Label>이메일</Label>
              <Input type="email" placeholder="type your email"></Input>
            </InputWrapper>
            <InputWrapper>
                <Label>비밀번호</Label>
                <Input type="password" placeholder="type your password"></Input>
            </InputWrapper>
          </div>
          <LoginBtnWrapper>
            {/* Local Login button */}
            <LoginBtn onClick={() => {

            }} variant="primary"size="small">
              로그인
            </LoginBtn>
          </LoginBtnWrapper>
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
  margin: 12px;
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
