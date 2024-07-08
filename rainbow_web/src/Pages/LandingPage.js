import LandingHeader from "../Components/LandingHeader";
import styled from "styled-components";

function LandingPage () {
  return (
    <LandingWrapper>
        <LandingHeader />
        <p>dafdslkja;da</p>
    </LandingWrapper>
  );
};

const LandingWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  
  margin: 151px;

  overflow-y: scroll;
  background:
    linear-gradient(
      white 30%,
      rgba(255, 255, 255, 0)
    ) center top;
    linear-gradient(
      rgba(255, 255, 255, 0), 
      white 70%
    ) center bottom;
`

export default LandingPage;