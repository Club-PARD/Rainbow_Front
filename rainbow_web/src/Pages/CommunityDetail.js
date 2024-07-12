import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import c_back from "../Assets/Img/c_back.svg";
import c_home from "../Assets/Img/c_home.svg";
import Header from "../Components/DetailHeader";
import { getDetailAPI } from "../APIs/PublicAPI";
import { getAllAPI } from "../APIs/AxiosAPI";
import { getCountAPI } from "../APIs/AxiosAPI";
import { P_Data, UserData } from "../Atom";
import { useRecoilValue } from "recoil";

function DetailPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(null);
  const u_data = useRecoilValue(UserData);

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
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const response = await getDetailAPI(params.userId, params.postId);
      console.log(response);
      setResult(response);
    };

    fetchData();
  }, [params.postId]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllAPI(params.userId);
      const cnt = await getCountAPI(params.userId);
      console.log(response);
      setPosts(response);
      setCount(cnt);
    };

    fetchData();
  }, [params.postId]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToMain = () => {
    navigate(`../main/${u_data.user_id}`);
  };
  
  const goToCommunity = () => {
    navigate(`../community`);
  }

  const goToCommunityMain = () => {
    navigate(`../c_main/${params.userId}`);
  }

  const handleNext = () => {
    const currentIndex = result.index;
    if (currentIndex < count) {
      navigate(`/c_detail/${params.userId}/${posts[currentIndex].postId}`)
    } else {
      alert('마지막 게시물입니다.');
    }
  };

  const handlePrevious = () => {
    const currentIndex = result.index;
    console.log(currentIndex);
    if (currentIndex - 1 > 0) {
      navigate(`/c_detail/${params.userId}/${posts[currentIndex - 2].postId}`);
    } else {
      alert('첫 번째 게시물입니다.');
    }
  };

  return (
    <Container>
      <TopBlurr />
      <Header />
      <ContentWrapper>
        <DetailTopMenu>
          <StyledBackBtn onClick={goToMain} />
        </DetailTopMenu>
        <C_BtnContainer>
          <C_BackBtn onClick={goToCommunity}>
            <p>커뮤니티로  돌아가기</p>
            <BackImg>
              <img src={c_back} alt="Back to community" style={{ width: '100%', height: '100%' }}/>
            </BackImg>
          </C_BackBtn>
          <C_GoBtn onClick={goToCommunityMain}>
            <p>페이지 방문하기</p>
            <HomeImg>
              <img src={c_home} alt="Back to other's mainpage" style={{ width: '100%', height: '100%' }}/>
            </HomeImg>
          </C_GoBtn>
        </C_BtnContainer>
        <Detail>
          <Title>{result.postTitle}</Title>
          <ImgWrapper>
            <Image src={result.pictureUrl} alt="사진" />
          </ImgWrapper>
          <Content>{result.postContent}</Content>
        </Detail>

        <DetailBottomMenu>
          <DetailBottomBtn onClick={handlePrevious}>&larr;&nbsp;&nbsp;Previos</DetailBottomBtn>
          <DetailBottomBtn onClick={handleNext}>Next&nbsp;&nbsp;&rarr;</DetailBottomBtn>
        </DetailBottomMenu>
      </ContentWrapper>
    </Container>
  );
}

export default DetailPage;

const BackImg = styled.div`
  width: 16px;
  height: 16px;
`;

const HomeImg = styled.div`
  width: 16px;
  height: 16px;
`;

const C_BtnContainer = styled.div`
  display: flex;
  width: 556px;
  padding-bottom: 24px;
  gap: 16px;
  margin-left: -50px;
`;

const C_BackBtn = styled.button`
  width : 172px;
  height : 32px;
  display: inline-flex;
  height: 32px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid #C6C6C6;
  background: #FEFEFE;
  color: #2C2C2C;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 106.667% */
  &:hover{
    cursor: pointer;
    background-color: #F3F3F3;
  }
`;

const C_GoBtn = styled.button`
  width : 148px;
  height : 32px;
  display: inline-flex;
  height: 32px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid #C6C6C6;
  background: #FEFEFE;
  color: #2C2C2C;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 106.667% */
  &:hover{
    cursor: pointer;
    background-color: #F3F3F3;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #FEFEFE;
  padding-top: 108px;
  background: radial-gradient(40em 45em at 50% 100%, #DED2F6, #EDE6FA, #FFFFFD, #FFFFFD);
`;

const TopBlurr = styled.div`
  width: 100%;
  height: 108px;

  position: fixed;
  top: 0;
  left: 0;

  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(3px);
  mask: linear-gradient(#FFFFFD, transparent);
`

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailTopMenu = styled.div`
  width: 556px;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledBackBtn = styled.div`
  &:hover{
    cursor: pointer;
  }
`;

const Detail = styled.div`
  width: 556px;
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
  font-size: 20px;
  font-weight: 400;
  color: #2C2C2C;
  margin-bottom: 40px;
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const Image = styled.img`
  border-radius: 6px;
  width: 100%;
  // height: 300px;
  background-size: cover;
`;

const Content = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  color: #2C2C2C;
`;

const DetailBottomMenu = styled.div`
  width: 590px;
  display: flex;
  justify-content: space-between;
  padding-top: 24px;
`;

const DetailBottomBtn = styled.button`
  width: 100px;
  height: 40px;
  color: #2C2C2C;
  background-color: #FEFEFE;
  border: 1px solid #C6C6C6;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  &:hover{
    cursor: pointer;
  }
`;