import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import CommunityHeader from '../Components/CommunityHeader';
import sampleImage1 from '../Assets/Img/mainTest.png';
import sampleImage2 from '../Assets/Img/mainTest2.png';

function CommunityPage() {
  const images = [sampleImage1, sampleImage2, sampleImage1, sampleImage2];

  return (
    <CommunityPageContainer>
      <CommunityPageBackground />
      <CommunityHeader />
      <Tip>
        <Text>Tip!</Text>
        <Text>커뮤니티에 내 게시물 공개 여부는 우측 상단 프로필 버튼을 통해서 설정할 수 있습니다.</Text>
      </Tip>
      <ImageContainer>
        {images.map((image, index) => (
          <ImageWrapper key={index}>
            <Image src={image} alt={`sample ${index + 1}`} />
            <OverlayText>Sample Text {index + 1}</OverlayText>
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
`;

const Tip = styled.div`
  display: flex;
  flex-direction: row; /* 텍스트를 가로로 배치 */
  width: 556px;
  height: auto;
  padding: 16px;
  align-items: center;
  gap: 24px;
  border-radius: 8px;
  border: 1px solid var(--grayscale-900, #393939);
  background: #2C2C2C;
  margin-bottom: 20px; /* Tip과 ImageContainer 사이에 간격 추가 */
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
  gap: 24px;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  flex: 0 1 calc(50% - 12px); /* 간격의 절반을 양쪽에 추가 */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const OverlayText = styled.div`
  position: absolute;
  width: 246px;
  height: 60px;
  bottom: 0;
  color: #131313;
  //background: rgba(0, 0, 0, 0.5);
  padding: 18px 12px 12px 12px;
  border-radius: 4px;
  font-family: "Geist Mono";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 22.5px; /* 150% */
`;