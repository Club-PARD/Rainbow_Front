import styled from "styled-components";
import { BackBtn } from "./BackBtn";
import mainTest from "../Assets/Img/mainTest.png";

function DetailPage(){
    const DetailInfo = {
        id:{
            title: "반려동물이 어떤 위로를 주었는지 기억나시나요?",
            image: mainTest,
            content: "소년은 개울가에서 소녀를 보자 곧 윤 초시네 증손녀 딸이라는 걸 알 수 있었다. 그런데, 어제까지는 개울 기슭에서 하더니, 오늘은 징검다리 한가운데 앉아서 하고 있다. 소녀는 소년이 개울둑에 앉아 있는 걸 아는지 모르는지 그냥 날쌔게 물만 움켜 낸다. 소녀의 그림자가 뵈지 않는 날이 계속될수록 소년의 가슴 한 구석에는 어딘가 허전함이 자리 잡는 것이었다. 그러한 어떤 날, 소년은 전에 소녀가 앉아 물장난을 하던 징검다리 한가운데에 앉아 보았다. 개울가에 이르니, 며칠째 보이지 않던 소녀가 건너편 가에 앉아 물장난을 하고 있었다. 얼마 전에 소녀 앞에서 한 번 실수를 했을 뿐, 여태 큰길 가듯이 건너던 징검다리를 오늘은 조심스럽게 건넌다. 여기서 소녀는 아래편으로 한 삼 마장쯤, 소년은 우대로 한 십 리 가까운 길을 가야 한다. 소녀가 걸음을 멈추며, 너, 저 산 너머에 가 본 일 있니. 벌 끝을 가리켰다. 오늘 같은 날은 일찍 집으로 돌아가 집안 일을 도와야 한다는 생각을 잊어버리기라도 하려는 듯이. 저놈의 독수리, 저놈의 독수리, 저놈의 독수리가 맴을 돌고 있기 때문이다."
        }
    }
    return(
        <Container>
            <DetailTopMenu>
                <StyledBackBtn>
                    <BackBtn/>
                </StyledBackBtn>
                <EdleteBtn>
                    <EditBtn>수정하기</EditBtn>
                    <DeleteBtn>삭제하기</DeleteBtn>
                </EdleteBtn>
            </DetailTopMenu>

            <Detail>
                <Title>{DetailInfo.id.title}</Title>
                <ImgWrapper>
                    <Image src={DetailInfo.id.image} alt="사진"/>
                </ImgWrapper>
                <Content>{DetailInfo.id.content}</Content>
            </Detail>

            <DetailBottomMenu>
                <DetailBottomBtn>&larr;&nbsp;&nbsp;Previos</DetailBottomBtn>
                <DetailBottomBtn>Next&nbsp;&nbsp;&rarr;</DetailBottomBtn>
            </DetailBottomMenu>
        </Container>
    )
}

export default DetailPage;

const Container = styled.div`
width : 100vw;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const DetailTopMenu = styled.div`
width: 556px;
height: 64px;
display: flex;
justify-content: space-between;
align-items: center;
`

const StyledBackBtn = styled.div`
&:hover{
cursor: pointer;
}
`

const EdleteBtn = styled.div`
width: 160px;
height: 40px;
display: flex;
justify-content: center;
align-items: center;
`

const EditBtn = styled.button`
width: 50%;
color: #2C2C2C;
background-color: inherit;
border: none;
font-size: 15px;
font-weight: 500;
&:hover{
cursor: pointer;
}

`

const DeleteBtn = styled.button`
width: 50%;
color: #EC221F;
background-color: inherit;
border: none;
font-size: 15px;
font-weight: 500;
&:hover{
cursor: pointer;
}
`

const Detail = styled.div`
width: 556px;
display: flex;
flex-direction: column;
align-items: center;
border: 1px solid #C6C6C6;
border-radius: 8px;
background-color: #FEFEFE;
padding: 24px;
`

const Title = styled.div`
width: 100%;
font-size: 20px;
font-weight: 400;
color: #2C2C2C;
margin-bottom: 40px;
`

const ImgWrapper = styled.div`
width: 100%;
display: flex;
justify-content: center;
margin-bottom: 40px;
`

const Image = styled.img`
border-radius: 6px;
width: 250px;
height: 300px;
background-size: cover;
`

const Content = styled.div`
width: 100%;
font-size: 16px;
font-weight: 400px;
color: #2C2C2C;
`

const DetailBottomMenu = styled.div`
width: 590px;
display: flex;
justify-content: space-between;
padding-top: 24px;
`

const DetailBottomBtn = styled.button`
width: 100px;
height: 40px;
color: #2C2C2C;
background-color: #FEFEFE;
border: 1px solid #C6C6C6;
border-radius: 8px;
font-size: 14px;
font-weight: 500;
&:hover{
cursor: pointer;
}
`