import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { motion } from "framer-motion";
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { getPetNameAPI } from '../APIs/RegisterAPI';
import { getCountAPI, getAllAPI } from '../APIs/AxiosAPI';
import { UserData } from '../Atom';

import Modal from 'react-modal';
import Header from '../Components/Header';
import Comment from '../Components/Comment';
import Flowers from '../Components/Flowers';
import FlowerCount from '../Components/FlowerCount';

Modal.setAppElement('#root');

function MainPage() {
  const outerDivRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);

  const userData = useRecoilValue(UserData);
  const [result, setResult] = useState([]);
  const [petName, setPetName] = useState("");

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = outerDivRef.current;
    const pageHeight = window.innerHeight;

    const newPage = Math.round(scrollTop / pageHeight) + 1;
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }

    const maxScrollTop = scrollHeight - clientHeight;
    const startDarkeningPoint = maxScrollTop / 2;
    let newOpacity = 0;

    if (scrollTop > startDarkeningPoint) {
      newOpacity = (scrollTop - startDarkeningPoint) / (maxScrollTop - startDarkeningPoint);
    }

    setBackgroundOpacity(newOpacity);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllAPI(userData.user_id);
      setResult(data || []);
    };
    fetchData();
  }, [userData.user_id]);

  useEffect(() => {
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("scroll", handleScroll);

    return () => {
      outerDivRefCurrent.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage]); 

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
      <Header />
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
        <Link to="./write" style={{ textDecoration: "none" }}><ToWrite>글 작성하러 가기</ToWrite></Link>
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
        
        <StyledSwiper
          slidesPerView={3}
          spaceBetween={40}
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
      <CommentContainer>
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
        <Comment />
      </CommentContainer>
    </Container>
  );
}

export default MainPage;

const TopBlurr = styled.div`
  width: 100%;
  height: 64px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7); /* 흰색 배경에 50% 불투명도 */
  
  z-index: 999; /* 다른 요소들보다 위에 배치 */
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: auto;
  background: radial-gradient(40em 45em at 50% 30%, #DED2F6, #EDE6FA, #FFFFFD, #FFFFFD);
  padding: 10vh;
`;

const ExplainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  margin: 5%;
`

const FlowersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  margin-bottom: 15%;
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
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 30%;

  background: radial-gradient(40em 45em at 50% 100%, #DED2F6, #EDE6FA, #FFFFFD, #FFFFFD);
`;