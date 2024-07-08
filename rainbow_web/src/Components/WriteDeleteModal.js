import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Delete from '../Assets/Img/삭제버튼.png';

Modal.setAppElement('#root');

const WriteDeleteModal = ({ isOpen, onRequestClose }) => {
  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Confirmation"
    >
      <ModalContent>
        <h2>삭제하시겠어요?</h2>
        <p>지워진 질문은 언제나<br/>다시 입력하실 수 있습니다.</p>
        <ButtonGroup>
          <StyledButton onClick={onRequestClose}>취소</StyledButton>
          <StyledButton onClick={onRequestClose}>삭제하기</StyledButton>
        </ButtonGroup>
      </ModalContent>
    </StyledModal>
  );
};

export default WriteDeleteModal;

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);

  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 346px;
    height: 240px;
    padding: 32px;
    border-radius: 8px;
    background: white;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
  color: #2C2C2C;

  h2 {
    color: #EC221F;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 28.8px */
    letter-spacing: -0.48px;
  }

  p {
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-left: 190px;
  gap: 10px;
`;

const StyledButton = styled.button`
  width: 75px;
  height: 40px;
  padding: 12px;
  background-color: #2C2C2C;
  color: #FEFEFE;
  border: none;
  border-radius: 8px;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 106.667% */
  &:hover {
    background: #1e1e1e;
  }
`;