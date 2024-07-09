import React from 'react'
import styled from 'styled-components';
import logo from '../Assets/Img/logo.svg';
import { Link } from 'react-router-dom';

function LandingHeader() {
  return (
    <Header>
      <Img>
        <img src={logo} alt="BrandLogo" style={{ width: '186px' }} />
      </Img>
      <Link to="./login"><ToLogin>Login</ToLogin></Link>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 95%;

  margin: 2rem;
`

const Img = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
`;

const ToLogin = styled.button`
  width: 80px;
  height: 40px;
  position: fixed;
  top: 32px;
  right: 90px;
  padding: 12px;
  font-size: 14px;
  background-color: #2C2C2C;
  color: #FEFEFE;
  border: none;
  border-radius: 8px;
`

export default LandingHeader;