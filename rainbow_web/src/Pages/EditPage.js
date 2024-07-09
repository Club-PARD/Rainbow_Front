import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { postImgAPI } from "../APIs/AxiosAPI";
import { getDetailAPI } from "../APIs/AxiosAPI";

function EditPage() {
    const params = useParams();
    console.log(params);
    const [result, setResult] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await getDetailAPI(params.postId);
            console.log(response);
            setResult(response);
            setText(response.postContent);
        };

        fetchData();
    },[params])

    console.log(text);

    const contentHandler = (e) =>{
        setText(e.target.value);
    }

    const [imageSrc, setImageSrc] = useState(result.pictureUrl);
    const [imageFile, setImageFile] = useState(result.pictureUrl);
    const inputRef = useRef([]);

    const onUpload = async (e) => {
        const file = e.target.files[0];
    
        if (!file) {
          setImageSrc(result.pictureUrl);
          setImageFile(result.pictureUrl);
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
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      };

    return (
        <Container>
            <ContentWrapper>
                <Title>{result.postTitle}</Title>
                <ImgLabel htmlFor="file-input">
                    <Img src={result.pictureUrl} alt="Img" />
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
                <Content value={text} onChange={contentHandler}></Content>
                <DetailBottomMenu>
                    <CancelBtn>나가기</CancelBtn>
                    <UploadBtn>게시하기</UploadBtn>
                </DetailBottomMenu>
            </ContentWrapper>
        </Container>
    )
}

export default EditPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background-color: #FEFEFE;
`;

const ContentWrapper = styled.div`
  width: 555px;
  max-width: 1200px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const EdleteBtn = styled.div`
//   width: 160px;
//   height: 40px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const CancelBtn = styled.button`
  width: 69px;
  height: 32px;
  margin-right: 10px;
  padding: 8px 16px 8px 16px;
  color: #2C2C2C;
  background-color: inherit;
  border: none;
  font-size: 14px;
  font-weight: 500;
  &:hover{
    cursor: pointer;
  }
`;

const UploadBtn = styled.button`
  width: 81px;
  height: 32px;
  color: #FEFEFE;
  background-color: #2C2C2C;
  border: none;
  border-radius: 8px;
  padding: 8px 16px 8px 16px;
  font-size: 14px;
  font-weight: 500;

  &:hover{
    cursor: pointer;
  }
`;

const Detail = styled.div`
  width: 507px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #C6C6C6;
  border-radius: 8px;
  background-color: #FEFEFE;
  padding: 24px;
`;

const Title = styled.div`
  width: 100%;
  margin-left: 20px;
  font-size: 20px;
  font-weight: 400;
  color: #2C2C2C;
  margin-bottom: 40px;
  display: flex;
  justify-content: left;
`;

const Img = styled.img`
  width: 535px;
  height: 100%;
  border-radius: 8px;
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
`;

const Content = styled.textarea`
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
  margin-top: 16px;
`;

const DetailBottomMenu = styled.div`
  width: 507px;
  display: flex;
  margin-top: 16px;
  justify-content: right;
`;