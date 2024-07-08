import styled from "styled-components";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { UserData } from "../Atom";
import LoginHeader from "../Components/LoginHeader";
import { postMemberAPI } from "../APIs/RegisterAPI";
import { useNavigate } from "react-router-dom";

function GoogleSignUp(){
    //유효성 검사 관련 코드
    //회원가입 버튼을 눌렀을 때 빈칸이 있는지 없는지 확인
    //빈칸이 없다면 이메일과 비밀번호의 형식이 올바른 형식인지 확인
    const [userData, setUserData] = useRecoilState(UserData);
    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [nickname, setNickname] = useState("");
    const [petName, setPetName] = useState('');

    const userInfo = {
        user : {
            email: {email},
            nickname: {nickname},
            petName: {petName},
        }
    };

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
        try {
            // 원래 여기도 구현하라고 하려했지만 patch를 위해 남겨두겠습니다.
            const response =
              await postMemberAPI(userInfo);
        } catch (err) {
        console.error(err);
        }

        if(email == ''){
            alert("이메일을 입력해주세요");
        }
        else if(!emailValid){
            alert("이메일의 형식이 올바르지 않습니다");
        }
        else if(petName == ''){
            alert("애완동물의 이름을 입력해주세요");
        }
        else{
            console.log({userInfo});
            alert("회원가입이 완료되었습니다!");
            navigate("../");
        }
    }

    return(
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
                    <InputWrapper>
                        <Label>이메일</Label>
                        <Input type="email" value={email} onChange={onEmailHandler} onBlur={onEmailHandler} placeholder="type your email"/>
                    </InputWrapper>
                    <InputWrapper>
                        <Label>닉네임 입력</Label>
                        <Input type="text" onChange={onNicknameHandler} placeholder="type your nickname"/>
                    </InputWrapper>
                    <InputWrapper>
                        <Label>반려동물 이름</Label>
                        <Input type="text" onChange={onPetNameHandler} placeholder="type your pet name"/>
                    </InputWrapper>
                    <SignUpCreateBtn onClick={onSubmitHandler}>회원가입</SignUpCreateBtn>
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
  min-height: 100vh;
  
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

  padding: 16px;

  border-radius: 8px;
  border: solid 1px #C6C6C6;
  background: #FEFEFE;

  box-shadow: 0px 20px 25px -5px rgba(0, 0, 0, 0.10), 0px 8px 10px -6px rgba(0, 0, 0, 0.10);
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 17rem;

  margin: 16px;
`

const Input = styled.input`
  width: 21rem;
  height: 2.5rem;

  margin: 0.5rem;
  padding: 0 0.5rem;

  border: solid 1px #DDD;
  border-radius: 8px;
  
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  
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

const Intro = styled.div`
  text-align: center;
  font-size: 1.5rem;
  margin: 1.6rem;
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
  margin-bottom: 1.6rem;
`

const SignUpCreateBtn = styled.button`
  width: 94%;
  height: 46px;
  margin: 16px;
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

// //페이지 전체를 관리하는 css
// const Container = styled.div`
// display: flex;
// flex-direction: column;
// justify-content: center;
// align-items: center;
// `
// //회원가입 제목 css
// const SignUpTitle = styled.p`
// font-size: 48px;
// font-weight: 900;
// `
// //회원가입 input들
// const SignUpInput = styled.input`
// width: 713px;
// height: 73px;
// border-radius: 10px;
// background-color: #D9D9D9;
// margin-bottom: 72px;
// `
// //회원가입 버튼
// const SignUpCreateBtn = styled.button`
// width: 402px;
// height: 73px;
// border-radius: 10px;
// background: #D9D9D9;

export default GoogleSignUp;