import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import flowerImage from "../Assets/Img/flower.svg";
import { useRecoilState, useRecoilValue } from 'recoil';
import { Increased, PostCount, UserData } from '../Atom';
import { getCountAPI } from '../APIs/AxiosAPI';

// Flowers component to display flower animations based on post count
const Flowers = () => {
  const userData = useRecoilValue(UserData);
  const [isIncreased, setIsIncreased] = useRecoilState(Increased);
  const [saveIncreased, setSaveIncreased] = useState(false);
  const [postNumber, setPostNumber] = useRecoilState(PostCount);

  const flowerArray = Array.from({ length: postNumber }, (_, index) => index + 1);
  const blankArray = Array.from({ length: 40 - postNumber }, (_, index) => index + 1);

  const getPostCount = async () => {
    const response = await getCountAPI(userData.user_id);
    setPostNumber(response);
  };

  useEffect(() => {
    getPostCount();
    setSaveIncreased(isIncreased);
    setIsIncreased(false);
  }, [isIncreased, userData.user_id, setIsIncreased, setPostNumber]);

  return (
    <FlowersWrapper>
      {flowerArray.map((i) => (
        <FlowerBox key={i}>
          <Flower src={flowerImage} alt="flower" />
        </FlowerBox>
      ))}
      {blankArray.map((i) => (
        <FlowerBox key={i} alt="blank" />
      ))}
    </FlowersWrapper>
  );
};

// Styled components for the flower animation
const FlowersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 556px;
  height: 244px;
  background-color: #FEFEFE;
  border: solid 1.5px #C6C6C6;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 7%;
  box-shadow: 0px 20px 25px -5px rgba(0, 0, 0, 0.10), 0px 8px 10px -6px rgba(0, 0, 0, 0.10);
`;

const floatAnimation = keyframes`
  0% {
    transform: translateY(30px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const bloomAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 100;
  }
  25% {
    animation-timing-function: ease-in;
    transform: rotate(0deg) scale(1);
  }
  50% {
    animation-timing-function: ease-out;
    transform: rotate(-60deg) scale(1.2);
  }
  100% {
    transform: rotate(-360deg) scale(1);
  }
`;

const boingAnimation = keyframes`
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(0.7) rotate(40deg);
  }
  95% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const FlowerBox = styled.div`
  width: 40px;
  height: 40px;
  border: solid 1px #C6C6C6;
  border-radius: 8px;
  background-color: #FEFEFE;
  margin: 6px;
  animation: ${floatAnimation} 1s ease-in-out;
`;

const Flower = styled.img`
  width: 100%;
  height: 100%;
  
  animation: ${boingAnimation} 2s;
`;

export default Flowers;
