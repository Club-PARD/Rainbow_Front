import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import flowerImage from "../Img/flower.svg";
import { useRecoilState } from 'recoil';
import { PrevCount } from '../Atom';

// 코드 설명
// FlowersWrapper: 제일 큰 박스 - 꽃들 전부 담음
// FlowerBox: 꽃마다 border 적용 위함
// Flower: 띠용하는 애니메이션 적용 위해 FlowerBox와 나눴음

// map: posts object를 파라미터로 전달받아서 그 개수만큼 mapping 할 거임

// 파라미터 post

const Flowers = ({ postCount }) => {
  const [increased, setIncreased] = useState(false);
  const [prevCount, setPrevCount] = useRecoilState(PrevCount);

  useEffect(() => {
    if (postCount === prevCount+1) {
      setIncreased(true);;
      setPrevCount(postCount);
    }
  }, [postCount]);

  const prevNumber = Array.from({ length: prevCount }, (_, index) => index + 1);

  return (
    <FlowersWrapper>
        {prevNumber.map(i => (
            <FlowerBox key={i}>
            <Flower src={flowerImage} alt="flower" />
            </FlowerBox>
        ))}
        {increased &&
            <FlowerBox key={postCount}>
                <Flower src={flowerImage} alt="flower" animate={increased} />
            </FlowerBox>
        }
    </FlowersWrapper>
  );
};

const FlowersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 556px;
  height: auto;
  background-color: #FEFEFE;
  border: solid 1.5px #C6C6C6;
  border-radius: 8px;
  padding: 24px;
  margin: 32px;
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

const boingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  40% {
    transform: rotate(-30deg);
  }
  60% {
    transform: rotate(15deg);
  }
  70% {
    transform: rotate(-8deg);
  }
  75% {
    transform: rotate(4deg);
  }
  80% {
    transform: rotate(-2deg);
  }
  90% {
    transform: rotate(1deg);
  }
  100% {
    transform: rotate(0deg);
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

const FlowerBox = styled.div`
  width: 40px;
  height: 40px;
  border: solid 1px #C6C6C6;
  border-radius: 8px;
  background-color: #FEFEFE;
  margin: 8px;

//   blooming animation과 같이 쓸 animation
//   animation: ${floatAnimation} 1s ease-in-out;
`;

const Flower = styled.img`
  width: 100%;
  height: 100%;
  
  ${({ animate }) => animate && `
    // animation: ${bloomAnimation} 2s;
    animation: ${boingAnimation} 1s;
  `}
`;

export default Flowers;
