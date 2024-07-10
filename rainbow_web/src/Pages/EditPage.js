import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { postImgAPI } from "../APIs/AxiosAPI";
import { getDetailAPI } from "../APIs/PublicAPI";
import { useParams, useNavigate } from "react-router-dom";
import { patchDetailAPI } from "../APIs/PublicAPI";
import Header from "../Components/DetailHeader";

function EditPage() {
    const params = useParams();
    console.log(params);
    const [result, setResult] = useState([]);
    const [text, setText] = useState("");
    const [data, setData] = useState({
        pictureUrl: "",
        postContent: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await getDetailAPI(params.userId, params.postId);
            console.log(response);
            setResult(response);
            setText(response.postContent);
            setImageSrc(response.pictureUrl);
        };

        fetchData();
    }, [params]);

    console.log(text);

    const contentHandler = (e) => {
        setText(e.target.value);
        setData({ ...data, postContent: e.target.value });
    };

    const [imageSrc, setImageSrc] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const inputRef = useRef([]);

    const onUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            setImageSrc(result.pictureUrl);
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
            setData({ ...data, pictureUrl: response.data });
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const navigate = useNavigate();

    const goToMain = () => {
        navigate('/main');
    };

    const patchHandler = async () => {
        try {
            const response = await patchDetailAPI(params.postId, data);
            console.log(response);

            navigate("../main");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container>
            <Header />
            <ContentWrapper>
                <Title>{result.postTitle}</Title>
                <ImgLabel htmlFor="file-input">
                    <Img src={imageSrc || result.pictureUrl} alt="Img" />
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
                    <CancelBtn onClick={goToMain}>나가기</CancelBtn>
                    <UploadBtn onClick={patchHandler}>게시하기</UploadBtn>
                </DetailBottomMenu>
            </ContentWrapper>
        </Container>
    );
}

export default EditPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  overflow: scroll;
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
