import React, { useState } from 'react';
import styled from 'styled-components';
import Profile from '../Assets/Img/회_프로필.png';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { nickname: 'cheche', text: newComment }]);
      setNewComment('');
    }
  };

  return (
    <BigContainer>
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
      <CommentForm onSubmit={handleCommentSubmit}>
        <CommentFormContainer>
          <CommentTextarea
            rows="4"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="방명록을 입력해주세요"
          />
          <Button type="submit">보내기</Button>
        </CommentFormContainer>
      </CommentForm>
    </BigContainer>
  );
};

export default Comments;

const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 556px;
  height: auto;
  gap: 16px;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 520px;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border: 1px solid #C6C6C6;
  border-radius: 8px;
  background-color: #FEFEFE;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 109.5%;
  gap: 8px;
`;

const CommentFormContainer = styled.div`
  display: flex;
  //flex-direction: row;
  width: 100%;
  height: auto;
  padding: 8px 16px;
  border: 1px solid #C6C6C6;
  border-radius: 8px;
  background-color: #FEFEFE;
  box-sizing: border-box;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  height: auto;
  padding: 8px;
  border: none;
  resize: none;
  outline: none;
  box-sizing: border-box;
`;

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
`;

const CommentItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  width: 100%;
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
  font-weight: bold;
`;

const CommentText = styled.span`
  display: block;
`;

const Button = styled.button`
  align-self: flex-end;
  width: 50px;
  height: 16px;
  border: none;
  background-color: #FEFEFE;
  color: #2C2C2C;
`;