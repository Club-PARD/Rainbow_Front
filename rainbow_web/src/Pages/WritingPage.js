import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import BlankImage from '../Assets/Img/BlankImage.png';
import WriteHeader from '../Components/WriteHeader';
import { postImgAPI, postAPI } from '../APIs/AxiosAPI';
import { useRecoilValue } from 'recoil';
import { UserData } from '../Atom';
import ExitModal from '../Components/ExitModal';

Modal.setAppElement('#root');

function WritingPage() {
  const location = useLocation();
  const { selectedQuestion, questionIndex } = location.state || {};

  const userData = useRecoilValue(UserData);

  const [imageSrc, setImageSrc] = useState(BlankImage);
  const [imageFile, setImageFile] = useState(null);
  const inputRef = useRef([]);

  const [pictureLink, setPictureLink] = useState("");

  const [textContent, setTextContent] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  let [data, setData] = useState({
    "postTitle": "",
    "pictureURL": "",
    "postContent": "",
  });

  const navigate = useNavigate();

  const goToMain = () => {
    navigate('/main');
  };

  // image upload
  const onUpload = async (e) => {
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

    try {
      const response = await postImgAPI(formData);
      console.log(response.data);
      setPictureLink(response.data);
      console.log(pictureLink);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // post upload
  const handleUpload = () => {
    // if (pictureLink == "") {
    //   alert('이미지를 등록해 주세요.');
    //   return;
    // }
    console.log(pictureLink);

    setData({...data,
      "postTitle": selectedQuestion.questionText,
      "pictureURL": pictureLink,
      "postContent": textContent,
    });

    console.log(data);
    handlePost();
  };

  const handlePost = async () => {
    try {
      const response = await postAPI(userData.user_id, data);
      console.log(response);

      navigate("../main");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log(selectedQuestion);
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Div>
      <WriteHeader />
      <Container>
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
          multiple
          type="file"
          ref={el => (inputRef.current[0] = el)}
          onChange={e => onUpload(e)}
          style={{ display: 'none' }}
        />
        <Textarea
          placeholder="사진과 글을 올릴 수 있습니다."
          value={textContent}
          onChange={e => setTextContent(e.target.value)}
        />
        <ButtonContainer>
          <ExitButton type="button" onClick={openModal}>나가기</ExitButton>
          <SubmitButton type="button" onClick={handleUpload}>게시하기</SubmitButton>
        </ButtonContainer>

        <ExitModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          onExit={goToMain}
        />
      </Container>
    </Div>
  );
}

export default WritingPage;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

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
  // height: 100%;
  border: 1px solid #DDD;
  border-radius: 8px;
  &:hover {
    cursor: pointer;
    border: 1px solid #C6C6C6;
  }
`;

const ImgLabel = styled.label`
  // width: 535px;
  // height: 100%;
`;

const StyledInput = styled.input`
  width: 535px;
  height: auto;
  border
`;

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