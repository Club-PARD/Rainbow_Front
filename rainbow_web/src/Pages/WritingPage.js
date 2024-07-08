import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AWS from "aws-sdk";
import styled from "styled-components";
import Modal from 'react-modal';
import BlankImage from "../Assets/Img/BlankImage.png";
import Header from '../Components/Header';
import { postAPI } from '../APIs/AxiosAPI';
import { postImgAPI } from '../APIs/AxiosAPI';

Modal.setAppElement('#root');

function WritingPage() {
  const location = useLocation();
  const { selectedQuestion, userId, questionIndex } = location.state || {};

  const [imageSrc, setImageSrc] = useState(BlankImage);
  const [imageFile, setImageFile] = useState(null);
  const inputRef = useRef([]);

  const [textContent, setTextContent] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate();

  const goToMain = () => {
    navigate('/main');
  };

  const onUpload = async(e) => {
    const file = e.target.files[0];
    
    if (!file) {
      setImageSrc(BlankImage);
      setImageFile(null);
      return;
    }

    setImageSrc(URL.createObjectURL(file));
    setImageFile(file);

    const fileExt = file.name.split('.').pop();

    if (!['jpeg', 'png', 'jpg', 'JPG', 'PNG', 'JPEG'].includes(fileExt)) {
      alert('jpg, png, jpg 파일만 업로드가 가능합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try{
      const response = await postImgAPI(formData);
      console.log(response.data);
    } catch(error){
      console.error('Error uploading file:', error);
    }
  };

  useEffect(() => {
    console.log(selectedQuestion);
    console.log(userId);
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Div>
      <Header />
    <Container>
      {selectedQuestion ? (
        <QuestionText>{selectedQuestion.questionText}</QuestionText>
      ) : (
        <QuestionText>질문이 선택되지 않았습니다.</QuestionText>
      )}
      <ImgLabel htmlFor="file-input">
        <Img
          src={imageSrc}
          alt="Img"
        />
      </ImgLabel>
      <StyledInput
        id="file-input"
        accept="image/*"
        multiple
        type="file"
        ref={el => (inputRef.current[0] = el)}
        onChange={e => onUpload(e)}
        style={{ display: 'none' }}
      />
      <Textarea
        placeholder="사진과 글을 올릴 수 있습니다."
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
      />
      <ButtonContainer>
        <ExitButton type="button" onClick={openModal}>나가기</ExitButton>
        <SubmitButton type="button">게시하기</SubmitButton>
      </ButtonContainer>

      <StyledModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Exit Confirmation"
      >
        <ModalContent>
          <h2>지금 나가시겠어요?</h2>
          <p>작나가시면 지금까지 작성된<br/>내용은 저장되지 않습니다.</p>
          <ButtonGroup>
            <StyledButton onClick={closeModal}>취소</StyledButton>
            <StyledButton onClick={() => { closeModal(); goToMain(); }}>나가기</StyledButton>
          </ButtonGroup>
        </ModalContent>
      </StyledModal>
    </Container>
    </Div>
  );
}

export default WritingPage;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Container = styled.div`
  width: 1280px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  overflow: scroll;
`;

const Img = styled.img`
  width: 535px;
  height: 100%;
`;

const ImgLabel = styled.label`
width: 535px;
height: 100%;
border: 1px solid #DDDDDD;
border-radius: 8px;
  &:hover {
    cursor: pointer;
    border: 1px solid #C6C6C6;
  }
`;

const StyledInput = styled.input`
width: 535px;
height: auto;
`

const Textarea = styled.textarea`
  width: 507px;
  min-height: 244px;
  height: auto;
  font-size: 16px;
  color: #2C2C2C;
  background-color: #FEFEFE;
  border: solid 1px #DDD;
  border-radius: 8px;
  padding: 12px 16px;
  outline: #B0B0B0;
`;

const QuestionText = styled.p`
  color: #2C2C2C;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 120% */
  align-self: flex-start;
  padding-left: 375px;
`;

const ButtonContainer = styled.div`
  width: 540px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  overflow: scroll;
`;

const ExitButton = styled.button`
  width: 81px;
  height: 32px;
  padding: 8px 16px;
  background-color: rgba(0, 0, 0, 0);
  color: #2C2C2C;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 114.286% */
  border: none;
  border-radius: 8px;
  &:hover {
    background: #F3F3F3;
  }
`;

const SubmitButton = styled.button`
  width: 81px;
  height: 32px;
  padding: 8px 16px;
  background-color: #2C2C2C;
  color: #FEFEFE;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 114.286% */
  border: none;
  border-radius: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-left: 190px;
  gap: 10px;
`;

const StyledButton = styled.button`
  width: 75px;
  height: 40px;
  padding: 8px 16px;
  background-color: #2C2C2C;
  color: #FEFEFE;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #1e1e1e;
  }
`;

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);

  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 346px;
    height: 240px;
    padding: 32px;
    border-radius: 8px;
    background: white;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
  color: #2C2C2C;

  h2 {
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 28.8px */
    letter-spacing: -0.48px;
  }

  p {
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
  }
`;