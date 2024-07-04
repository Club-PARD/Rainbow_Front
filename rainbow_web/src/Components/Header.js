import profile from '../Img/프로필.png';
import logo from '../Img/브랜드로고.png';
import styled from 'styled-components';
import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가

Modal.setAppElement('#root');

function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { handleSignOut } = useContext(AuthContext);
  const navigate = useNavigate();

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
        <img src={logo} alt="BrandLogo" style={{ width: '186px'}}/>
      </Img>
      <CustomButton onClick={goToCommunity}>커뮤니티</CustomButton>
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
        <p>회원 정보 수정</p>
        <p>이용 정책</p>
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
  background: white;  // 선택 사항: 상단 고정 시 배경색을 설정하여 다른 콘텐츠와 구분
  z-index: 1000;  // 선택 사항: 다른 콘텐츠 위에 올리기 위해 z-index 설정
  box-sizing: border-box;  // 패딩과 테두리를 전체 너비에 포함
`;

const Img = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 32px;
  left: 40px;
  margin-right: 2rem; // 필요 시 삭제 가능
`;


const CustomButton = styled.button`
  display: flex;
  width: 90px;
  height: 40px;
  padding: var(--sds-size-space-300);
  justify-content: center;
  align-items: center;
  gap: var(--sds-size-space-200);
  border-radius: var(--sds-size-radius-200);
  cursor: pointer;
  color: var(--grayscale-Black, #2C2C2C);  // 텍스트 색상
  background-color: white;
  border: none;  // 테두리 없애기
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 106.667% */
  position: absolute;
  top: 32px;
  right: 144px;
  &:hover {
    color: gray;  // 글씨 색상만 변경
  }
`;

const ImageButtonWrapper = styled.button`
  display: flex;
  width: 40px;
  height: 40px;
  padding: 0;  // 이미지가 버튼 크기에 맞게 꽉 차도록 패딩 제거
  justify-content: center;
  align-items: center;
  background: none;
  cursor: pointer;
  border-radius: 25%;  // 모서리 둥글게
  overflow: hidden;
  position: absolute;  // 위치 조정을 위해 추가
  top: 32px;  // 상단으로부터 32px 떨어지게 설정
  right: 72px;  // 오른쪽으로부터 32px 떨어지게 설정
  border: none;
  
  img {
    width: 100%;  // 이미지가 버튼 크기에 맞게 꽉 차도록 설정
    height: 100%; // 이미지가 버튼 크기에 맞게 꽉 차도록 설정
    object-fit: cover;  // 이미지가 잘리지 않도록 커버 설정
    border-radius: 25%;  // 이미지도 둥글게
  }
`;

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 194px;
  padding: 8px;
  position: fixed;
  top: 80px;
  right: 72px;
  border-radius: 4%;
  border: 1px solid #C6C6C6;  // 테두리 색상 회색으로 지정
  background: #FEFEFE;

  /* Drop Shadow/200 */
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1), 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  overflow: auto;  // 모달 내부 콘텐츠가 잘리지 않도록
  max-height: 90vh;  // 필요에 따라 조정

  p, button {
    margin-bottom: 15px;  // 각 요소 간의 간격을 24px로 설정
    padding-left: 20px;
  }

  p:last-child, button:last-child {
    margin-bottom: 0;  // 마지막 요소에는 마진을 적용하지 않음
  }

  p {
    color: #2C2C2C;

/* Text/body1 */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 24px; /* 150% */
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

const LogoutButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  background-color: white;

/* Text/body1 */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 24px; /* 150% */
`;