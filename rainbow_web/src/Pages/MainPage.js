import { useEffect, useRef, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from "styled-components";

import { motion } from "framer-motion";
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { getPetNameAPI } from '../APIs/RegisterAPI';
import { getAllAPI } from '../APIs/AxiosAPI';
import { UserData, PostCount } from '../Atom';

import Modal from 'react-modal';
import Header from '../Components/Header';
import Comment from '../Components/Comment';
import Flowers from '../Components/Flowers';
import FlowerCount from '../Components/FlowerCount';
import WriteBtn2 from '../Components/WriteBtn2';
import MainSwiperEmpty from "../Components/MainSwiperEmpty";

Modal.setAppElement('#root');

function MainPage() {
  const { userId } = useParams();  // URL의 userId 파라미터를 읽습니다.
  const setUserData = useSetRecoilState(UserData);
  const [result, setResult] = useState([]);
  const [petName, setPetName] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const postCount = useRecoilValue(PostCount);

  const outerDivRef = useRef(); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [backgroundOpacity, setBackgroundOpacity] = useState(0); 

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllAPI(userId);  // URL의 userId로 데이터를 가져옵니다.
      setResult(data || []);
      setUserData(prevUserData => ({ ...prevUserData, user_id: userId }));
    };
    fetchData();
  }, [userId, setUserData]);

  const getPetName = async () => {
    const response = await getPetNameAPI(userId);  // URL의 userId로 데이터를 가져옵니다.
    setPetName(response);
  };

  useEffect(() => {
    getPetName();
  }, [userId]);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getTalkBubbleText = (count) => {
    if (count >= 40) {
      return `${petName}와(과)의 추억이 아름다운 꽃밭으로 완성되었습니다. ${petName}은(는) 이제 영원히 당신의 마음속에 함께할 것입니다.`;
    } else if (count >= 20) {
      return `꽃밭이 더욱 풍성해지고 있어요. ${petName}와(과) 함께한 기억들이 당신의 마음속에서 영원히 빛나고 있습니다.`;
    } else if (count >= 10) {
      return `기억의 꽃들이 점점 더 피어나고 있어요. ${petName}와(과)의 소중한 추억들이 꽃밭을 아름답게 가꾸고 있네요.`;
    } else {
      return `${petName}과(와)의 기억의 꽃이 하나씩 피어나고 있어요. 기억의 꽃밭을 천천히 채워볼까요?`;
    }
  };

  useEffect(() => {
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

    const outerDivRefCurrent = outerDivRef.current; 
    outerDivRefCurrent.addEventListener("scroll", handleScroll); 

    return () => {
      outerDivRefCurrent.removeEventListener("scroll", handleScroll); 
    };
  }, [currentPage]); 

  return (
    <OuterDiv
      ref={outerDivRef}
      backgroundOpacity={backgroundOpacity}
    >
      <Container>
      <Header />
      <InnerDiv>
        <TopBlurr />
        <ExplainWrapper>
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
            <Title>기억의 꽃밭은</Title>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
              ease: "easeInOut",
              duration: 2,
              y : { duration: 1},
              delay: 0.5
            }}
          >
            <Explained>
              반려동물과의 소중한 추억을 떠올리며<br />
              한 송이씩 피어나는 '기억의 꽃'으로 채워지는 공간입니다.<br /><br />
              꽃은 추억을 상징하며, 40개의 질문에 답변하면<br />
              사랑과 그리움이 가득한 꽃밭이 완성됩니다.<br /><br />
              {petName} 에 대한 이야기를 들려주세요
            </Explained>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
              ease: "easeInOut",
              duration: 2,
              y : { duration: 1},
              delay: 1
            }}
          >
            <WriteBtn2 />
          </motion.div>
        </ExplainWrapper>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 2,
            y : { duration: 1},
            delay: 1.5
          }}
        >
          <TalkBubble>
            {getTalkBubbleText(postCount)}
          </TalkBubble>
        </motion.div>
        <FlowersWrapper>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
              ease: "easeInOut",
              duration: 2,
              y : { duration: 1},
              delay: 2
            }}
          >
            <Flowers />
          </motion.div>
        </FlowersWrapper>
      </InnerDiv>
      <InnerDiv>
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
        {postCount === 0 ? <MainSwiperEmpty/> : <SwiperWrapper>
          <StyledSwiper
            slidesPerView={3}
            spaceBetween={20}
            navigation
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {result && result.map((data, index) => (
              <StyledSwiperSlide key={index} ima={data.pictureUrl}>
                <Link to={`/detail/${userId}/${data.postId}`} style={{ textDecoration: 'none', color: 'white', width: '100%', height: '100%', display: 'flex', alignItems: 'end' }}>
                  <Text>{data.postTitle}</Text>
                </Link>
              </StyledSwiperSlide>
            ))}
          </StyledSwiper>
        </SwiperWrapper>}
      </InnerDiv>
      <InnerDiv>
        <CommentContainer>
          <Comment />
        </CommentContainer>
      </InnerDiv>
      </Container>
    </OuterDiv>
  );
}

export default MainPage;

const TalkBubble = styled.div`
  position: relative;
  width: 272px;
  min-height: 60px;
  padding: 8px 12px;
  background: #FEFEFE;
  border-radius: 8px;
  border: 1px solid #C6C6C6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #2C2C2C;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  margin: 16px;
  box-shadow: 0px 20px 25px -5px rgba(0, 0, 0, 0.10), 0px 8px 10px -6px rgba(0, 0, 0, 0.10);

  &:after, &:before {
    position: absolute;
    content: '';
    width: 0;
    bottom: -8px;
    left: calc(50% - 8px);
  }

  &:after {
    border-style: solid;
    border-width: 8px 8px 0;
    border-color: #FEFEFE transparent;
    z-index: 1;
  }

  &:before {
    border-style: solid;
    border-width: 9px 9px 0;
    border-color: #C6C6C6 transparent;
    z-index: 0;
    bottom: -9px;
  }
`

const TopBlurr = styled.div`
  width: 100%;
  height: 20vh;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter:blur(4px);
  mask: linear-gradient(#FFFFFD, #FFFFFD, transparent);
`

const ExplainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  margin-bottom: 15vh;
  font-family: "Pretendard-Regular";
`

const FlowersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
`

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
  background: linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0.00) 100%);
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
  padding-top: 15vh;
  background: radial-gradient50em 50emat 50% 100%, #C5AAFF, #FFFFFD, #FFFFFD
`;

const OuterDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: auto;
  overflow: scroll;
  scroll-behavior: smooth;
  background: radial-gradient(50em 50em at 50% 30%, #DED2F6, #EDE6FA, transparent, transparent);

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
  padding-top: 10vh;
`;