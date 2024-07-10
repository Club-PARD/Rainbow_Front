import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../Assets/Img/logo.svg';

function LoginHeader() {
  const navigate = useNavigate();

  const goToLanding = () => {
    navigate('/');
  };

  return (
    <Header>
      <Img onClick={goToLanding}>
        <img src={logo} alt="BrandLogo" style={{ width: '186px' }} />
      </Img>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 96vw;
  height: auto;
  padding: 32px 40px 8px 40px;
  gap: 16px;
  position: fixed;
  top: -10px;
  z-index: 1000;
`;

const Img = styled.div`
  display: flex;
  align-items: center;
  width: 178px;
  height: 32px;
  &:hover {
    cursor: pointer;
  }
`;

export default LoginHeader;