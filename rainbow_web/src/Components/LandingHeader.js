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
  // position: fixed;
  // top: 32px;
  // left: 90px;
`;

const ToLogin = styled.button`
  width: 66px;
  height: 32px;
  // position: fixed;
  // top: 32px;
  // right: 90px;
  padding: 12px;
  background-color: #2C2C2C;
  color: #FEFEFE;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 10px; /* 106.667% */
  &:hover{
    background-color: #000;
  }
`

export default LandingHeader;