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

  width: 95%;

  margin: 2rem;
`

const Img = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 32px;
  left: 40px;
  margin-right: 2rem;
`;

export default LoginHeader;