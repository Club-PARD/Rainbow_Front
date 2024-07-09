import LandingHeader from "../Components/LandingHeader";
import styled from "styled-components";
import TypeLogo from "../Assets/Img/Type_Logo.svg";
import Ex1 from "../Assets/Img/example1.svg";
import Ex2 from "../Assets/Img/example2.svg";
import Ex3_1 from "../Assets/Img/example3_1.png";
import Ex3_2 from "../Assets/Img/example3_2.png";
import Ex3_3 from "../Assets/Img/example3_3.png";
import Bubble1 from "../Assets/Img/bubble1.svg";
import Bubble2 from "../Assets/Img/bubble2.svg";
import Bubble3 from "../Assets/Img/bubble3.svg";
import { Link } from "react-router-dom";

function LandingPage () {
  return (
    <div>
      <TopBlurr />
      <LandingWrapper>
        <LandingHeader />
        <LandingContent>
          {/* Typed Logo */}
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
          <img src={Ex1} alt="Example Page 1" style={{}} />
        </LandingContent>
        <LandingContent>
          <SubTitle>
            여러분의 이야기를 나누고<br/>
            위로와 희망을 얻으세요          
          </SubTitle>
          <img src={Bubble1} alt="Bubble 1" style={{}} />
          <img src={Bubble2} alt="Bubble 2" style={{}} />
          <img src={Bubble3} alt="Bubble 3" style={{}} />
        </LandingContent>
        <LandingContent>
          <SubTitle>
            사랑했던 반려동물을 추억하며,<br/>
            아름다운 꽃을 피워보세요.      
          </SubTitle>
          <img src={Ex2} alt="Example Page 2" style={{}} />
        </LandingContent>
        <LandingContent>
          <SubTitle>
            메인 페이지의 갤러리를 통해<br/>
            소중한 기억들을 차근차근 꺼내보세요    
          </SubTitle>
          <Example>
            <img src={Ex3_1} alt="Example Page 3-1" style={{}} />
            <img src={Ex3_2} alt="Example Page 3-2" style={{}} />
            <img src={Ex3_3} alt="Example Page 3-3" style={{}} />
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
    </div>
  );
};

const LandingWrapper = styled.div`
  width: 100vw;
  height: auto;

  padding: 15vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow-y: scroll;

  color: #2C2C2C;
`

const LandingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 35px;
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
  margin: 32px;
  font-size: 16px;

  color: #8952FF;

  &:hover {
    color: #6A3CCA;
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
  margin-bottom: 50px;
`

const Example = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const TopBlurr = styled.div`
  width: 100%;
  height: 30vh;

  position: fixed;
  top: 0;
  left: 0;

  backdrop-filter:blur(4px);
  mask: linear-gradient(#FFFFFD, transparent);
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