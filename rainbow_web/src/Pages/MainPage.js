import React, { useState } from 'react';
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
  //계속 이런식으로
}

Modal.setAppElement('#root');

function MainPage() {
  return (
    <Container>
      <Header />
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