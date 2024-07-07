import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import styled from 'styled-components';
import { UserID } from '../Atom';
import Delete from '../Assets/Img/삭제버튼.png';
import Arrow from '../Assets/Img/arrow.png';

Modal.setAppElement('#root');

const ITEMS_PER_PAGE = 8;

function WriteBtn() {
  const [questions, setQuestions] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const userId = useRecoilValue(UserID);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      axios.get(`http://54.180.163.165:8080/api/questions/${userId}`)
        .then(response => {
          if (response.data && Array.isArray(response.data)) {
            setQuestions(response.data.slice(0, 40));
          } else {
            console.error('Unexpected response data format:', response.data);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [userId]);

  const totalPages = Math.ceil(questions.length / ITEMS_PER_PAGE);

  const currentQuestions = questions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleQuestionSelect = (questionId) => {
    setSelectedQuestionId(questionId);
  };

  const selectedQuestion = questions.find(q => q.question.id === selectedQuestionId)?.question;

  return (
    <div>
      <WriteButton onClick={() => setModalIsOpen(true)}>글 쓰기</WriteButton>
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Questions Modal"
        style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 10000 } }}
      >
        <Title>추억할 질문을 선택해주세요</Title>
        <ExitButton onClick={() => setModalIsOpen(false)}>
          <img src={Delete} alt="Button" style={{ width: '100%', height: '100%' }} />
        </ExitButton>
        <QuestionList>
          {currentQuestions.map(item => (
            <QuestionButton
              key={item.question.id}
              disabled={item.answered}
              selected={item.question.id === selectedQuestionId}
              onClick={() => handleQuestionSelect(item.question.id)}
            >
              <span>{`${item.question.id}.`}</span>
              <span>{item.question.questionText}</span>
            </QuestionButton>
          ))}
        </QuestionList>
        {totalPages > 1 && (
          <Pagination>
            <PageButtonContainer>
              {Array.from({ length: totalPages }, (_, index) => (
                <PageButton
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  active={currentPage === index + 1}
                >
                  {index + 1}
                </PageButton>
              ))}
            </PageButtonContainer>
          </Pagination>
        )}
        <SelectButton onClick={() => {
          if (selectedQuestion) {
            navigate('/write', { state: { selectedQuestion, userId } });
          } else {
            alert('질문을 선택해주세요.');
          }
        }}>
          <span>다음</span>
          <ArrowImage src={Arrow} alt="Arrow" />
        </SelectButton>
      </CustomModal>
    </div>
  );
}

export default WriteBtn;

const WriteButton = styled.button`
  width: 67px;
  height: 32px;
  padding: 12px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  line-height: 11px;
  font-size: 14px;
  background-color: #2C2C2C;
  color: #FEFEFE;
  border: none;
  border-radius: 8px;
`;

const ExitButton = styled.button`
  width: 36px;
  height: 36px;
  padding: 4px;
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  background-color: #FEFEFE;
`;

const CustomModal = styled(Modal)`
  display: flex;
  width: 420px;
  height: 452px;
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
  border-radius: 8px;
`;

const Title = styled.div`
  color: #2C2C2C;
  text-align: center;
  font-family: "Geist Mono";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const QuestionButton = styled.button`
  display: flex;
  padding: 8px;
  gap: 16px;
  align-items: center;
  align-self: stretch;
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 8px;
  background-color: ${props => props.selected ? '#DDDDDD' : '#FEFEFE'};
  color: #2C2C2C;
  &:hover {
    background-color: ${props => (props.selected ? '#DDDDDD' : (props.disabled ? '#FEFEFE' : '#F3F3F3'))};
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const PageButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const PageButton = styled.button`
  width: 23px;
  height: 32px;
  margin: 4px;
  border: none;
  border-radius: 8px;
  background-color: ${props => (props.active ? '#2C2C2C' : '#FEFEFE')};
  color: ${props => (props.active ? '#FEFEFE' : '#2C2C2C')}; 
  &:hover {
    background-color: #F3F3F3;
    color: #2c2c2c;
  }
`;

const SelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 36px;
  position: fixed;
  right: 18px;
  bottom: 24px;
  padding: 8px;
  gap: 4px;
  font-size: 14px;
  background-color: #FEFEFE;
  color: #2C2C2C;
  border: none;
  border-radius: 8px;
  &:hover {
    background-color: #F3F3F3;
  }
`;

const ArrowImage = styled.img`
  width: 11.7px;
  height: 11.7px;
`;