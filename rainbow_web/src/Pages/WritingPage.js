import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AWS from "aws-sdk";
import styled from "styled-components";
import BlankImage from "../Assets/Img/BlankImage.png";
import { postAPI } from '../APIs/AxiosAPI';

function WritingPage() {
  const location = useLocation();
  const { selectedQuestion, userId, questionIndex } = location.state || {};

  const [imageSrc, setImageSrc] = useState(BlankImage);
  const [imageFile, setImageFile] = useState(null);
  const inputRef = useRef([]);

  const [textContent, setTextContent] = useState('');

  const onUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImageSrc(BlankImage);
      setImageFile(null);
      return;
    }
    const fileExt = file.name.split('.').pop();

    if (!['jpeg', 'png', 'jpg', 'JPG', 'PNG', 'JPEG'].includes(fileExt)) {
      alert('jpg, png, jpg 파일만 업로드가 가능합니다.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageSrc(reader.result || null);
      setImageFile(file);
    };
  };

  const uploadS3 = () => {
    const REGION = process.env.REACT_APP_REGION;
    const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID;
    const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;

    AWS.config.update({
      region: REGION,
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
    });

    const upload = new AWS.S3.ManagedUpload({
      params: {
        ACL: 'public-read',
        Bucket: '버킷명',
        Key: `upload/${imageFile.name}`,
        Body: imageFile,
      }
    });

    return upload.promise();
  };

  const handleUpload = async () => {
    if (!imageFile) {
      alert('이미지를 등록해 주세요.');
      return;
    }

    try {
      const s3Response = await uploadS3();
      console.log("S3 Upload Response:", s3Response);

      const obj = {
        id: userId,
        data: {
          'questionIndex': questionIndex,
          'imageFile': s3Response.Location,
          'text': textContent,
        }
      };
      console.log(obj.data.questionIndex);
      const json = JSON.stringify(obj);
      const response = await postAPI(`${process.env.REACT_APP_SERVER}/api/questions/${userId}/${selectedQuestion.id}/answer`, json);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(selectedQuestion);
    console.log(userId);
  }, []);

  return (
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
      <input
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
      <button type="button" onClick={handleUpload}>게시하기</button>
    </Container>
  );
}

export default WritingPage;

const Container = styled.div`
  width: 555px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  overflow: scroll;
`;

const Img = styled.img`
  width: 535px;
  border: 1px solid #DDD;
  border-radius: 8px;
`;

const ImgLabel = styled.label`
  &:hover {
    cursor: pointer;
    border-radius: 8px;
  }
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
  padding-left: 8px;
`;