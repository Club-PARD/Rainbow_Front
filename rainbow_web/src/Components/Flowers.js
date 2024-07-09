// import React, { useState, useEffect } from 'react';
// import styled, { keyframes } from 'styled-components';
// import flowerImage from "../Assets/Img/flower.svg";
// import { useRecoilValue } from 'recoil';
// import { Increased, PostCount, UserData } from '../Atom';
// import { getCountAPI } from '../APIs/AxiosAPI';

// // 코드 설명
// // FlowersWrapper: 제일 큰 박스 - 꽃들 전부 담음
// // FlowerBox: 꽃마다 border 적용 위함
// // Flower: 띠용하는 애니메이션 적용 위해 FlowerBox와 나눴음
// // increased ? 마지막 꽃 띠용 + increased = false : 그냥 출력

// const Flowers = () => {
//   const [userData, setUserData] = useRecoilValue(UserData);
//   const [isIncreased, setIsIncreased] = useRecoilValue(Increased);
//   const [saveIncreased, setSaveIncreased] = useState(false);
//   const [postNumber, setPostNumber] = useRecoilValue(PostCount);

//   const flowerArray = Array.from({ length: postNumber-1 }, (_, index) => index + 1);

//   const getPostCount = async () => {
//     const response = await getCountAPI(userData.user_id);
//     setPostNumber(response);
//   };

//   useEffect(() => {
//     getPostCount();
//     setSaveIncreased(isIncreased);
//     setIsIncreased(false);
//   });

//   return (
//     <FlowersWrapper>
//         {flowerArray.map((i) => 
//             <FlowerBox key={i}>
//             <Flower src={flowerImage} alt="flower" />
//             </FlowerBox>
//         )}
//         {isIncreased && (
//             <FlowerBox key={postNumber-1}>
//                 <Flower src={flowerImage} alt="flower" animate={saveIncreased} />
//             </FlowerBox>
//         )}
//     </FlowersWrapper>
//   );
// };

// const FlowersWrapper = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   width: 556px;
//   height: auto;
//   min-height: 244px;
//   background-color: #FEFEFE;
//   border: solid 1.5px #C6C6C6;
//   border-radius: 8px;
//   padding: 24px;
//   margin: 32px;
// `;

// const floatAnimation = keyframes`
//   0% {
//     transform: translateY(30px);
//   }
//   50% {
//     transform: translateY(-10px);
//   }
//   100% {
//     transform: translateY(0);
//   }
// `;

// const boingAnimation = keyframes`
//   0% {
//     transform: rotate(0deg);
//   }
//   40% {
//     transform: rotate(-30deg);
//   }
//   60% {
//     transform: rotate(15deg);
//   }
//   70% {
//     transform: rotate(-8deg);
//   }
//   75% {
//     transform: rotate(4deg);
//   }
//   80% {
//     transform: rotate(-2deg);
//   }
//   90% {
//     transform: rotate(1deg);
//   }
//   100% {
//     transform: rotate(0deg);
//   }
// `;

// const bloomAnimation = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 100;
//   }
//   25% {
//     animation-timing-function: ease-in;
//     transform: rotate(0deg) scale(1);
//   }
//   50% {
//     animation-timing-function: ease-out;
//     transform: rotate(-60deg) scale(1.2);
//   }
//   100% {
//     transform: rotate(-360deg) scale(1);
//   }
// `;

// const FlowerBox = styled.div`
//   width: 40px;
//   height: 40px;
//   border: solid 1px #C6C6C6;
//   border-radius: 8px;
//   background-color: #FEFEFE;
//   margin: 8px;

// //   blooming animation과 같이 쓸 animation
//   animation: ${floatAnimation} 1s ease-in-out;
// `;

// const Flower = styled.img`
//   width: 100%;
//   height: 100%;
  
//   ${({ animate }) => animate && `
//     animation: ${bloomAnimation} 2s;
//     /* animation: ${boingAnimation} 1s; */ /* 주석 처리 */
//   `}
// `

// export default Flowers;

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
      {saveIncreased && (
        <FlowerBox key={postNumber}>
          <Flower src={flowerImage} alt="flower" animate={saveIncreased} />
        </FlowerBox>
      )}
    </FlowersWrapper>
  );
};

// Styled components for the flower animation
const FlowersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 556px;
  height: auto;
  min-height: 244px;
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
  animation: ${floatAnimation} 1s ease-in-out;
`;

const Flower = styled.img`
  width: 100%;
  height: 100%;
  ${({ animate }) => animate && `
    animation: ${bloomAnimation} 2s;
  `}
`;

export default Flowers;
