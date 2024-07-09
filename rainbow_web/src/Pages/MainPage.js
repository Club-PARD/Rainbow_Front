import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Header from '../Components/Header';
import Comment from '../Components/Comment';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import mainTest from '../Assets/Img/mainTest.png';
import mainTest2 from '../Assets/Img/mainTest2.png';
import mainTest3 from '../Assets/Img/mainTest3.png';
import { getPetNameAPI } from '../APIs/RegisterAPI';
import { getCountAPI } from '../APIs/AxiosAPI';
import { PostCount, UserData } from '../Atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Flowers from '../Components/Flowers';
import { Link } from 'react-router-dom';

const postData = {
  id: {
    title: "무떡 웹파트",
    img: mainTest,
  },
  id2: {
    title: "화이팅",
    img: mainTest2
  },
  id3: {
    title: "만만세",
    img: mainTest3
  },
  id4: {
    title: "무떡 웹파트",
    img: mainTest,
  },
  id5: {
    title: "화이팅",
    img: mainTest2
  },
  id6: {
    title: "만만세",
    img: mainTest3
  },
  // 계속 이런식으로
}

Modal.setAppElement('#root');

function MainPage() {
  const userData = useRecoilValue(UserData);
  const [petName, setPetName] = useState("");
  const [postCount, setPostCount] = useRecoilState(PostCount);

  const getPetName = async () => {
    console.log(userData.user_id);
    const response = await getPetNameAPI(userData.user_id);
    console.log(response);
    setPetName(response);
  };

  const getPostCount = async () => {
    const response = await getCountAPI(userData.user_id);
    console.log(response);
    setPostCount(response);
  };
  
  useEffect(() => {
    getPostCount();
    getPetName();
  }, []);
  
  return (
    <Container>
      <Header />
      <Title>기억의 꽃밭은</Title>
      <Explained>
          반려동물과의 소중한 추억을 떠올리며<br/>
          한 송이씩 피어나는 '기억의 꽃'으로 채워지는 공간입니다.<br/><br/>
          꽃은 추억을 상징하며, 40개의 질문에 답변하면<br/>
          사랑과 그리움이 가득한 꽃밭이 완성됩니다.<br/><br/>
          {petName} 에 대한 이야기를 들려주세요
      </Explained>
      <Link to="./write" style={{textDecoration: "none"}}><ToWrite>글 작성하러 가기</ToWrite></Link>
      <Flowers postCount={postCount} />
      <StyledSwiper
        slidesPerView={3}
        spaceBetween={40}
        navigation
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {Object.entries(postData).map(([key, value]) => (
          <StyledSwiperSlide key={key} ima={value.img}>
            <Text>{value.title}</Text>
          </StyledSwiperSlide>
        ))}
      </StyledSwiper>
      <CommentContainer>
        <Comment />
      </CommentContainer>
    </Container>
  );
}

export default MainPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: radial-gradient(at 50% 50%, #C5AAFF, #FFFFFD, #FFFFFD);
`;

const Title = styled.div`
  width: 362px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: #2C2C2C;
  font-family: "Geist Mono";
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
`;

const Explained = styled.div`
  width: 362px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  margin: 16px;
`;

const ToWrite = styled.div`
  width: 362px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  font-size: 16px;
  color: #8952FF;
  &:hover {
    color: #6A3CCA;
  }
`;

const StyledSwiper = styled(Swiper)`
  width: 918px;
  height: 318px;
  padding: 10px;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  width: 246px !important;
  height: 298px !important;
  margin-right: 40px;
  border-radius: 6px;
  background-image: url(${(props) => props.ima});
  background-position: center;
  background-size: cover;
  color: white;
  display: flex;
  align-items: end;
  background-repeat: no-repeat;
  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.div`
  width: 246px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 0 0 6px 6px;
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 757px;
`;
