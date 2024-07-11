import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from "styled-components";

import { motion } from "framer-motion";
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { getPetNameAPI } from '../APIs/RegisterAPI';
import { getAllAPI } from '../APIs/AxiosAPI';
import { UserData } from '../Atom';

import Modal from 'react-modal';
import Header from '../Components/Header';
import Comment from '../Components/Comment';
import Flowers from '../Components/Flowers';
import FlowerCount from '../Components/FlowerCount';
import WriteBtn2 from '../Components/WriteBtn2';

Modal.setAppElement('#root');

function MainPage() {
  const userData = useRecoilValue(UserData);
  const [result, setResult] = useState([]);
  const [petName, setPetName] = useState("");
  const [scrollY, setScrollY] = useState(0);

  //어두워지는 코드
  const outerDivRef = useRef(); // outerDivRef를 생성하여 DOM 요소에 접근
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태를 관리하는 useState
  const [backgroundOpacity, setBackgroundOpacity] = useState(0); // 배경 불투명도 상태를 관리하는 useState

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllAPI(userData.user_id);
      setResult(data || []);
    };
    fetchData();
  }, [userData.user_id]);

  const getPetName = async () => {
    console.log(userData.user_id);
    const response = await getPetNameAPI(userData.user_id);
    console.log(response);
    setPetName(response);
  };

  useEffect(() => {
    getPetName();
  }, []);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  //어두워지는 코드
  useEffect(() => {
    // 컴포넌트가 마운트될 때와 currentPage가 변경될 때마다 실행되는 useEffect
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

    const outerDivRefCurrent = outerDivRef.current; // DOM 요소 참조 저장
    outerDivRefCurrent.addEventListener("scroll", handleScroll); // 스크롤 이벤트 리스너 추가

    return () => {
      outerDivRefCurrent.removeEventListener("scroll", handleScroll); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, [currentPage]); // currentPage가 변경될 때마다 useEffect 재실행

  return (
    <OuterDiv
      ref={outerDivRef}
      backgroundOpacity={backgroundOpacity}
    >
      <Container>
      {/* outerDivRef로 참조되는 div 요소, 스크롤 가능, 배경색은 불투명도에 따라 변경 */}
      <Header />
      <InnerDiv>
      {/* {(backgroundOpacity < 0.2) && <TopBlurr />} */}
      <TopBlurr />
      <ExplainWrapper>
        <Title>기억의 꽃밭은</Title>
        <Explained>
          반려동물과의 소중한 추억을 떠올리며<br />
          한 송이씩 피어나는 '기억의 꽃'으로 채워지는 공간입니다.<br /><br />
          꽃은 추억을 상징하며, 40개의 질문에 답변하면<br />
          사랑과 그리움이 가득한 꽃밭이 완성됩니다.<br /><br />
          {petName} 에 대한 이야기를 들려주세요
        </Explained>
        <WriteBtn2 />
      </ExplainWrapper>
      
      <FlowersWrapper>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 2,
            y : { duration: 1},
          }}
        >
          <Flowers />
        </motion.div>
      </FlowersWrapper>

      {/* <StickyWrapper> */}
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
                ease: "easeInOut",
                duration: 2,
                y: { duration: 1 },
            }}
        >
          <FlowerCount />
        </motion.div>
      </InnerDiv>
      {/* 첫 번째 페이지 콘텐츠 */}
      <InnerDiv>
      <SwiperWrapper>
        <StyledSwiper
          slidesPerView={3}
          spaceBetween={20}
          navigation
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {result && result.map((data, index) => (
            <StyledSwiperSlide key={index} ima={data.pictureUrl}>
              <Link to={`/detail/${userData.user_id}/${data.postId}`} style={{ textDecoration: 'none', color: 'white', width: '100%', height: '100%', display: 'flex', alignItems: 'end' }}>
                <Text>{data.postTitle}</Text>
              </Link>
            </StyledSwiperSlide>
          ))}
        </StyledSwiper>
        </SwiperWrapper>
      </InnerDiv>
      {/* 두 번째 페이지 콘텐츠 */}
      <InnerDiv>
      <CommentContainer>
          {/* <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                  ease: "easeInOut",
                  duration: 2,
                  y: { duration: 1 },
              }}
          >
            <FlowerCount />
          </motion.div> */}
        <Comment />
      </CommentContainer>
        {/* 세 번째 페이지 콘텐츠, Comment 컴포넌트 포함 */}
      </InnerDiv>
      </Container>
    </OuterDiv>
  );
}

export default MainPage;

const TopBlurr = styled.div`
  width: 100%;
  height: 20vh;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter:blur(4px);
  mask: linear-gradient(#FFFFFD, #FFFFFD, transparent);

  //background-color: rgba(255, 255, 255, 0.7);
  // backdrop-filter: blur(3px);
  // mask: linear-gradient(#FFFFFD, transparent);
  // background: linear-gradient(#FFFFFD, #FFFFFD, transparent); 
`

const ExplainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
`

const FlowersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  margin-top: 225px;
`

// const StickyWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
// `

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
`;

const SwiperWrapper = styled.div`
display: flex;
justify-content: center;
transition: transform 0.3s ease-in-out;
`

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 318px;
  padding: 10px;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  width: 246px !important;
  height: 298px !important;
  margin-right: 20px;
  margin-left: 20px;
  border-radius: 6px;
  background-image: url(${(props) => props.ima});
  background-position: center;
  background-size: cover;
  color: white;
  display: flex;
  align-items: end;
  background-repeat: no-repeat;
  transition: transform 0.4s ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const Text = styled.div`
  display: flex;
  width: 262px;
  height: 49px;
  font-family: Geist Mono;
  font-size: 15px;
  font-weight: 400;
  padding: 18px 12px 12px 12px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 0 0 6px 6px;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 91px;

`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: auto;
  padding-top: 300px;
  //padding: 10vh;
`;

const OuterDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  scroll-behavior: smooth;
  // background-color: ${({ backgroundOpacity }) => `rgba(0, 0, 0, ${backgroundOpacity})`};

  /* 화면에서 스크롤바 안보이게 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const InnerDiv = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  padding-top: 20vh;
`;