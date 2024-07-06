import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import Delete from '../Assets/Img/삭제버튼.png';
import Flowers from '../Components/Flowers';
import { getCountAPI } from '../APIs/AxiosAPI';

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

  // 유민 코드: # of post API 호출
  const [count, setCount] = useState();

  // 실제 count 값을 서버로부터 받아오는 함수
  const getCount = async () => {
    try {
      // const response = await getCountAPI/(id); // getCountAPI에서 서버로부터 데이터를 가져옴
      const response = 5;     // 임시 데이터
      if (count < response) {
        setCount(response); // Recoil 상태 업데이트
      }
    } catch (err) {
      console.error('Error fetching count:', err);
    }
  };

  useEffect(() => {
    getCount(); // 페이지 로드 시 getCount 함수 호출
  }, []);

  return (
    <Container>
      <Header />
      {/* 유민 코드 추가 */}
      {/* [상세 설명 추가] */}
      <Explained>
        기억의 꽃밭은 반려동물과의 소중한 추억을 떠올리며<br/>
        한 송이씩 피어나는 '기억의 꽃'으로 채워지는 공간입니다.<br/><br/>
        꽃은 추억을 상징하며, 40개의 질문에 답변하면<br/>
        사랑과 그리움이 가득한 꽃밭이 완성됩니다.<br/><br/>
        00이에 대한 이야기를 들려주세요
      </Explained>
      {/* [꽃 피우기] 대략적인 설명:
       - postCount는 실제 서버에서 받아온 값
       - Flowers.js에서는 리코일에 저장된 previous count 값과 비교하여 하나 더 커졌을 경우에 꽃을 애니메이션과 함께 하나 더 피우도록 구현함
      */}
      <Flowers postCount={count} />
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
    </Container>
  );
}

export default MainPage;

const Explained = styled.div`
text-align: center;
font-size: 18px;
font-weight: 400;
color: #2C2C2C;

width: 482px;
height: 196px;
`

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

width: 100%;
height: 100%;
max-height: 300vh;
overflow: scroll;

margin: 0;

background: radial-gradient(ellipse at 50%, #E5DBF7, #FFFFFD), radial-gradient(ellipse at 50%, #E5DBF7, #191919);

// background: radial-gradient(ellipse at 50%, #8952FF, transparent), radial-gradient(ellipse at 50%, #8952FF, #191919);
`

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
  display: flex;
  width: 50px;
  height: 36px;
  position: fixed;
  top: 100px;
  right: 40px;
  border: none;
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
  &:hover {
    background-color: #F3F3F3;
  }
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
  &:hover {
    background-color: #F3F3F3;
  }
`;

const QuestionNumber = styled.span``;

const QuestionText = styled.span``;

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
`;*/}