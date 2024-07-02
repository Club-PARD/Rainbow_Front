import React, {useState} from 'react';
import styled from "styled-components";

//To do List
//비밀번호란에 뭐 입력했는지 보일 수 있게
//버튼 누르면 하나의 오브젝트로 console에 띄우기

function LocalSignUp(){
    //유효성 검사 관련 코드
    //회원가입 버튼을 눌렀을 때 빈칸이 있는지 없는지 확인
    //빈칸이 없다면 이메일과 비밀번호의 형식이 올바른 형식인지 확인
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(true);

    const [petName, setPetName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [confirmPassWord, setConfirmPassWord] = useState('');
    const [passWordValid, setPassWordValid] = useState(true);


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

    const onPassWordHandler = (e) => {
        //  8 ~ 10자 영문, 숫자 조합
        var regExp = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,10}$/
        // 형식에 맞는 경우 true 리턴
        console.log('비밀번호 유효성 검사 :: ', regExp.test(e.target.value))
        setPassWordValid(regExp.test(e.target.value));
        setPassWord(e.target.value);
    }

    const onConfirmPassWordHandler = (e) => {
        setConfirmPassWord(e.target.value);
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
        else if(passWord == ''){
            alert("비밀번호를 입력해주세요");
        }
        else if(confirmPassWord == ''){
            alert("비밀번호 확인란을 채워주세요");
        }
        else if(!passWordValid){
            alert("비밀번호는 영문 숫자 특수문자를 포함해야합니다");
        }
        else if(passWord != confirmPassWord){
            alert("비밀번호가 일치하지 않습니다!");
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
            <SignUpInput type="password" onChange={onPassWordHandler} onBlur={onPassWordHandler} placeholder="패스워드"/>
            <SignUpInput type="password" onChange={onConfirmPassWordHandler} placeholder="패스워드 확인"/>
            <SignUpCreateBtn onClick={onSubmitHandler}>Create account</SignUpCreateBtn>
        </Container>
    )
}

export default LocalSignUp;


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