import React from 'react'
import styled from 'styled-components';
import logo from '../Assets/Img/logo.svg';

function LoginHeader() {
  return (
    <Header>
      <Img>
        <img src={logo} alt="BrandLogo" style={{ width: '186px' }} />
      </Img>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1280px;
  height: 72px;
  padding: 32px 40px 8px 40px;
  gap: 16px;
  position: fixed;
  top: 0;
  z-index: 1000; /* Ensures the header is above other content */
`;

const Img = styled.div`
  display: flex;
  align-items: center;
  width: 178px;
  height: 32px;
`;

export default LoginHeader;