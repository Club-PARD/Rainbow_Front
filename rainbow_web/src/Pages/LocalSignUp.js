import React, { useRef, useState } from 'react';
import styled from "styled-components";
import LoginHeader from '../Components/LoginHeader';
import { postMemberAPI } from '../APIs/RegisterAPI';
import { useNavigate } from 'react-router-dom';

function LocalSignUp() {
    //유효성 검사 관련 코드
//
    //잘못된 Input이 왔을 때, input을 변화시키기 위한 설정
    const emailInput = useRef(null);
    const nickNameInput = useRef(null);
    const petNameInput = useRef(null);
    const passWordInput = useRef(null);
    const confirmPassWordInput = useRef(null);

    //Error Message useState
    const [emailMsg, setEmailMsg] = useState('');
    const [nickNameMsg, setNickNameMsg] = useState('');
    const [petNameMsg, setPetNameMsg] = useState('');
    const [passWordMsg, setPassWordMsg] = useState('');
    const [confirmPassWordMsg, setConfirmPassWordMsg] = useState('');
    

    //회원가입 버튼을 눌렀을 때 빈칸이 있는지 없는지 확인
    //빈칸이 없다면 이메일과 비밀번호의 형식이 올바른 형식인지 확인
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [nickName, setNickName] = useState('');
    const [petName, setPetName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [confirmPassWord, setConfirmPassWord] = useState('');
    const [passWordValid, setPassWordValid] = useState(true);
    const [pwType, setpwType] = useState({
        type: "password",
        visible: false,
    });

    const [newData, setNewData] = useState({
        nickName: '',
        email: '',
        password: '',
        petName: '',
      });

    const navigate = useNavigate();

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
            setEmailColor(null);
            setEmailMsg('');
        }
        setEmail(e.target.value);
        setNewData({ ...newData, email: e.target.value })
    }

    const onNickNameHandler = (e) => {
        var regExp = /^.*$/;
        setNickName(e.target.value);
        if(regExp.test(e.target.value)){
            setNickNameColor(null);
            setNickNameMsg('');
        }
        setNewData({ ...newData, name: e.target.value })
    }

    const onPetNameHandler = (e) => {
        var regExp = /^.*$/;
        setPetName(e.target.value);
        if(regExp.test(e.target.value)){
            setPetNameColor(null);
            setPetNameMsg('');
        }
        setNewData({ ...newData, petName: e.target.value })
    }

    const onPassWordHandler = (e) => {
        //  8 ~ 10자 영문, 숫자 조합
        var regExp = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,30}$/
        // 형식에 맞는 경우 true 리턴
        console.log('비밀번호 유효성 검사 :: ', regExp.test(e.target.value))
        setPassWordValid(regExp.test(e.target.value));
        if(regExp.test(e.target.value)){
            setPassWordColor(null);
            setPassWordMsg('');
        }
        setPassWord(e.target.value);
        setNewData({ ...newData, password: e.target.value })
    }

    const onConfirmPassWordHandler = (e) => {
        setConfirmPassWord(e.target.value)
        if(passWord == e.target.value){
            setConfirmPassWordColor(null);
            setConfirmPassWordMsg('');
        }
    }

    // if (email === '') {
    //     // alert("이메일을 입력해주세요");
    //     //emailInput.current.color = "red"
    //     setEmailMsg("이메일을 입력해주세요");
    //     emailInput.current.color = 'red';
    //     return emailInput.current.focus();
    // }
    // else 
    // else if (passWord === '') {
    //     setPassWordMsg("비밀번호를 입력해주세요");
    //     return passWordInput.current.focus();
    // }
    // else if (confirmPassWord === '') {
    //     setConfirmPassWordMsg("비밀번호 확인란을 채워주세요");
    //     return confirmPassWordInput.current.focus();
    // }


    const onSubmitHandler = async (e) => {
        if (email === '' || !emailValid) {
            setEmailMsg("이메일의 형식이 올바르지 않습니다");
            setEmailColor("red");
            return emailInput.current.focus();
        }
        else if (nickName === '') {
            setNickNameMsg("닉네임을 입력해주세요");
            setNickNameColor("red");
            return nickNameInput.current.focus();
        }
        else if (petName === '') {
            setPetNameMsg("애완동물의 이름을 입력해주세요");
            setPetNameColor("red");
            return petNameInput.current.focus();
        }
        else if (passWord === '' || !passWordValid) {
            setPassWordMsg("비밀번호는 8글자 이상인 영문 숫자 특수문자를 포함한 문자여야합니다");
            return passWordInput.current.focus();
        }
        else if (confirmPassWord === '' || passWord !== confirmPassWord) {
            setConfirmPassWordMsg("비밀번호가 일치하지 않습니다!");
            return confirmPassWordInput.current.focus();
        }
        else {
            console.log( newData );
            try {
                const response = await postMemberAPI(newData);
                  console.log(response);
                if(response.success === false){
                    setNickNameMsg("이미 사용 중인 닉네임입니다");
                    setNickNameColor("red");
                    return nickNameInput.current.focus();
                }
                else {
                    alert("회원가입이 완료되었습니다!");
                    navigate("../login");
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    const [emailColor, setEmailColor] = useState(null);
    const [nickNameColor, setNickNameColor] = useState(null);
    const [petNameColor, setPetNameColor] = useState(null);
    const [passWordColor, setPassWordColor] = useState(null);
    const [confirmPassWordColor, setConfirmPassWordColor] = useState(null);

    return (
        <Container>
            <LoginHeader/>
            <SignUpTitle>
                <span>Sincerely, 에 오신 것을 환영합니다<br /></span>
                <span>
                    이메일을 입력해주세요
                </span>
            </SignUpTitle>
            <SignUpForm>
                <InputField>
                    <InputTitle>이메일</InputTitle>
                    <SignUpInput type="email" color={emailColor} ref={emailInput} onChange={onEmailHandler} onBlur={onEmailHandler} placeholder="type your email" />
                    <ErrorExplain>{emailMsg}</ErrorExplain>
                </InputField>

                <InputField>
                    <InputTitle>닉네임 입력</InputTitle>
                    <SignUpInput type="text" color={nickNameColor} ref={nickNameInput} onChange={onNickNameHandler} onBlur={onNickNameHandler} placeholder="type your nickname" />
                    <ErrorExplain>{nickNameMsg}</ErrorExplain>
                </InputField>

                <InputField>
                    <InputTitle>반려동물 이름</InputTitle>
                    <SignUpInput type="text" color={petNameColor} ref={petNameInput} onChange={onPetNameHandler} placeholder="type your pet name" />
                    <ErrorExplain>{petNameMsg}</ErrorExplain>
                </InputField>

                <InputField>
                    <InputTitle>비밀번호</InputTitle>
                    <SignUpInput type={pwType.type} color={passWordColor} ref={passWordInput} onChange={onPassWordHandler} onBlur={onPassWordHandler} placeholder="type your password" />
                    <ErrorExplain>{passWordMsg}</ErrorExplain>
                </InputField>

                <InputField>
                    <InputTitle>비밀번호 확인</InputTitle>
                    <SignUpInput type="password" color={confirmPassWordColor} ref={confirmPassWordInput}  onChange={onConfirmPassWordHandler} placeholder="check password" />
                    <ErrorExplain>{confirmPassWordMsg}</ErrorExplain>
                </InputField>
                <InputTitle onClick={handlePasswordType}>{pwType.visible ? "비밀번호 숨기기" : "비밀번호 보기"}</InputTitle>
                <SignUpCreateBtn onClick={onSubmitHandler}>회원가입</SignUpCreateBtn>
            </SignUpForm>
            <Footer>
                계속 진행할 경우 Sincerely,의 개인정보 약관<br />
                및 이용정책에 동의하는 것으로 간주됩니다.
            </Footer>
        </Container>
    )
}



export default LocalSignUp;


//페이지 전체를 관리하는 css
const Container = styled.div`
width: 100vw;
min-height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

color: #2C2C2C;
font-size: 0.9rem;
padding: 25px;
`

// calc(100vw * 450 / 1920);
// calc(100vw * 320 / 1920);

//회원가입 Form
const SignUpForm = styled.div`
display: flex;
width: 362px;
min-width: 320px;
height: 534px;
padding: 16px;
flex-direction: column;
align-items: flex-start;
border: 1px solid #C6C6C6;
border-radius: 8px;
background-color: #FFFFFF;
box-shadow: 0px 20px 25px -5px rgba(0, 0, 0, 0.10), 0px 8px 10px -6px rgba(0, 0, 0, 0.10);
`

//제목과 Input 태그를 합친 공간
const InputField = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
align-self: stretch;
margin: 8px;
height: 76px;
`

//Input요소들 제목
const InputTitle = styled.div`
color: #2C2C2C;
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
padding-left: 29px;
padding-right: 22px;
width: 362px;
height: 60px;
flex-direction: column;
align-items: center;
justify-content: center;
font-size: 20px;
font-weight: 400;
margin-top: 90px;
margin-bottom: 32px;
text-align: center;
font-family: "GeistMono";
`

//회원가입 input들
const SignUpInput = styled.input`
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

//회원가입 버튼
const SignUpCreateBtn = styled.button`
align-self: stretch;
height: 38px;
border-radius: 10px;
background: #2C2C2C;
color: #FEFEFE;
font-size: 14px;

&:hover{
background: #000;
cursor: pointer;
}
`

//error 내용 설명해주는 문자
const ErrorExplain = styled.p`
margin-top: 1px;
font-size: 12px;
color: red;
`
//Footer
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
  font-family: "Pretendard-Regular";
  font-weight: 500;
  color: #5E5E5E;
  margin-top: 69px;
`