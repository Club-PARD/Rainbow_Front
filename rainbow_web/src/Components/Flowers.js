import React, { useEffect } from "react";
import { useRecoilState } from 'recoil';
import PostCount from '../Atom.js';

export default Flowers = async (posts) => {
  // 코드 설명
  // FlowersWrapper: 제일 큰 박스 - 꽃들 전부 담음
  // FlowerBox:
  // Flower: 띠용하는 애니메이션 적용 위해 FlowerBox와 나눴음

  return (
    <FlowersWrapper>
      {posts.map(() => {
        return(
          <FlowerBox>
            <
          </FlowerBox>
        )
      })}
    </FlowersWrapper>
  );
};

const FlowersWrapper = styled.div`
width: 556px;
height: 244px;

background-color: #FEFEFE;
border: soild 0.8px #DDD;
border-radius: 8px;

padding: 24px;
margin: 32px;
`

const FlowerBox = styled.div`
width: 40px;
height: 40px;
border: solid 0.8px #C6C6C6;
border-radius: 8px;
background-color: #FEFEFE;
`

const Flower = styled.div``