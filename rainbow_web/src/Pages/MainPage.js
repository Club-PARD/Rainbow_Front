import React, { useRef, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

// 동운 코드
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

const CustomModal = styled(Modal)`
  display: flex;
  width: 500px;
  height: 590px;
  padding: 24px 16px;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 16px;
`;

const Button = styled.button`
  margin: 10px;
`;

const QuestionList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PaginationButton = styled.button`
  margin: 5px;
`;

//동운 코드
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
width: 100%;
padding: 10px;
background: rgba(0, 0, 0, 0.2);
border-radius: 0 0 6px 6px;
`


function MainPage() {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 8;

  const questions = Array.from({ length: 40 }, (_, i) => `질문 ${i + 1}`);
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
        <h2>질문을 선택하세요</h2>
        <Button onClick={closeModal}>닫기</Button>
        <QuestionList>
          {selectedQuestions.map((question, index) => (
            <li key={index}>
              <Button onClick={() => selectQuestion(question)}>
                {question}
              </Button>
            </li>
          ))}
        </QuestionList>
        <div>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationButton
              key={i + 1}
              onClick={() => handlePageClick(i + 1)}
              disabled={currentPage === i + 1}
            >
              {i + 1}
            </PaginationButton>
          ))}
        </div>
      </CustomModal>
      {/* 동운 코드 여기부터 */}
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
      {/* 동운 코드 여기까지 */}
    </div>
  );
}

export default MainPage;
