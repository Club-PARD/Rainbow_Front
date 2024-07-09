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
  justify-content: flex-start;
  width: 1280px;
  height: 72px;
  padding: 32px 40px 8px 40px;
  gap: 16px;
`

const Img = styled.div`
  display: flex;
  align-items: center;
  width: 178px;
  height: 32px;
`;

export default LoginHeader;