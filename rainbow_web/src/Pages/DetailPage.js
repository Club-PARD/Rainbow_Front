import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { BackBtn } from "../Components/BackBtn";
import mainTest from "../Assets/Img/mainTest.png";
import Header from "../Components/DetailHeader";
import WriteDeleteModal from '../Components/WriteDeleteModal'; // 모달 컴포넌트 임포트
import { getDetailAPI } from "../APIs/AxiosAPI";

function DetailPage() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  //동운 코드
  const params = useParams();
  console.log(params);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const response = await getDetailAPI(params.postId);
        console.log(response);
        setResult(response);
    };

    fetchData();
},[])

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Header />
      <ContentWrapper>
        <DetailTopMenu>
          <StyledBackBtn>
            <BackBtn />
          </StyledBackBtn>
          <EdleteBtn>
            <EditBtn>수정하기</EditBtn>
            <DeleteBtn onClick={openModal}>삭제하기</DeleteBtn>
          </EdleteBtn>
        </DetailTopMenu>

        <Detail>
          <Title>{result.postTitle}</Title>
          <ImgWrapper>
            <Image src={result.pictureUrl} alt="사진" />
          </ImgWrapper>
          <Content>{result.postContent}</Content>
        </Detail>

        <DetailBottomMenu>
          <DetailBottomBtn>&larr;&nbsp;&nbsp;Previos</DetailBottomBtn>
          <DetailBottomBtn>Next&nbsp;&nbsp;&rarr;</DetailBottomBtn>
        </DetailBottomMenu>
      </ContentWrapper>
      <WriteDeleteModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </Container>
  )
}

export default DetailPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #FEFEFE;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailTopMenu = styled.div`
  width: 556px;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledBackBtn = styled.div`
  &:hover{
    cursor: pointer;
  }
`;

const EdleteBtn = styled.div`
  width: 160px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
`;

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
`;

const Detail = styled.div`
  width: 556px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #C6C6C6;
  border-radius: 8px;
  background-color: #FEFEFE;
  padding: 24px;
`;

const Title = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: 400;
  color: #2C2C2C;
  margin-bottom: 40px;
`;

const ImgWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const Image = styled.img`
  border-radius: 6px;
  width: 250px;
  height: 300px;
  background-size: cover;
`;

const Content = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  color: #2C2C2C;
`;

const DetailBottomMenu = styled.div`
  width: 590px;
  display: flex;
  justify-content: space-between;
  padding-top: 24px;
`;

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
`;