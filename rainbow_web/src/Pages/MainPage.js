import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';

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
    </div>
  );
}

export default MainPage;
