import styled from "styled-components";
import { useState } from "react";

function GoogleSignUp(){
    //유효성 검사 관련 코드
    //회원가입 버튼을 눌렀을 때 빈칸이 있는지 없는지 확인
    //빈칸이 없다면 이메일과 비밀번호의 형식이 올바른 형식인지 확인
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(true);

    const [petName, setPetName] = useState('');
    


    const onEmailHandler = (e) => {
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        // 형식에 맞는 경우 true 리턴
        console.log('이메일 유효성 검사 :: ', regExp.test(e.target.value))
        setEmailValid(regExp.test(e.target.value));
        setEmail(e.target.value);
    }

    const onPetNameHandler = (e) => {
        setPetName(e.target.value);
    }

    const onSubmitHandler = (e) => {
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
            alert("회원가입이 완료되었습니다!");
        }
    }

    return(
        <Container>
            <SignUpTitle>회원가입</SignUpTitle>
            <SignUpInput type="email" onChange={onEmailHandler} onBlur={onEmailHandler} placeholder="이메일"/>
            <SignUpInput type="text" onChange={onPetNameHandler} placeholder="반려동물 이름"/>
            <SignUpCreateBtn onClick={onSubmitHandler}>Create account</SignUpCreateBtn>
        </Container>
    )
}

//페이지 전체를 관리하는 css
const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
//회원가입 제목 css
const SignUpTitle = styled.p`
font-size: 48px;
font-weight: 900;
`
//회원가입 input들
const SignUpInput = styled.input`
width: 713px;
height: 73px;
border-radius: 10px;
background-color: #D9D9D9;
margin-bottom: 72px;
`
//회원가입 버튼
const SignUpCreateBtn = styled.button`
width: 402px;
height: 73px;
border-radius: 10px;
background: #D9D9D9;
`

export default GoogleSignUp;


