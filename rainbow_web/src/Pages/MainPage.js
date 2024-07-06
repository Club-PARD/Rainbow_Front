import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import Delete from '../Assets/Img/삭제버튼.png';
import Flowers from '../Components/Flowers';
import { getCountAPI } from '../APIs/AxiosAPI';

//여기서 동운 코드
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import mainTest from '../Assets/Img/mainTest.png';
import mainTest2 from '../Assets/Img/mainTest2.png';
import mainTest3 from '../Assets/Img/mainTest3.png';

const postData = {
  id : {
      title: "무떡 웹파트",
      img: mainTest,
  },
  id2 : {
      title: "화이팅",
      img: mainTest2
  },
  id3 : {
    title: "만만세",
    img: mainTest3
  },
  id4 : {
    title: "무떡 웹파트",
    img: mainTest,
  },
  id5 : {
      title: "화이팅",
      img: mainTest2
  },
  id6 : {
    title: "만만세",
    img: mainTest3
  },  
  //계속 이런식으로
}

Modal.setAppElement('#root');

function MainPage() {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 8;

  const questions = Array.from({ length: 40 }, (_, i) => `${i + 1}. 질문 `);
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const selectQuestion = (question) => {
    closeModal();
    navigate('/write', { state: { selectedQuestion: question } });
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * questionsPerPage;
  const selectedQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  return (
    <div>
      <Header />
      <Button onClick={openModal}>
        글쓰기
      </Button>
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Select a Question"
      >
        <Title>추억할 질문을 선택해주세요</Title>
        <ExitButton onClick={closeModal}><img src={Delete} alt="Button" style={{ width: '100%', height: '100%' }} /></ExitButton>
        <QuestionList>
          {selectedQuestions.map((question, index) => {
            const [number, ...rest] = question.split('. ');
            return (
              <li key={index}>
                <QuestionButton onClick={() => selectQuestion(question)}>
                  <QuestionNumber>{number}.</QuestionNumber>
                  <QuestionText>{rest.join('. ')}</QuestionText>
                </QuestionButton>
              </li>
            );
          })}
        </QuestionList>
        <div>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationButton
              key={i + 1}
              onClick={() => handlePageClick(i + 1)}
              selected={currentPage === i + 1}
            >
              {i + 1}
            </PaginationButton>
          ))}
        </div>
      </CustomModal>
      <StyledSwiper
        slidesPerView={3}
        spaceBetween={40}
        // pagination={{
        //   clickable: true,
        // }}
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
    </Container>
  );
}

export default MainPage;

const CustomModal = styled(Modal)`
  display: flex;
  width: 452px;
  height: 452px;
  padding: 40px 16px 24px 16px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 16px;
`;

const Title = styled.div`
  display: flex;
  color: #2C2C2C;
  text-align: center;
  /* Headlines/H5-20 */
  font-family: "Geist Mono";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 150% */
`;

const Button = styled.button`
  width: 50px;
  height: 36px;
  border: none;
  position: fixed;
  top: 200px;
  right: 40px;
  background-color: #FEFEFE;
`;

const ExitButton = styled.button`
  width: 36px;
  height: 36px;
  padding: 4px;
  position: fixed;
  top: 8px;
  right: 8px;
  border: none;
  background-color: #FEFEFE;
`;

const QuestionButton = styled.button`
  display: flex;
  padding: 8px;
  gap: 16px;
  align-items: center;
  align-self: stretch;
  width: 420px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background-color: #FEFEFE;
`;

const QuestionNumber = styled.span`
`;

const QuestionText = styled.span`
`;

const QuestionList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PaginationButton = styled.button`
  width: 23px;
  height: 32px;
  margin: 8px;
  border: none;
  border-radius: 8px;
  background-color: ${props => (props.selected ? '#2C2C2C' : '#FFFFFF')};
  color: ${props => (props.selected ? '#FFFFFF' : '#2C2C2C')}; 
  &:hover {
    color: #2C2C2C;
    background-color: #F3F3F3;
  }
`;

const StyledSwiper = styled(Swiper)`
width: 918px;
height: 318px;
padding: 10px;
`

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
&:hover{
cursor: pointer;
}
`

const Text = styled.div`
width: 246px;
padding: 10px;
background: rgba(0, 0, 0, 0.5);
border-radius: 0 0 6px 6px;
`


{/*import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import Delete from '../Assets/Img/삭제버튼.png';
import { getQuestionAPI, postQuestionAPI } from '../APIs/QuestionAPI';
import { googleLoginAPI } from '../APIs/LoginAPI';
import { LoginState } from '../Atom';

Modal.setAppElement('#root');

function MainPage() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [questions, setQuestions] = useState([]);
  const questionsPerPage = 8;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestionAPI(userId);
        setQuestions(data || []);  // data가 없을 경우 빈 배열 설정
      } catch (err) {
        console.error(err);
        setQuestions([]);  // 오류가 발생해도 빈 배열 설정
      }
    };
    fetchQuestions();
  }, [userId]);

  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const selectQuestion = (questionId) => {
    closeModal();
    navigate('/write', { state: { selectedQuestionId: questionId } });
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * questionsPerPage;
  const selectedQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  return (
    <Container>
      <Header />
      <Wrapper>
        <Button onClick={openModal}>
          글쓰기
        </Button>
        <CustomModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Select a Question"
        >
          <Title>추억할 질문을 선택해주세요</Title>
          <ExitButton onClick={closeModal}><img src={Delete} alt="Button" style={{ width: '100%', height: '100%' }} /></ExitButton>
          <QuestionList>
            {selectedQuestions.map((question, index) => (
              <li key={question.id}>
                <QuestionButton onClick={() => selectQuestion(question.id)}>
                  <QuestionNumber>{index + 1}.</QuestionNumber>
                  <QuestionText>{question.text}</QuestionText>
                </QuestionButton>
              </li>
            ))}
          </QuestionList>
          <div>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationButton
                key={i + 1}
                onClick={() => handlePageClick(i + 1)}
                selected={currentPage === i + 1}
              >
                {i + 1}
              </PaginationButton>
            ))}
          </div>
        </CustomModal>
      </Wrapper>
    </Container>
  );
}

export default MainPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100vw;
  height: 100vh;

  background: radial-gradient(at 50% 160%, #8952FF, #E5DBF7, #FFFFFD, #FFFFFD);
  color: #2C2C2C;
  font-size: 0.9rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: 80px;
  height: 40px;
  border-radius: 4px;
  background-color: #FEFEFE;
  border: solid 1px #C6C6C6;

  &:hover {
    background-color: #F3F3F3;
  }
`;

const CustomModal = styled(Modal)`
  display: flex;
  width: 452px;
  height: 452px;
  padding: 40px 16px 24px 16px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 16px;
`;

const Title = styled.div`
  display: flex;
  color: #2C2C2C;
  text-align: center;
  font-family: "Geist Mono";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
`;

const ExitButton = styled.button`
  width: 36px;
  height: 36px;
  padding: 4px;
  position: fixed;
  top: 8px;
  right: 8px;
  border: none;
  background-color: #FEFEFE;
`;

const QuestionButton = styled.button`
  display: flex;
  padding: 8px;
  gap: 16px;
  align-items: center;
  align-self: stretch;
  width: 420px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background-color: #FEFEFE;
  color: ${props => (props.selected ? '#000' : '#000')}; 
  &:hover {
    background-color: #FEFEFE;
  }
`;