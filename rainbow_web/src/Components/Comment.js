import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import Profile from '../Assets/Img/회_프로필.png';
import { UserData } from '../Atom';
import { getUserByIDAPI } from '../APIs/RegisterAPI';
import { useParams } from 'react-router-dom';

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const { userId } = useParams(); // 현재 보고 있는 사용자의 ID
  const currentUser = useRecoilValue(UserData); // 현재 로그인한 사용자
  const [commentCount, setCommentCount] = useState(0);

  const server = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${server}/comment/readAll/${userId}`);
        const fetchedComments = response.data.map((comment) => ({
          nickname: comment.writerName,
          text: comment.userComment,
        }));
        setComments(fetchedComments.reverse());
        console.log(response);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };

    fetchComments();
  }, [server, userId]);

  const getCommentCount = async () => {
    try {
      const response = await axios.get(`${server}/comment/count/${userId}`);
      setCommentCount(response.data);
      console.log("response: " + response + " saved: " + commentCount);
    } catch(err) {
      console.error(err);
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        const userData = await getUserByIDAPI(currentUser.user_id);
        const nickname = userData.name;
        console.log(userData);
        console.log(nickname);

        const newCommentData = {
          nickname: nickname,
          userComment: newComment,
        };

        await axios.post(`${server}/comment/${userId}/${currentUser.user_id}`, newCommentData);
        setComments([{ nickname: nickname, text: newComment }, ...comments]);
        setNewComment('');
      } catch (error) {
        console.error('Failed to post comment:', error);
      }
    }
  };

  useEffect(() => {
    getCommentCount();
  });

  return (
    <BigContainer>
      <TopBlurr />
      <Container commentCount={commentCount}>
        {(commentCount == 0) && 
          <None>
            아직 등록된 글이 없어요!<br />
            서로에게 위로의 말을 건네 보세요
          </None>
        }
        <CommentList>
          {comments.map((comment, index) => (
            <CommentItem key={index}>
              <ProfileImg src={Profile} alt="profile" />
              <CommentContent>
                <Nickname>{comment.nickname}</Nickname>
                <CommentText>{comment.text}</CommentText>
              </CommentContent>
            </CommentItem>
          ))}
        </CommentList>
      </Container>
      <CommentFormContainer onSubmit={handleCommentSubmit}>
        <CommentTextarea
          rows="1"
          value={newComment}
          onChange={handleCommentChange}
          placeholder={placeholderVisible ? "방명록을 입력해주세요" : ""}
          onFocus={() => setPlaceholderVisible(false)}
          onBlur={() => setPlaceholderVisible(true)}
        />
        <Button type="submit" disabled={!newComment.trim()} className={!newComment.trim() ? 'disabled' : ''}>
          보내기
        </Button>
      </CommentFormContainer>
    </BigContainer>
  );
};

export default Comment;

const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 556px;
  height: 478px;
  margin-bottom: 90px;
  gap: 16px;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 478px;
  padding: 8px 16px 8px 24px;
  flex-direction: column;
  align-items: ${(props) => (props.commentCount === 0 ? 'center' : 'flex-start')};
  justify-content: ${(props) => (props.commentCount === 0 ? 'center' : 'flex-start')};
  border: 1px solid #C6C6C6;
  border-radius: 8px;
  background-color: #FEFEFE;
  overflow-y: auto;
  position: relative;
`;

const CommentFormContainer = styled.form`
  display: flex;
  align-items: center;
  width: 594px;
  height: 50px;
  padding-left: 8px;
  border: 1px solid #C6C6C6;
  border-radius: 8px;
  background-color: #FEFEFE;
`;

const CommentTextarea = styled.textarea`
  flex: 1;
  min-height: 22px;
  height: auto;
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  resize: none;
  outline: none;
  font-family: "Pretendard-Regular";
  box-sizing: border-box;
  &::placeholder {
    color: #868686;
  }
`;

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  height: auto;
  margin-top: 16px;
  margin-bottom: -6px;
`;

const CommentItem = styled.li`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: auto;
  margin-bottom: 24px;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  margin-right: 10px;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.span`
  align-self: stretch;
  color: #868686;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
`;

const CommentText = styled.span`
  align-self: stretch;
  color: #2C2C2C;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 12px;
  background-color: #FEFEFE;
  color: #2C2C2C;
  border: none;
  border-radius: 8px;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  &:hover {
    cursor: pointer;
  }
  &.disabled {
    color: #9B9B9B;
  }
`;

const TopBlurr = styled.div`
  width: 596px;
  height: 39px;
  position: relative;
  top: 391px;
  left: 0;
  border: 1px solid #C6C6C6;
  border-radius: 8px;
  backdrop-filter:blur(4px);
  mask: linear-gradient(transparent, #FFFFFD);

  background: radial-gradient(35em 60em at 50% 100%, #FFFFFD, #FFFFFD, #FFFFFD);
  z-index: 999;
`

const None = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  color: #868686;
  text-align: center;
`