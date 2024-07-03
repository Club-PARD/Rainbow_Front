import React, { useRef, useState } from 'react';
import styled from "styled-components";
import { SignUpLogo } from './SignUpLoco';

//To do List
//비밀번호란에 뭐 입력했는지 보일 수 있게 v
//버튼 누르면 하나의 오브젝트로 console에 띄우기 v
// 오류가 있을 시 해당 input에 포커싱 되게 하기 v
// 포커싱 되는 input의 색깔조정
// 포커싱 되는 input 아래에 에러가 왜 생기는건지 사용자에게 알려주기

function LocalSignUp() {
    //유효성 검사 관련 코드

    //잘못된 Input이 왔을 때, input을 변화시키기 위한 설정
    const emailInput = useRef(null);
    const petNameInput = useRef(null);
    const passWordInput = useRef(null);
    const confirmPassWordInput = useRef(null);

    //Error Message useState
    const [emailMsg, setEmailMsg] = useState('');
    const [petNameMsg, setPetNameMsg] = useState('');
    const [passWordMsg, setPassWordMsg] = useState('');
    const [confirmPassWordMsg, setConfirmPassWordMsg] = useState('');
    

    //회원가입 버튼을 눌렀을 때 빈칸이 있는지 없는지 확인
    //빈칸이 없다면 이메일과 비밀번호의 형식이 올바른 형식인지 확인
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(true);


    const [petName, setPetName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [confirmPassWord, setConfirmPassWord] = useState('');
    const [passWordValid, setPassWordValid] = useState(true);
    const [pwType, setpwType] = useState({
        type: "password",
        visible: false,
    });

    const userInfo = {
        user: {
            email: { email },
            petName: { petName },
            passWord: { passWord },
        }
    }

    const handlePasswordType = (e) => {
        setpwType(() => {
            // 만약 현재 pwType.visible이 false 라면
            if (!pwType.visible) {
                return { type: "text", visible: true };

                //현재 pwType.visible이 true 라면
            } else {
                return { type: "password", visible: false };
            }
        });
    };


    const onEmailHandler = (e) => {
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        // 형식에 맞는 경우 true 리턴
        console.log('이메일 유효성 검사 :: ', regExp.test(e.target.value))
        setEmailValid(regExp.test(e.target.value));
        if(regExp.test(e.target.value)){
            setEmailMsg('');
        }
        setEmail(e.target.value);
    }

    const onPetNameHandler = (e) => {
        var regExp = /^.*$/;
        setPetName(e.target.value);
        if(regExp.test(e.target.value)){
            setPetNameMsg('');
        }
    }

    const onPassWordHandler = (e) => {
        //  8 ~ 10자 영문, 숫자 조합
        var regExp = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,10}$/
        // 형식에 맞는 경우 true 리턴
        console.log('비밀번호 유효성 검사 :: ', regExp.test(e.target.value))
        setPassWordValid(regExp.test(e.target.value));
        if(regExp.test(e.target.value)){
            setPassWordMsg('');
        }
        setPassWord(e.target.value);
    }

    const onConfirmPassWordHandler = (e) => {
        setConfirmPassWord(e.target.value)
        if(passWord == confirmPassWord){
            setConfirmPassWordMsg('');
        }
        setConfirmPassWord(e.target.value);
    }

    const onSubmitHandler = (e) => {
        if (email === '') {
            // alert("이메일을 입력해주세요");
            //emailInput.current.color = "red"
            setEmailMsg("이메일을 입력해주세요");
            return emailInput.current.focus();
        }
        else if (!emailValid) {
            setEmailMsg("이메일의 형식이 올바르지 않습니다");
            return emailInput.current.focus();
        }
        else if (petName === '') {
            setPetNameMsg("애완동물의 이름을 입력해주세요");
            return petNameInput.current.focus();
        }
        else if (passWord === '') {
            setPassWordMsg("비밀번호를 입력해주세요");
            return passWordInput.current.focus();
        }
        else if (confirmPassWord === '') {
            setConfirmPassWordMsg("비밀번호 확인란을 채워주세요");
            return confirmPassWordInput.current.focus();
        }
        else if (!passWordValid) {
            setPassWordMsg("비밀번호는 영문 숫자 특수문자를 포함해야합니다");
            return passWordInput.current.focus();
        }
        else if (passWord !== confirmPassWord) {
            setConfirmPassWordMsg("비밀번호가 일치하지 않습니다!");
            return confirmPassWordInput.current.focus();
        }
        else {
            console.log({ userInfo });
            alert("회원가입이 완료되었습니다!");
        }
    }

    return (
        <Container>
            <SignUpTitle>
                <span><SignUpLogo/>&nbsp;에 오신 것을 환영합니다<br /></span>
                <span>
                    이메일을 입력해주세요
                </span>
            </SignUpTitle>
            <SignUpForm>
                <InputField>
                    <InputTitle>이메일</InputTitle>
                    <SignUpInput type="email" color='' ref={emailInput} onChange={onEmailHandler} onBlur={onEmailHandler} placeholder="type your email" />
                    <ErrorExplain>{emailMsg}</ErrorExplain>
                </InputField>

                <InputField>
                    <InputTitle>반려동물 이름</InputTitle>
                    <SignUpInput type="text" ref={petNameInput} onChange={onPetNameHandler} placeholder="type your pet name" />
                    <ErrorExplain>{petNameMsg}</ErrorExplain>
                </InputField>

                <InputField>
                    <InputTitle>비밀번호</InputTitle>
                    <SignUpInput type={pwType.type} ref={passWordInput} onChange={onPassWordHandler} onBlur={onPassWordHandler} placeholder="type your password" />
                    <ErrorExplain>{passWordMsg}</ErrorExplain>
                </InputField>

                <InputField>
                    <InputTitle>비밀번호 확인</InputTitle>
                    <SignUpInput type="password" ref={confirmPassWordInput}  onChange={onConfirmPassWordHandler} placeholder="check password" />
                    <ErrorExplain>{confirmPassWordMsg}</ErrorExplain>
                </InputField>
                <InputTitle onClick={handlePasswordType}>{pwType.visible ? "비밀번호 숨기기" : "비밀번호 보기"}</InputTitle>
                <SignUpCreateBtn onClick={onSubmitHandler}>회원가입</SignUpCreateBtn>
            </SignUpForm>
        </Container>
    )
}



export default LocalSignUp;


//페이지 전체를 관리하는 css
const Container = styled.div`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

//회원가입 Form
const SignUpForm = styled.div`
display: flex;
width: 450px;
min-width: 320px;
padding: 24px;
flex-direction: column;
align-items: flex-start;
border: 1px solid;
border-radius: 8px;
`

//제목과 Input 태그를 합친 공간
const InputField = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
align-self: stretch;
margin-bottom: 24px;
height: 76px;
`

//Input요소들 제목
const InputTitle = styled.div`
color: var(--grayscale-Black, #2C2C2C);
font-family: "Pretendard Variable";
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 22px;
margin-bottom: 8px;
`

//회원가입 제목 css
const SignUpTitle = styled.div`
display: flex;
padding: 0px 22px 0px 29px;
width: 450px;
flex-direction: column;
align-items: center;
justify-content: center;
font-size: 24px;
font-weight: 500;
margin-bottom: 29px;
text-align: center;
`

//회원가입 input들
const SignUpInput = styled.input`
display: flex;
min-width: 240px;
padding: 12px 16px 12px 16px;
align-items: center;
border-radius: 8px;
align-self: stretch;
border-color: ${(props) => props.color? props.color:"lightgray"};
`

//회원가입 버튼
const SignUpCreateBtn = styled.button`
align-self: stretch;
height: 38px;
border-radius: 10px;
background: #2C2C2C;
color: #FEFEFE;
font-size: 14px;
`

//error 내용 설명해주는 문자
const ErrorExplain = styled.p`
margin-top: 1px;
font-size: 12px;
color: red;
`