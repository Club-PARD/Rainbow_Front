import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import Delete from '../Assets/Img/삭제버튼.png';
import { getQuestionAPI } from '../APIs/QuestionAPI'; // Adjust the import path as needed

Modal.setAppElement('#root');

function MainPage() {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 8;
  const [questions, setQuestions] = useState([]);
  const userId = 1; // Replace with actual user ID

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getQuestionAPI(userId);
      if (data) {
        setQuestions(data);
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
          {selectedQuestions.map((questionItem, index) => {
            const { id, questionText } = questionItem.question;
            return (
              <li key={id}>
                <QuestionButton onClick={() => selectQuestion(questionText)}>
                  <QuestionNumber>{id}.</QuestionNumber>
                  <QuestionText>{questionText}</QuestionText>
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
    </div>
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
`;