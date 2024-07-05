import React, { useEffect } from "react";
import { useRecoilState } from 'recoil';
import PostCount from '../Atom.js';
import styled from 'styled-components';
import flower from "../Img/flower.svg";

export default Flowers = async () => {
  // 코드 설명
  // FlowersWrapper: 제일 큰 박스 - 꽃들 전부 담음
  // FlowerBox: 꽃마다 border 적용 위함
  // Flower: 띠용하는 애니메이션 적용 위해 FlowerBox와 나눴음

  // map: posts object를 파라미터로 전달받아서 그 개수만큼 mapping 할 거임

  // 파라미터 post
  
  const posts = {};

  return (
    <FlowersWrapper>
      {posts.map(() => {
        return(
          <FlowerBox>
            <Flower src={ flower } alt="flower" />
          </FlowerBox>
        )
      })}
    </FlowersWrapper>
  );
};

const FlowersWrapper = styled.div`
display: flex;
flex-wrap: wrap;

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

const Flower = styled.img`
width: 100%;
height: 100%;

`