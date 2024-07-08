import React, { useState, useContext, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Modal from 'react-modal';
import { AuthContext } from '../AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import WriteBtn from './WriteBtn';
import profile from '../Assets/Img/프로필.png';
import logo from '../Assets/Img/logo.svg';
import { useRecoilValue } from 'recoil';
import { UserData } from '../Atom';
import { patchPublicAPI } from '../APIs/PublicAPI';
import ExitModal from './ExitModal'; // ExitModal 컴포넌트 추가

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
    z-index: 10001;
  }
  
  body.modal-open {
    overflow: hidden;
  }
`;

function WriteHeader({ onActiveChange }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [exitModalIsOpen, setExitModalIsOpen] = useState(false); // ExitModal 상태 추가
  const { handleSignOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const [communityDot, setCommunityDot] = useState(false);
  const [memoryDot, setMemoryDot] = useState(false);
  const userData = useRecoilValue(UserData);

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

  useEffect(() => {
    if (modalIsOpen || exitModalIsOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [modalIsOpen, exitModalIsOpen]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openExitModal = () => {
    setExitModalIsOpen(true);
  };

  const closeExitModal = () => {
    setExitModalIsOpen(false);
  };

  const onSignOut = () => {
    handleSignOut();
    closeModal();
    navigate('/'); // Navigate to the login page after signing out
  };

  const goToMain = () => {
    navigate('/main');
  };

  const handleToggleChange = async () => {
    const newIsActive = !isActive;
    setIsActive(newIsActive);
    if (onActiveChange) {
      onActiveChange(newIsActive); // isActive 상태 변경 시 부모 컴포넌트에 알림
    }

    try {
      const response = await patchPublicAPI(userData.UserID, newIsActive);
      console.log(response.data); // 백엔드에서 반환된 값을 출력합니다.
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <HeaderContainer blur={modalIsOpen || exitModalIsOpen}>
      <GlobalStyle />
      <LogoAndButtonContainer>
        <Img onClick={goToMain}>
          <img src={logo} alt="BrandLogo" style={{ width: '186px' }} />
        </Img>
      </LogoAndButtonContainer>
      <ImageButtonWrapper onClick={openModal}>
        <img src={profile} alt="Button" style={{ width: '100%', height: '100%' }} />
      </ImageButtonWrapper>
      <StyledModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="Overlay"
      >
        <ModalInfoButton>
          페이지 공개
          <ToggleSwitch>
            <CheckBox
              type="checkbox"
              checked={isActive}
              onChange={handleToggleChange}
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

export default WriteHeader;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1280px;
  height: 72px;
  background: #FEFEFE; 
  padding: 32px 40px 8px 40px;
  gap: 16px;
  filter: ${props => (props.blur ? 'blur(4px)' : 'none')};
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
  top: 100px;
  right: 70px;
  border-radius: 8px;
  border: 1px solid #C6C6C6;  
  background: #FEFEFE;
  backdrop-filter: blur(4px);
  z-index: 10000; /* Ensures the modal is above other content */
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
  z-index: 10000; /* Ensures the overlay is above other content */
`;

const Reg = styled.div`
  width: 178px;
  height: 1px;
  align-self: stretch;
  background: #DDDDDD;
`;

const ToggleSwitch = styled.label`
  position: relative;
  width: 32px;
  height: 19px;
  display: flex;
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