import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserData } from "../Atom";
import LoginHeader from "../Components/LoginHeader";
import { patchGoogleMemberAPI } from "../APIs/RegisterAPI";
import { useNavigate } from "react-router-dom";

function GoogleSignUp() {
  //유효성 검사 관련 코드
  //회원가입 버튼을 눌렀을 때 빈칸이 있는지 없는지 확인
  //빈칸이 없다면 이메일과 비밀번호의 형식이 올바른 형식인지 확인
  const [userData, setUserData] = useRecoilState(UserData);
  const data = useRecoilValue(UserData);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [nickname, setNickname] = useState("");
  const [petName, setPetName] = useState('');

  const userInfo = {
    email: email,
    name: nickname,
    petName: petName,
  };

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

  const onEmailHandler = (e) => {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    // 형식에 맞는 경우 true 리턴
    console.log('이메일 유효성 검사 :: ', regExp.test(e.target.value))
    setEmailValid(regExp.test(e.target.value));
    setEmail(e.target.value);
  }

  const onNicknameHandler = (e) => {
    setNickname(e.target.value);
  }

  const onPetNameHandler = (e) => {
    setPetName(e.target.value);
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      console.log(userInfo);          
      const response = await patchGoogleMemberAPI(data.user_id, userInfo);
      console.log(response);
    } catch (err) {
      console.error(err);
    }

    if(email === ''){
      alert("이메일을 입력해주세요");
    }
    else if(!emailValid){
      alert("이메일의 형식이 올바르지 않습니다");
    }
    else if(petName === ''){
      alert("애완동물의 이름을 입력해주세요");
    }
    else{
      console.log({userInfo});
      alert("회원가입이 완료되었습니다!");
      navigate(`../main/${data.user_id}`);
    }
  }

  useEffect(() => {
    setEmail(userData.email);
    console.log(email);
  }, [userData.email]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

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
          <Form onSubmit={onSubmitHandler}>
            <InputWrapper>
              <Label>이메일</Label>
              <Input type="email" value={email} onChange={onEmailHandler} onBlur={onEmailHandler} placeholder="type your email" />
            </InputWrapper>
            <InputWrapper>
              <Label>닉네임 입력</Label>
              <Input type="text" onChange={onNicknameHandler} placeholder="type your nickname" />
            </InputWrapper>
            <InputWrapper>
              <Label>반려동물 이름</Label>
              <Input type="text" onChange={onPetNameHandler} placeholder="type your pet name" />
            </InputWrapper>
            <SignUpCreateBtn type="submit">회원가입</SignUpCreateBtn>
          </Form>
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
  color: #2C2C2C;
  font-size: 0.9rem;
`

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
  width: 24rem;
  padding: 16px;
  border-radius: 8px;
  border: solid 1px #C6C6C6;
  background: #FEFEFE;
  box-shadow: 0px 20px 25px -5px rgba(0, 0, 0, 0.10), 0px 8px 10px -6px rgba(0, 0, 0, 0.10);
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  height: 72px;
  margin-bottom: 16px;
`

const Input = styled.input`
  display: flex;
  min-width: 240px;
  padding: 12px 16px 12px 16px;
  align-items: center;
  border: solid 1px;
  border-radius: 8px;
  align-self: stretch;
  border-color: #DDD;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  margin: 8px;

  &::placeholder {
    color: #B0B0B0;
  }

  &:focus {
    border-color: ${(props) => props.color || "#B0B0B0"};
    outline: none;
  }
`

const Label = styled.div`
  color: #2C2C2C;
  font-family: "Pretendard Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  margin-left: 8px;
  margin-bottom: 4px;
  width: 330px;
  height: 22px;
`

const Intro = styled.div`
  text-align: center;
  font-size: 20px;
  margin: 1.6rem;
  font-family: "GeistMono";
`

const Footer = styled.div`
  min-height: 10vh;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
  font-weight: 500;
  color: #5E5E5E;
`

const SignUpCreateBtn = styled.button`
  align-self: stretch;
  height: 38px;
  border: 1px solid #2C2C2C;
  border-radius: 10px;
  background: #2C2C2C;
  color: #FEFEFE;
  margin: 8px;
  margin-top: 16px;
  font-size: 14px;

  &:hover {
    background: #000;
    cursor: pointer;
  }
`

export default GoogleSignUp;
