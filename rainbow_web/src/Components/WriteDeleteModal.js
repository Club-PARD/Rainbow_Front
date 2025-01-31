import React, { useEffect } from 'react';
import Modal from 'react-modal';
import styled, { createGlobalStyle } from 'styled-components';
import Delete from '../Assets/Img/삭제버튼.png';

Modal.setAppElement('#root');

const GlobalStyle = createGlobalStyle`
  .Overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.20);
    backdrop-filter: blur(4px);
    z-index: 1000;
  }
`;

const ExitModal = ({ isOpen, onRequestClose, onDelete }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && <GlobalStyle />}
      <StyledModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="Overlay"
        contentLabel="Exit Confirmation"
      >
        <ModalContent>
          <ExitButton onClick={onRequestClose}>
            <DeleteIcon src={Delete} alt="Close Button" />
          </ExitButton>
          <Title>삭제하시겠어요?</Title>
          <Content>지워진 질문은 언제나<br/>다시 입력하실 수 있습니다.</Content>
          <ButtonGroup>
            <StyledButton2 onClick={onRequestClose}>취소</StyledButton2>
            <StyledButton onClick={onDelete}>삭제하기</StyledButton>
          </ButtonGroup>
        </ModalContent>
      </StyledModal>
    </>
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
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  width: 300px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #9B9B9B;
  background: white;
`;

const Title = styled.p`
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  letter-spacing: -0.48px;
  margin-top: 10px;
  color: #EC221F;
`;

const Content = styled.p`
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  margin-top: -12px;
`;

const ExitButton = styled.button`
  width: 36px;
  height: 36px;
  padding: 4px;
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  &:hover{
    cursor: pointer;
    background-color: #F3F3F3;
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
  margin-top: 40px;
`;

const StyledButton = styled.button`
  width: 75px;
  height: 40px;
  padding: 12px;
  background-color: #2C2C2C;
  color: #FEFEFE;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  border: none;
  border-radius: 8px;
  &:hover {
    background: #1e1e1e;
  }
  &:hover{
    cursor: pointer;
  }
`;

const StyledButton2 = styled.button`
  width: 75px;
  height: 40px;
  padding: 12px;
  background-color: #FEFEFE;
  color: #2C2C2C;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  border: 1px solid #9B9B9B;
  border-radius: 8px;
  &:hover {
    background: #F3F3F3;
  }
  &:hover{
    cursor: pointer;
  }
`;