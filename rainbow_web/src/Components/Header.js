import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { AuthContext } from '../AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import WriteBtn from './WriteBtn';
import profile from '../Assets/Img/프로필.png';
import logo from '../Assets/Img/logo.svg';

Modal.setAppElement('#root');

function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { handleSignOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const [communityDot, setCommunityDot] = useState(false);
  const [memoryDot, setMemoryDot] = useState(false);

  useEffect(() => {
    if (location.pathname === '/community') {
      setCommunityDot(true);
    } else {
      setCommunityDot(false);
    }

    if (location.pathname === '/main') {
      setMemoryDot(true);
    } else {
      setMemoryDot(false);
    }
  }, [location.pathname]);

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

  const goToMain = () => {
    navigate('/main');
  };

  return (
    <HeaderContainer>
      <LogoAndButtonContainer>
        <Img>
          <img src={logo} alt="BrandLogo" style={{ width: '186px' }} />
        </Img>
        <CustomButton1 onClick={goToMain} hasDot={memoryDot}>
          {memoryDot && <PurpleDot />}
          기억의 꽃밭
        </CustomButton1>
      </LogoAndButtonContainer>
      <ButtonContainer>
        <CustomButton2 onClick={goToCommunity} hasDot={communityDot}>
          {communityDot && <PurpleDot />}
          커뮤니티
        </CustomButton2>
      </ButtonContainer>
      <WriteBtn />
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
  width: 1280px;
  height: 72px;
  background: #FEFEFE; 
  align-items: flex-start;
  padding: 32px 40px 8px 40px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.10) 42%, rgba(255, 255, 255, 0.00) 100%);
  backdrop-filter: blur(20px);
  gap: 16px;
`;

const LogoAndButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 340.5px;
`;

const Img = styled.div`
  display: flex;
  align-items: center;
  width: 178px;
  height: 32px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-grow: 1;
`;

const CustomButton1 = styled.button`
  display: flex;
  width: 93px;
  height: 32px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 8px;
  background-color: #FEFEFE;
  border: none;
  color: #2C2C2C;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; 
  position: relative;

  &:hover {
    background-color: ${props => (props.hasDot ? '#FEFEFE' : '#F3F3F3')};
  }
`;

const CustomButton2 = styled.button`
  display: flex;
  width: 76px;
  height: 32px;
  padding: 12px;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 8px;
  background-color: #FEFEFE;
  border: none;
  color: #2C2C2C;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; 
  position: relative;

  &:hover {
    background-color: ${props => (props.hasDot ? '#FEFEFE' : '#F3F3F3')};
  }
`;

const PurpleDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #C5AAFF;
  box-shadow: (0px 0px 4px rgba(151, 71, 255, 0.25));
  border-radius: 50%;
  position: absolute;
  top: -4px;
  right: -4px;
`;

const ImageButtonWrapper = styled.button`
  display: flex;
  width: 32px;
  height: 32px;
  padding: 0;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover; 
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
  right: 78px;
  border-radius: 8px;
  border: 1px solid #C6C6C6;  
  background: #FEFEFE;
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
  width: 32px;
  height: 19px;
  align-items: center;
  border-radius: 4999.5px;
`;

const ToggleSlider = styled.span`
  position: absolute;
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