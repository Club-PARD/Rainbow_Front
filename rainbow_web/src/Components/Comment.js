import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import Profile from '../Assets/Img/회_프로필.png';
import { UserData } from '../Atom';
import { getUserByIDAPI } from '../APIs/RegisterAPI';

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const ownerId = useRecoilValue(UserData);
  const server = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${server}/comment/readAll/${ownerId.user_id}`);
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
  }, [server, ownerId]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        const userData = await getUserByIDAPI(ownerId.user_id);
        const nickname = userData.name;
        console.log(userData);
        console.log(nickname);

        const newCommentData = {
          nickname: nickname,
          userComment: newComment,
        };

        await axios.post(`${server}/comment/${ownerId.user_id}/${ownerId.user_id}`, newCommentData);
        //추후에 페이지 연결후 writerId로 수정 필요
        setComments([{ nickname: nickname, text: newComment }, ...comments]);
        setNewComment('');
      } catch (error) {
        console.error('Failed to post comment:', error);
      }
    }
  };

  return (
    <BigContainer>
      <TopBlurr />
      <Container>
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
  align-items: flex-start;
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
  padding-bottom: 4px;
  padding-left: 8px;
  border: 1px solid #C6C6C6;
  border-radius: 8px;
  background-color: #FEFEFE;
  // box-sizing: border-box;
`;

const CommentTextarea = styled.textarea`
  flex: 1;
  height: 22px;
  padding-top: 8px;
  margin-bottom: 4px;
  font-size: 14px;
  border: none;
  resize: none;
  outline: none;
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
  width: 76px;
  height: 32px;
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
  top: 392.7px;
  left: 0;
  border-radius: 8px;
  backdrop-filter:blur(1px);
  mask: linear-gradient(180deg, rgba(217, 217, 217, 0.00) 0%, #FFF 100%);
  z-index: 999;
`