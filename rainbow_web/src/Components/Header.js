import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { AuthContext } from '../AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import WriteBtn from './WriteBtn';
import profile from '../Assets/Img/프로필.png';
import logo from '../Assets/Img/logo.svg';
import { useRecoilValue } from 'recoil';
import { UserData } from '../Atom';
import { patchPublicAPI } from '../APIs/PublicAPI';
import { getUserByIDAPI } from '../APIs/RegisterAPI';

Modal.setAppElement('#root');

function Header({ onActiveChange }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

    if (location.pathname === `/main/${userData.user_id}`) {
      setMemoryDot(true);
    } else {
      setMemoryDot(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserByIDAPI(userData.user_id);
        setIsActive(response.publicCheck);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, [userData.user_id]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onSignOut = () => {
    handleSignOut();
    closeModal();
    navigate('/');
  };

  const goToCommunity = () => {
    navigate('/community');
  };

  const goToMain = () => {
    navigate(`../main/${userData.user_id}`);
  };

  const handleToggleChange = async () => {
    const newIsActive = !isActive;
    setIsActive(newIsActive);

    try {
      await patchPublicAPI(userData.user_id, newIsActive);
      if (onActiveChange) {
        onActiveChange(newIsActive); // Invoke the callback function here
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <HeaderContainer>
      <LogoAndButtonContainer>
        <Img onClick={goToMain}>
          <img src={logo} alt="BrandLogo" style={{ width: '186px' }} />
        </Img>
        <CustomButton onClick={goToMain} hasDot={memoryDot}>
          {memoryDot && <PurpleDot />}
          기억의 꽃밭
        </CustomButton>
      </LogoAndButtonContainer>
      <ButtonContainer>
        <CustomButton onClick={goToCommunity} hasDot={communityDot}>
          {communityDot && <PurpleDot />}
          커뮤니티
        </CustomButton>
      </ButtonContainer>
      <WriteBtn />
      <ImageButtonWrapper onClick={openModal}>
        <img src={profile} alt="Button" style={{ width: '100%', height: '100%' }} />
      </ImageButtonWrapper>
      <StyledModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="Modal"
        shouldCloseOnOverlayClick={true}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0)',
          },
        }}
      >
        <ModalInfoButtonNoHover>
          페이지 공개
          <ToggleSwitch>
            <CheckBox
              type="checkbox"
              checked={isActive}
              onChange={handleToggleChange}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </ModalInfoButtonNoHover>
        <Reg />
        <ModalInfoButton>회원 정보 수정</ModalInfoButton>
        <ModalInfoButton onClick={() => { window.open("https://zenith-appendix-b29.notion.site/e4dcc388afdd4eaa9067fd5cabede20a?pvs=4") }}>이용 정책</ModalInfoButton>
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
  width: 96vw;
  height: auto;
  padding: 32px 40px 8px 40px;
  gap: 16px;
  position: fixed;
  z-index: 1000;
  backdrop-filter:blur(4px);
  mask: linear-gradient(#FFFFD, #FFFFFD, transparent);
  top: -10px;
`;

const LogoAndButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 410px;
`;

const Img = styled.div`gi
  display: flex;
  align-items: center;
  width: 178px;
  height: 32px;
  &:hover {
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-grow: 1;
`;

const CustomButton = styled.button`
  display: flex;
  align-items: center;
  position: relative;
  height: 32px;
  padding: 12px;
  justify-content: center;
  gap: 6px;
  border-radius: 8px;
  background-color: transparent;
  border: none;
  color: #2C2C2C;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; 

  &:hover {
    background-color: ${props => (props.hasDot ? 'transparent' : '#F3F3F3')};
    cursor: pointer;
  }
`;

const PurpleDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #C5AAFF;
  box-shadow: 0px 0px 4px rgba(151, 71, 255, 0.25);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: -16px;
  margin-left: 10px;
  transform: translateY(-50%);
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
  &:hover {
    cursor: pointer;
  }
`;

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 178px;
  padding: 8px;
  position: fixed;
  top: 64px;
  right: 28px;
  border-radius: 8px;
  border: 1px solid #C6C6C6;  
  background: #FEFEFE;
  z-index: 10000;
  p {
    color: #2C2C2C;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; 
  }
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
  &:hover {
    cursor: pointer;
  }
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
    cursor: pointer;
  }
`;

const ModalInfoButtonNoHover = styled(ModalInfoButton)`
  &:hover {
    background-color: white;
    cursor: default;
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
    cursor: pointer;
  }
`;