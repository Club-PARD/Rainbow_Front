import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { postImgAPI } from "../APIs/AxiosAPI";
import { getDetailAPI } from "../APIs/PublicAPI";
import { useParams, useNavigate } from "react-router-dom";
import { patchDetailAPI } from "../APIs/PublicAPI";
import Header from "../Components/EditHeader";
import ExitModal from '../Components/ExitModal';
import { UserData } from "../Atom";
import { useRecoilValue } from "recoil";

function EditPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [result, setResult] = useState({});
    const [text, setText] = useState("");
    const [data, setData] = useState({
        pictureUrl: "",
        postContent: "",
    });
    const [imageSrc, setImageSrc] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const inputRef = useRef([]);
    const userData = useRecoilValue(UserData);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDetailAPI(params.userId, params.postId);
                setResult(response);
                setText(response.postContent);
                setImageSrc(response.pictureUrl);
                setData({
                    pictureUrl: response.pictureUrl,
                    postContent: response.postContent,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [params]);

    useEffect(()=>{
      window.scrollTo(0, 0);
    });

    const contentHandler = (e) => {
        setText(e.target.value);
        setData(prevData => ({ ...prevData, postContent: e.target.value }));
    };

    const onUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            setImageSrc(result.pictureUrl);
            setImageFile(null);
            setData(prevData => ({ ...prevData, pictureUrl: result.pictureUrl }));
            return;
        }

        const fileExt = file.name.split('.').pop();

        if (!['jpeg', 'png', 'jpg', 'JPG', 'PNG', 'JPEG'].includes(fileExt)) {
            alert('jpg, png, jpg 파일만 업로드가 가능합니다.');
            setImageSrc(result.pictureUrl);
            setImageFile(null);
            setData(prevData => ({ ...prevData, pictureUrl: result.pictureUrl }));
            return;
        }

        setImageSrc(URL.createObjectURL(file));
        setImageFile(file);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await postImgAPI(formData);
            setData(prevData => ({ ...prevData, pictureUrl: response.data }));
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const patchHandler = async () => {
        try {
            await patchDetailAPI(params.postId, data);
            alert("수정되었습니다");
            navigate(`../main/${userData.user_id}`);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const goToMain = () => {
        navigate(`../main/${userData.user_id}`);
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
                    onChange={onUpload}
                    style={{ display: 'none' }}
                />
                <Content value={text} onChange={contentHandler}></Content>
                <DetailBottomMenu>
                    <CancelBtn onClick={openModal}>나가기</CancelBtn>
                    <UploadBtn onClick={patchHandler}>수정하기</UploadBtn>
                </DetailBottomMenu>
            </ContentWrapper>
            <ExitModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                onExit={goToMain}
            />
        </Container>
    );
}

export default EditPage;

// const TopBlurr = styled.div`
//   width: 100%;
//   height: 108px;
//   position: fixed;
//   top: 0;
//   left: 0;
//   background-color: rgba(255, 255, 255, 0.7);
//   backdrop-filter: blur(3px);
//   mask: linear-gradient(#FFFFFD, transparent);
// `;

const Container = styled.div`
  display: flex;
  padding-top: 10vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  overflow: scroll;
  background: radial-gradient(40em 45em at 50% 100%, #DED2F6, #EDE6FA, #FFFFFD, #FFFFFD);
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
  &:hover {
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
  &:hover {
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
  border: 1px solid #DDDDDD;
  &:hover {
    cursor: pointer;
    border: 1px solid #C6C6C6;
  }
`;

const ImgLabel = styled.label`
  width: 535px;
  height: 100%;
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
  width: 540px;
  height: 32px;
  display: flex;
  margin-top: 16px;
  justify-content: right;
`;
