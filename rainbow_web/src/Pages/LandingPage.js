import LandingHeader from "../Components/LandingHeader";
import styled from "styled-components";
import TypeLogo from "../Assets/Img/Type_Logo.svg";
import Ex1 from "../Assets/Img/example1.svg";
import Ex2 from "../Assets/Img/example2.svg";
import Ex3 from "../Assets/Img/example3.png";
import FlowerExample from "../Assets/Img/flowerExample.gif";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function LandingPage () {
  useEffect(()=>{
    window.scrollTo(0, 0);
  });
  return (
    <Container>
      <TopBlurr />
      <LandingHeader />
      <LandingWrapper>
        <LandingContent>
          <img src={TypeLogo} alt="Sincerely," style={{ width: '130px' }} />
          <Text>
            반려동물이 무지개별로 떠난 후, 많이 힘드셨죠?<br/><br/>
            언제 처음 만나서, 어떻게 헤어지게 되었는지,<br/>
            그 친구와의 이야기를 들려주세요.<br/><br/>
            함께 반려동물과의 추억을 꽃으로 피워내며,<br/>
            그들이 우리 마음 속에서 영원히 살아있도록 해보아요.<br/>
          </Text>
          <Link to="/login" style={{ textDecoration: "none"}}>
            <TalkTo>
              이야기하러 가기
            </TalkTo>
          </Link>
        </LandingContent>
        <LandingContent>
          <SubTitle>
            그 누구에게도 하지 못한 이야기,<br/>
            Sincerely, 에서 들어줄게요
          </SubTitle>
          <img src={Ex1} alt="Example Page 1" style={{margin: '20px'}} />
        </LandingContent>
        <LandingContent>
          <SubTitle>
            여러분의 이야기를 나누고<br/>
            위로와 희망을 얻으세요          
          </SubTitle>
          <img src={Ex2} alt="Example Page 2" style={{margin: '20px'}} />
        </LandingContent>
        <LandingContent>
          <SubTitle>
            사랑했던 반려동물을 추억하며,<br/>
            아름다운 꽃을 피워보세요.      
          </SubTitle>
          <GIF>
            <img src={FlowerExample} alt="Example Flower" style={{width: '410px'}} />
          </GIF>
        </LandingContent>
        <LandingContent>
          <SubTitle>
            메인 페이지의 갤러리를 통해<br/>
            소중한 기억들을 차근차근 꺼내보세요    
          </SubTitle>
          <Example>
            <img src={Ex3} alt="Example Page 3" style={{margin: '20px'}} />
          </Example>
        </LandingContent>
        <LandingContent>
          <SubTitle>
            지금 추억하고 싶은 기억이 있다면,
          </SubTitle>
          <Link to="/login" style={{ textDecoration: "none"}}>
            <TalkTo>
              이야기하러 가기
            </TalkTo>
          </Link>
        </LandingContent>
      </LandingWrapper>
      <BottomBlur />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: auto;
`;

const LandingWrapper = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 13vh;

  overflow: scroll;

  color: #2C2C2C;
`

const LandingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 10vh;
`

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 35px;
  margin-bottom: 30%;
`

const GIF = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 11.707px;
  filter: drop-shadow(0px 11.326px 9.061px rgba(0, 0, 0, 0.10)) drop-shadow(0px 28.315px 11px rgba(0, 0, 0, 0.10));
  backdrop-filter: blur(10.527029037475586px);
`

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;

  margin: 32px;
`

const TalkTo = styled.div`
  display: flex;
  height: 32px;
  justify-content: center;
  align-items: center;

  margin: 12px;
  padding: 0 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #D5C1FF;

  color: #8952FF;

  &:hover {
    border: 1px solid #F0EAFF; 
    color: #8952FF;
    background-color: #F0EAFF;
  }
`

const SubTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 24px;
`

const Example = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const TopBlurr = styled.div`
  width: 100%;
  height: 20vh;

  position: fixed;
  top: 0;
  left: 0;

  backdrop-filter:blur(4px);
  mask: linear-gradient(#FFFFFD, #FFFFFD, transparent);
`

const BottomBlur = styled.div`
  width: 100%;
  height: 15vh;

  position: fixed;
  bottom: 0;
  left: 0;
  
  backdrop-filter:blur(4px);
  mask: linear-gradient(transparent, #FFFFFD);

  background: radial-gradient(35em 60em at 50% 100%, #C5AAFF, #FFFFFD, #FFFFFD);
`

export default LandingPage;