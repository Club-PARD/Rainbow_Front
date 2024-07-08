import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Delete from '../Assets/Img/삭제버튼.png';

Modal.setAppElement('#root');

const ExitModal = ({ isOpen, onRequestClose, onExit }) => {
  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Exit Confirmation"
    >
      <ModalContent>
        <ExitButton onClick={onRequestClose}>
          <DeleteIcon src={Delete} alt="Close Button" />
        </ExitButton>
        <h2>지금 나가시겠어요?</h2>
        <p>작성을 중단하면 지금까지 작성된<br/>내용이 저장되지 않습니다.</p>
        <ButtonGroup>
          <StyledButton onClick={onRequestClose}>취소</StyledButton>
          <StyledButton onClick={() => { onRequestClose(); onExit(); }}>나가기</StyledButton>
        </ButtonGroup>
      </ModalContent>
    </StyledModal>
  );
};

export default ExitModal;

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

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

const ExitButton = styled.button`
  width: 36px;
  height: 36px;
  padding: 4px;
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const DeleteIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-left: auto;
  gap: 10px;
`;

const StyledButton = styled.button`
  width: 75px;
  height: 40px;
  padding: 8px 16px;
  background-color: #2C2C2C;
  color: #FEFEFE;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #1e1e1e;
  }
`;