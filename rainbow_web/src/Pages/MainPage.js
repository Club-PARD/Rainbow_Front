import { useEffect, useRef, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import styled from "styled-components";

import { motion } from "framer-motion";
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; // navigation css 추가


import { getPetNameAPI } from '../APIs/RegisterAPI';
import { getAllAPI, getCountAPI } from '../APIs/AxiosAPI';
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
  const userData = useRecoilValue(UserData);
  const setUserData = useSetRecoilState(UserData);
  const [result, setResult] = useState([]);
  const [petName, setPetName] = useState("");
  const [scrollY, setScrollY] = useState(0);

  const [postNumber, setPostNumber] = useRecoilState(PostCount);
  const getPostCount = async () => {
    const response = await getCountAPI(userData.user_id);
    setPostNumber(response);
  };

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
    getPostCount();
    getPetName();
  }, [userId, setUserData, setPostNumber]);

  const getPetName = async () => {
    const response = await getPetNameAPI(userId);  // URL의 userId로 데이터를 가져옵니다.
    setPetName(response);
  };

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

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
  }, []);

  // const getTalkBubbleText = (count) => {
  //   if (count >= 40) {
  //     return `${petName}와(과)의 추억이 아름다운 꽃밭으로 완성되었습니다. ${petName}은(는) 이제 영원히 당신의 마음속에 함께할 것입니다.`;
  //   } else if (count >= 20) {
  //     return `꽃밭이 더욱 풍성해지고 있어요. ${petName}와(과) 함께한 기억들이 당신의 마음속에서 영원히 빛나고 있습니다.`;
  //   } else if (count >= 10) {
  //     return `기억의 꽃들이 점점 더 피어나고 있어요. ${petName}와(과)의 소중한 추억들이 꽃밭을 아름답게 가꾸고 있네요.`;
  //   } else {
  //     return `${petName}과(와)의 기억의 꽃이 하나씩 피어나고 있어요. 기억의 꽃밭을 천천히 채워볼까요?`;
  //   }
  // };

  return (
      <Container>
      <Header />
        {/* <TopBlurr /> */}
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
          {(postNumber >= 40) &&
            <TalkBubble>
              {petName}와(과)의 추억이 아름다운 꽃밭으로 완성되었습니다.<br />
              {petName}은(는) 이제 영원히 당신의 마음속에 함께할 것입니다.
            </TalkBubble>
          }
          {(postNumber >= 20 && postNumber < 40) &&
            <TalkBubble>
              꽃밭이 더욱 풍성해지고 있어요.<br />
              {petName}와(과) 함께한 기억들이 당신의 마음속에서 영원히 빛나고 있습니다.
            </TalkBubble>
          }
          {(postNumber >= 10 && postNumber < 20) &&
            <TalkBubble>
              기억의 꽃들이 점점 더 피어나고 있어요.<br />
              {petName}와(과)의 소중한 추억들이 꽃밭을 아름답게 가꾸고 있네요.
            </TalkBubble>
          }
          {(postNumber < 10) &&
            <TalkBubble>
              {petName}과(와)의 기억의 꽃이 하나씩 피어나고 있어요.<br />
              기억의 꽃밭을 천천히 채워볼까요?
            </TalkBubble>
          }
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
        {postNumber === 0 ? <MainSwiperEmpty/> : <SwiperWrapper centeredSlides={result.length <= 4}>

          <StyledSwiper
            slidesPerView={4}
            spaceBetween={0}
            navigation
            modules={[Pagination, Navigation]}
            centeredSlides={result.length <= 4}
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
        <CommentContainer>
          <Comment />
        </CommentContainer>
      </Container>
  );
}

export default MainPage;

const TalkBubble = styled.div`
  position: relative;
  min-width: 272px;
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
  margin-top: 5vh;
  box-shadow: 0px 20px 25px -5px rgba(0, 0, 0, 0.10), 0px 8px 10px -6px rgba(0, 0, 0, 0.10);
  z-index: 0;

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
  }

  &:before {
    border-style: solid;
    border-width: 9px 9px 0;
    border-color: #C6C6C6 transparent;
    bottom: -9px;
  }
`

// const TopBlurr = styled.div`
//   width: 100%;
//   height: 10vh;
//   position: fixed;
//   z-index: 2;
//   top: 0;
//   left: 0;
//   backdrop-filter:blur(4px);
//   mask: linear-gradient(#FFFFD, #FFFFFD, transparent);
// `

const ExplainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  margin: 10vh;
  font-family: "Pretendard-Regular";
`

const FlowersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  margin-bottom: 20vh;
`

const Title = styled.div`
  width: 362px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
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
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  margin: 16px;
`;

const SwiperWrapper = styled.div`
  display: flex;
  justify-content: center;
  transition: transform 0.3s ease-in-out;
  ${(props) => props.centeredSlides && `
    justify-content: center;
  `}
  margin: 20vh;
`

const StyledSwiper = styled(Swiper)`
  width: 100vw;
  height: 318px;
  padding: 10px;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  width: 246px !important;
  height: 298px !important;
  // margin-right: 1px;
  margin-left: 32px;
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
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: auto;
  padding-top: 20vh;
  padding-bottom: 10vh;
  background: radial-gradient(50em 50em at 50% 40%, #DED2F6, #EDE6FA, transparent, transparent);
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