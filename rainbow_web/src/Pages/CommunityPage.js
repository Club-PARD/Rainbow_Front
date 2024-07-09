import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import CommunityHeader from '../Components/CommunityHeader';

const server = process.env.REACT_APP_API_URL;

function CommunityPage() {
  const [images, setImages] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`${server}/api/post/community`)
      .then(response => {
        setImages(response.data);
        console.log(response);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <CommunityPageContainer isBlurred={isModalOpen}>
      <CommunityPageBackground />
      <CommunityHeader setModalOpen={setModalOpen} />
      <Tip>
        <Text>Tip!</Text>
        <Text>커뮤니티에 내 게시물 공개 여부는 우측 상단 프로필 버튼을 통해서 설정할 수 있습니다.</Text>
      </Tip>
      <ImageContainer>
        {images.map((data, index) => (
          <ImageWrapper key={index} isLastOdd={index === images.length - 1 && images.length % 2 !== 0}>
            <Image src={data.pictureUrl} alt={`sample ${index + 1}`} />
            <OverlayText>{data.postTitle}</OverlayText>
          </ImageWrapper>
        ))}
      </ImageContainer>
    </CommunityPageContainer>
  );
}

export default CommunityPage;

const CommunityPageBackground = createGlobalStyle`
  body {
    background-color: #131313 !important;
    background-image: none !important;
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
`;

const Tip = styled.div`
  display: flex;
  flex-direction: row;
  width: 556px;
  height: auto;
  padding: 16px;
  align-items: center;
  gap: 24px;
  border-radius: 8px;
  border: 1px solid #393939;
  background: #2C2C2C;
  margin-bottom: 24px;
`;

const Text = styled.div`
  max-width: 420px;
  color: #FFF;
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
  &:hover{
    cursor: pointer;
  }
`;

const Image = styled.img`
  width: 262px;
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