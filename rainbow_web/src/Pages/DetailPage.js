import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BackBtn } from "../Components/BackBtn";
import Header from "../Components/DetailHeader";
import WriteDeleteModal from '../Components/WriteDeleteModal';
import { getDetailAPI, deletePostAPI } from "../APIs/PublicAPI";

function DetailPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDetailAPI(params.postId);
      console.log(response);
      setResult(response);
    };

    fetchData();
  }, [params.postId]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deletePostAPI(params.postId);
      navigate("/main");
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
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
            <StyledLink to={`/edit/${params.postId}`}>
              <EditBtn>수정하기</EditBtn>
            </StyledLink>
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
      <WriteDeleteModal isOpen={isModalOpen} onRequestClose={closeModal} onExit={handleDelete} />
    </Container>
  );
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
width: 100%;
color: #2C2C2C;
background-color: inherit;
border: none;
font-size: 15px;
font-weight: 500;
&:hover{
cursor: pointer;
}
`

const StyledLink = styled(Link)`
width: 50%;
display: flex;
justify-content: center;
align-items: center;
text-decoration: none;
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