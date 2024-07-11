import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import BlankImage from '../Assets/Img/BlankImage.png';
import WriteHeader from '../Components/WriteHeader';
import { postImgAPI, postAPI } from '../APIs/AxiosAPI';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserData, Increased } from '../Atom';
import ExitModal from '../Components/ExitModal';

Modal.setAppElement('#root');

function WritingPage() {
  const [isIncreased, setIsIncreased] = useRecoilState(Increased);
  const location = useLocation();
  const { selectedQuestion, questionIndex } = location.state || {};

  const userData = useRecoilValue(UserData);

  const [imageSrc, setImageSrc] = useState(BlankImage);
  const [imageFile, setImageFile] = useState(null);
  const inputRef = useRef(null);

  const [textContent, setTextContent] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [data, setData] = useState({
    postTitle: "",
    pictureUrl: "",
    postContent: "",
  });

  const navigate = useNavigate();

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

  const goToMain = () => {
    navigate(`../main/${userData.user_id}`);
  };

  const onTextContentHandler = (e) => {
    setTextContent(e.target.value);
    setData({...data, postContent: e.target.value});
  };

  const onQuestionHandler = () => {
    setData({...data, postTitle: selectedQuestion.questionText});
  };

  const onUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setImageSrc(BlankImage);
      setImageFile(null);
      setData({...data, pictureUrl: ""});
      return;
    }

    setImageSrc(URL.createObjectURL(file));
    setImageFile(file);

    const fileExt = file.name.split('.').pop();

    if (!['jpeg', 'png', 'jpg', 'JPG', 'PNG', 'JPEG'].includes(fileExt)) {
      alert('jpg, png, jpeg 파일만 업로드가 가능합니다.');
      setImageSrc(BlankImage);
      setImageFile(null);
      setData({...data, pictureUrl: ""});
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await postImgAPI(formData);
      setData({...data, pictureUrl: response.data});
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      setImageSrc(BlankImage);
      setImageFile(null);
      setData({...data, pictureUrl: ""});
    }
  };

  const handleUpload = async () => {
    if (data.pictureUrl === "") {
      alert('이미지를 등록해 주세요.');
      return;
    }
    console.log(data);
    try {
      const response = await postAPI(userData.user_id, data);
      console.log(response);
      if(response){
        setIsIncreased(true);
      }
      alert("게시가 완료되었습니다");
      navigate(`../main/${userData.user_id}`);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(selectedQuestion);
    onQuestionHandler();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
      <Container>
        <InputContainer>
        <WriteHeader />
        {selectedQuestion ? (
          <QuestionText>{selectedQuestion.questionText}</QuestionText>
        ) : (
          <QuestionText>질문이 선택되지 않았습니다.</QuestionText>
        )}
        <ImgLabel htmlFor="file-input">
          <Img src={imageSrc} alt="Img" />
        </ImgLabel>
        <StyledInput
          id="file-input"
          accept="image/*"
          type="file"
          ref={inputRef}
          onChange={e => onUpload(e)}
          style={{ display: 'none' }}
        />
        <Textarea
          placeholder="사진과 글을 올릴 수 있습니다."
          value={textContent}
          onChange={onTextContentHandler}
        />
        <ButtonContainer>
          <ExitButton type="button" onClick={openModal}>나가기</ExitButton>
          <SubmitButton disabled={ !data.postTitle || !data.pictureUrl || !data.postContent} type="button" onClick={handleUpload}>게시하기</SubmitButton>
        </ButtonContainer>

        <ExitModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          onExit={goToMain}
        />
        </InputContainer>
      </Container>
  );
}

export default WritingPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  height: auto;
  background: radial-gradient(40em 45em at 50% 100%, #DED2F6, #EDE6FA, #FFFFFD, #FFFFFD);
`;

const Img = styled.img`
  width: 535px;
  border: 1px solid #DDD;
  border-radius: 8px;
  &:hover {
    cursor: pointer;
    border: 1px solid #C6C6C6;
  }
`;

const ImgLabel = styled.label`
  margin-bottom: 16px;
`;

const StyledInput = styled.input`
  width: 535px;
  height: auto;
`;

const Textarea = styled.textarea`
  width: 507px;
  min-height: 244px;
  height: auto;
  font-family: "Pretendard-Regular";
  font-size: 16px;
  color: #2C2C2C;
  background-color: #FEFEFE;
  border: solid 1px #DDD;
  border-radius: 8px;
  padding: 12px 16px;
  outline: #B0B0B0;
  margin-bottom: 16px;
  resize: none;
`;

const QuestionText = styled.div`
  display: flex;
  justify-content: left;
  padding-left: 15px;
  color: #2C2C2C;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 120% */
  align-self: flex-start;
  margin-bottom: 16px;
  width: 555px;
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
  width: 69px;
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
  &:hover{
    cursor: pointer;
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
  &:hover{
    cursor: pointer;
  }

  &:disabled {
  background-color: #DDDDDD;
  color: #9B9B9B;
  cursor: not-allowed;
  }
`;

const InputContainer = styled.div`
width: 555px;
padding: 24px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 10vh;
`
