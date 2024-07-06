import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import Delete from '../Assets/Img/삭제버튼.png';

Modal.setAppElement('#root');

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
        <p>추억하고 싶은 질문을 선택해주세요</p>
        <Button onClick={closeModal}><img src={Delete} alt="Button" style={{ width: '100%', height: '100%' }} /></Button>
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

const CustomModal = styled(Modal)`
  display: flex;
  width: 452px;
  height: 566px;
  padding: 40px 16px 24px 16px;
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
  width: 36px;
  height: 36px;
  border: none;
  background-color: #FEFEFE;
`;

const QuestionList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PaginationButton = styled.button`
  margin: 5px;
`;