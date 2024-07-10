import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Header from '../Components/Header';
import Comment from '../Components/Comment';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import { getPetNameAPI } from '../APIs/RegisterAPI';
import { getCountAPI, getPostDataAPI } from '../APIs/AxiosAPI';
import { UserData } from '../Atom';
import { useRecoilValue } from 'recoil';
import Flowers from '../Components/Flowers';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

function MainPage() {
  const outerDivRef = useRef(); // outerDivRef를 생성하여 DOM 요소에 접근
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태를 관리하는 useState
  const [backgroundOpacity, setBackgroundOpacity] = useState(0); // 배경 불투명도 상태를 관리하는 useState

  const userData = useRecoilValue(UserData);
  const [result, setResult] = useState([]); // 초기 값을 빈 배열로 설정
  const [petName, setPetName] = useState("");

  const handleScroll = () => {
    // 스크롤 이벤트 핸들러 함수
    const { scrollTop, scrollHeight, clientHeight } = outerDivRef.current; // 스크롤 위치 및 높이 정보를 가져옴
    const pageHeight = window.innerHeight;

    const newPage = Math.round(scrollTop / pageHeight) + 1; // 현재 스크롤 위치에 따른 페이지 계산
    if (newPage !== currentPage) {
      setCurrentPage(newPage); // 페이지가 변경되면 상태 업데이트
    }

    const maxScrollTop = scrollHeight - clientHeight; // 최대 스크롤 가능한 높이 계산
    const startDarkeningPoint = maxScrollTop / 2; // 어두워지기 시작하는 지점 설정
    let newOpacity = 0;

    if (scrollTop > startDarkeningPoint) {
      // 스크롤이 어두워지기 시작하는 지점을 넘었을 때
      newOpacity = (scrollTop - startDarkeningPoint) / (maxScrollTop - startDarkeningPoint); // 불투명도 계산
    }

    setBackgroundOpacity(newOpacity); // 배경 불투명도 상태 업데이트
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostDataAPI(userData.user_id);
      setResult(data || []); // 데이터가 없을 경우 빈 배열로 설정
    };
    fetchData();
  }, [userData.user_id]);

  useEffect(() => {
    const outerDivRefCurrent = outerDivRef.current; // DOM 요소 참조 저장
    outerDivRefCurrent.addEventListener("scroll", handleScroll); // 스크롤 이벤트 리스너 추가

    return () => {
      outerDivRefCurrent.removeEventListener("scroll", handleScroll); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, [currentPage]); // currentPage가 변경될 때마다 useEffect 재실행

  const getPetName = async () => {
    console.log(userData.user_id);
    const response = await getPetNameAPI(userData.user_id);
    console.log(response);
    setPetName(response);
  };

  useEffect(() => {
    getPetName();
  }, []);

  return (
    <Container
      ref={outerDivRef}
      className="outer"
      style={{ overflowY: "scroll", scrollBehavior: "smooth", backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})` }}
    >
      <TopBlurr />
      {/* outerDivRef로 참조되는 div 요소, 스크롤 가능, 배경색은 불투명도에 따라 변경 */}

      <Header />
      <Title>기억의 꽃밭은</Title>
      <Explained>
        반려동물과의 소중한 추억을 떠올리며<br />
        한 송이씩 피어나는 '기억의 꽃'으로 채워지는 공간입니다.<br /><br />
        꽃은 추억을 상징하며, 40개의 질문에 답변하면<br />
        사랑과 그리움이 가득한 꽃밭이 완성됩니다.<br /><br />
        {petName} 에 대한 이야기를 들려주세요
      </Explained>
      <Link to="./write" style={{ textDecoration: "none" }}><ToWrite>글 작성하러 가기</ToWrite></Link>
      <Flowers />

      <StyledSwiper
        slidesPerView={3}
        spaceBetween={40}
        navigation
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {result && result.map((data, index) => (
          <StyledSwiperSlide key={index} ima={data.pictureUrl}>
            <Link to={`/detail/${data.postId}`} style={{ textDecoration: 'none', color: 'white', width: '100%', height: '100%', display: 'flex', alignItems: 'end' }}>
              <Text>{data.postTitle}</Text>
            </Link>
          </StyledSwiperSlide>
        ))}
      </StyledSwiper>

      <CommentContainer>
        <Comment />
      </CommentContainer>
      {/* 세 번째 페이지 콘텐츠, Comment 컴포넌트 포함 */}
    </Container>
  );
}

export default MainPage;

const TopBlurr = styled.div`
  width: 100%;
  height: 108px;

  position: fixed;
  top: 0;
  left: 0;

  backdrop-filter:blur(2px);
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  background: radial-gradient(at 50% 50%, #C5AAFF, #FFFFFD, #FFFFFD);
  padding-top: 160px;
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
