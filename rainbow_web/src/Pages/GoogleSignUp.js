import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserData } from "../Atom";
import LoginHeader from "../Components/LoginHeader";
import { patchGoogleMemberAPI } from "../APIs/RegisterAPI";
import { useNavigate } from "react-router-dom";

function GoogleSignUp(){
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
          console.log(userInfo);          
          // 원래 여기도 구현하라고 하려했지만 patch를 위해 남겨두겠습니다.
          const response =
            await patchGoogleMemberAPI(data.user_id, userInfo);
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
            navigate(`../main/${data.user_id}`);
        }
    }

    useEffect(() => {
      setEmail(userData.email);
      console.log(email);
    });

    return(
        <Container>
            <LoginHeader />
            <Wrapper>
                <Intro>
                <span>
                    Sincerely, 에 오신 것을 환영합니다<br />
                    이메일을 입력해&nbsp;주세요
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
  align-items: center;
  justify-content: center;

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
  margin-top: 108px;
`

const LoginWrapper = styled.div`
  display: flex;
width: 362px;
padding: 16px;
flex-direction: column;
align-items: flex-start;
border: 1px solid #C6C6C6;
border-radius: 8px;
background-color: #FFFFFF;
box-shadow: 0px 20px 25px -5px rgba(0, 0, 0, 0.10), 0px 8px 10px -6px rgba(0, 0, 0, 0.10);
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

&::placeholder {
    color: #B0B0B0;
}

&:focus{
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
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
  font-weight: 500;
  color: #5E5E5E;
  margin-bottom: 2rem;
`

const SignUpCreateBtn = styled.button`
  align-self: stretch;
height: 38px;
border: 1px solid #2C2C2C;
border-radius: 10px;
background: #2C2C2C;
color: #FEFEFE;
font-size: 14px;

&:hover{
background: #000;
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