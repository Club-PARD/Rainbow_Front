import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import profile from '../Img/프로필.png';
import logo from '../Img/브랜드로고.png';

Modal.setAppElement('#root');

function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { handleSignOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false); // 공개 여부 상태 추가

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onSignOut = () => {
    handleSignOut();
    closeModal();
    navigate('/'); // Navigate to the login page after signing out
  };

  const goToCommunity = () => {
    navigate('/community');
  };

  return (
    <HeaderContainer>
      <Img>
        <img src={logo} alt="BrandLogo" style={{ width: '186px' }} />
      </Img>
      <CustomButton1 onClick={goToCommunity}>기억의 꽃밭</CustomButton1>
      <CustomButton2 onClick={goToCommunity}>커뮤니티</CustomButton2>
      <ImageButtonWrapper onClick={openModal}>
        <img src={profile} alt="Button" style={{ width: '100%', height: '100%' }} />
      </ImageButtonWrapper>
      <StyledModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayElement={(props, contentElement) => (
          <ModalOverlay {...props}>{contentElement}</ModalOverlay>
        )}
      >
        <ModalInfoButton>
          페이지 공개
          <ToggleSwitch>
            <CheckBox
              type="checkbox"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </ModalInfoButton>
        <Reg />
        <ModalInfoButton>회원 정보 수정</ModalInfoButton>
        <ModalInfoButton>이용 정책</ModalInfoButton>
        <LogoutButton onClick={onSignOut}>로그아웃</LogoutButton>
      </StyledModal>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white; 
  z-index: 1000; 
  box-sizing: border-box; 
`;

const Img = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 32px;
  left: 40px;
  margin-right: 2rem;
`;

const CustomButton1 = styled.button`
  display: inline-flex;
  width: 103px;
  height: 40px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 24px;
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
  border: none;
  color: #2C2C2C;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; 
  position: absolute;
  top: 32px;
  right: 191px;
  &:hover {
    border: 1px solid #F3F3F3;
  }
`;

const CustomButton2 = styled.button`
  display: flex;
  width: 80px;
  height: 40px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 24px;
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
  border: none;
  color: #2C2C2C;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; 
  position: absolute;
  top: 32px;
  right: 104px;
  &:hover {
    border: 1px solid #F3F3F3;
  }
`;

const ImageButtonWrapper = styled.button`
  display: flex;
  width: 40px;
  height: 40px;
  padding: 0;
  justify-content: center;
  align-items: center;
  background: none;
  cursor: pointer;
  border-radius: 25%;
  overflow: hidden;
  position: absolute; 
  top: 32px; 
  right: 40px; 
  border: none;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover; 
    border-radius: 25%; 
  }
`;

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 178px;
  padding: 8px;
  position: fixed;
  top: 80px;
  right: 40px;
  border-radius: 8px;
  border: 0.8px solid #C6C6C6;  
  background: #FEFEFE;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1), 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  max-height: 90vh;  

  p {
    color: #2C2C2C;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; 
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Reg = styled.div`
  width: 178px;
  height: 1px;
  align-self: stretch;
  background: #DDDDDD;
`

const ToggleSwitch = styled.label`
  position: relative;
  //display: flex;
  width: 32px;
  height: 19px;
  align-items: center;
  border-radius: 4999.5px;
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #C6C6C6;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 32px;

  &:before {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
  }
`;

const CheckBox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${ToggleSlider} {
    background-color: #CFF7D3;
  }


  &:checked + ${ToggleSlider}:before {
    -webkit-transform: translateX(13px);
    -ms-transform: translateX(13px);
    transform: translateX(13px);
    background-color: #14AE5C;
  }
`;

const ModalInfoButton = styled.button`
  display: flex;
  width: 178px;
  padding: 8px 16px;
  justify-content: space-between;
  align-items: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
  color: #2C2C2C;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  &:hover {
    background-color: #F3F3F3;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  width: 178px;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background-color: white;
  color: #2C2C2C;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  &:hover {
    background-color: #F3F3F3;
  }
`;