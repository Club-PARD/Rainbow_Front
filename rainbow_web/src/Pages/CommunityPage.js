import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import Header from '../Components/Header';

const server = process.env.REACT_APP_API_URL;

function CommunityPage() {
  const [images, setImages] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get(`${server}/api/post/community`)
      .then(response => {
        setImages(response.data);
        setLoaded(true);
        console.log(response);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <CommunityPageContainer isBlurred={isModalOpen}>
      <TopBlurr />
      <Header setModalOpen={setModalOpen} />
      <Tip isLoaded={isLoaded}>
        <Text>Tip!</Text>
        <Text>커뮤니티에 내 게시물 공개 여부는 우측 상단 프로필 버튼을 통해서 설정할 수 있습니다.</Text>
      </Tip>
      <ImageContainer>
        {images.map((data, index) => (
          <ImageWrapper key={index} isLoaded={isLoaded} index={index}>
            <Image src={data.pictureUrl} alt={`sample ${index + 1}`} />
            <OverlayText>{data.postTitle}</OverlayText>
          </ImageWrapper>
        ))}
      </ImageContainer>
    </CommunityPageContainer>
  );
}

export default CommunityPage;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CommunityPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  color: white;
  backdrop-filter: ${props => (props.isBlurred ? 'blur(10px)' : 'none')};
  transition: backdrop-filter 0.3s, background 0.3s;
  padding-top: 108px;
`;

const TopBlurr = styled.div`
  width: 100%;
  height: 108px;

  position: fixed;
  top: 0;
  left: 0;

  backdrop-filter:blur(2px);
`

const Tip = styled.div`
  display: flex;
  flex-direction: row;
  width: 556px;
  height: auto;
  padding: 16px;
  align-items: center;
  gap: 24px;
  border-radius: 8px;
  border: 1px solid #C6C6C6;
  background: #F3F3F3;
  margin-bottom: 24px;
  opacity: ${props => (props.isLoaded ? 1 : 0)};
  animation: ${props => props.isLoaded ? fadeIn : 'none'} 0.8s ease-in-out;
`;

const Text = styled.div`
  max-width: 420px;
  color: #2C2C2C;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 556px;
  height: auto;
  gap: 24px;
  justify-content: flex-start;
`;

const ImageWrapper = styled.div`
  flex: 0 1 calc(50% - 12px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 1.5px 3px 10px 0px rgba(0, 0, 0, 0.25), 0px 0px 13.125px 0px rgba(12, 12, 13, 0.10);
  &:hover{
    cursor: pointer;
  }
  opacity: ${props => (props.isLoaded ? 1 : 0)};
  animation: ${props => props.isLoaded ? fadeIn : 'none'} 0.8s ease-in-out;
  animation-delay: ${props => `calc(0.9s + ${props.index * 0.2}s)`}; /* 0.8s for Tip animation + 0.1s delay */
  animation-fill-mode: both;
`;

const Image = styled.img`
  width: 266px;
  height: 318px;
  object-fit: cover;
  border-radius: 8px;
`;

const OverlayText = styled.div`
  position: absolute;
  width: 222px;
  height: 49px;
  bottom: 0;
  color: #FEFEFE;
  padding: 18px 12px 12px 12px;
  border-radius: 4px;
  font-family: "Geist Mono";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 22.5px; /* 150% */
`;