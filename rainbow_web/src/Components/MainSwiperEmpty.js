import styled from "styled-components";
import PostUpload from "../Assets/Img/PostUpload.svg";
import WriteBtn from "./WriteBtn3";
import WriteBtn2 from "./WriteBtn4";

function MainSwiperEmpty(){
    return(
        <EmptyCase>
            <Explain>
                글을 작성하고<br/>
                사진첩을 완성해보세요!
            </Explain>
            <WriteBtn2/>
            <WriteBtn/>
        </EmptyCase>
    )
}

export default MainSwiperEmpty;

const EmptyCase = styled.div`
width: 440px;
height: 460px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Explain = styled.div`
display: flex;
justify-content: center;
align-items: center;
text-align: center;
width: 220px;
height: 64px;
font-size: 24px;
font-weight: 400;
`

const StyledPostImg = styled.div`
background-image: url(${PostUpload});
width: 440px;
height: 300px;
transition: transform 0.3s ease-in-out;
&:hover{
cursor: pointer;
transform: scale(1.03);
}
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