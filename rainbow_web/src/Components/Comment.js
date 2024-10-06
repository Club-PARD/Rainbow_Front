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
        const response = await axios.get(`${server}/api/comment/readAll/${userId}`);
        const fetchedComments = response.data.map((comment) => ({
          commentId: comment.commentId, // 댓글 ID 추가
          text: comment.userComment,
          nickname: comment.writerName,
        }));
        setComments(fetchedComments.reverse());
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };

    fetchComments();
  }, [server, userId]);

  const getCommentCount = async () => {
    try {
      const response = await axios.get(`${server}/api/comment/count/${userId}`);
      setCommentCount(response.data);
      console.log("response: " + response + " saved: " + commentCount);
      console.log(currentUser.name);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    if (e.type === 'submit') {
      e.preventDefault();
      if (newComment.trim()) {
        try {
          const userData = await getUserByIDAPI(currentUser.user_id);
          const nickname = userData.name;
  
          const newCommentData = {
            nickname: nickname,
            userComment: newComment,
          };
  
          // 댓글 추가 요청
          await axios.post(`${server}/api/comment/${userId}/${currentUser.user_id}`, newCommentData);
  
          // 댓글 상태 업데이트 (새 댓글을 기존 댓글 리스트의 맨 앞에 추가)
          setComments([{ nickname: nickname, text: newComment, commentId: Date.now() }, ...comments]);
  
          // 댓글 개수 상태 업데이트
          setCommentCount(commentCount + 1);
  
          // 입력 필드 초기화
          setNewComment('');
        } catch (error) {
          console.error('Failed to post comment:', error);
        }
      }
    }
  };
   
  

  const handleDeleteComment = async (commentId, nickname) => {
    try {
        // 페이지 주인인지 확인하기 위해 API 호출
        const pageOwnerName = userId.name; // 페이지 주인의 이름

        // 1. 페이지 주인일 경우 (userId의 name과 nickname이 같으면 주인)
        if (nickname === pageOwnerName) {
            // 페이지 주인은 모든 댓글을 삭제할 수 있음
            const apiEndpoint = `${server}/api/comment/deleteByOwnerId/${userId}/${commentId}`;
            const response = await axios.delete(apiEndpoint);

            if (response.status === 200) {
                // 삭제 후 상태 업데이트
                setComments((prevComments) =>
                    prevComments.filter((comment) => comment.commentId !== commentId)
                );
                setCommentCount((prevCount) => prevCount - 1);
                alert('삭제되었습니다.'); // 삭제 알림
                //window.location.reload(); // 페이지 새로 고침
            } else {
                console.error('Failed to delete comment:', response);
                alert('댓글 삭제에 실패했습니다.');
            }
        } 
        // 2. 방문자인 경우 (currentUser.name과 nickname이 같으면 댓글 작성자임)
        else if (currentUser.name === nickname) {
            // 본인이 작성한 댓글만 삭제할 수 있음
            const apiEndpoint = `${server}/api/comment/deleteByWriterId/${currentUser.user_id}/${commentId}`;
            const response = await axios.delete(apiEndpoint);

            if (response.status === 200) {
                // 삭제 후 상태 업데이트
                setComments((prevComments) =>
                    prevComments.filter((comment) => comment.commentId !== commentId)
                );
                setCommentCount((prevCount) => prevCount - 1);
                alert('삭제되었습니다.'); // 삭제 알림
                //window.location.reload(); // 페이지 새로 고침
            } else {
                console.error('Failed to delete comment:', response);
                alert('댓글 삭제에 실패했습니다.');
            }
        } else {
            alert('댓글 작성자만 삭제할 수 있습니다.');
        }
    } catch (error) {
        console.error('Failed to delete comment:', error);
        alert('댓글 삭제 중 오류가 발생했습니다.');
    }
};

  
  useEffect(() => {
    // 댓글 및 댓글 개수 가져오기 (한 번만 실행됨)
    getCommentCount();
  }, [userId]); // userId 변경 시만 실행
  
  

  return (
    <BigContainer>
      <TopBlurr />
      <Container commentCount={commentCount}>
        {commentCount === 0 && (
          <None>
            아직 등록된 글이 없어요!
            <br />
            서로에게 위로의 말을 건네 보세요
          </None>
        )}
        <CommentList>
          {comments.map((comment, index) => (
            <CommentItem key={index}>
            <ProfileImg src={Profile} alt="profile" />
            <CommentContent>
              <Nickname>{comment.nickname}</Nickname>
              <CommentText>
                {comment.text}
                <DeleteButton onClick={() => handleDeleteComment(comment.commentId, comment.writerName)}>
                  X 삭제
                </DeleteButton>
              </CommentText>
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
          placeholder={placeholderVisible ? '방명록을 입력해주세요' : ''}
          onFocus={() => setPlaceholderVisible(false)}
          onBlur={() => setPlaceholderVisible(true)}
          onKeyDown={handleCommentSubmit}
        />
        <Button
          type="submit"
          disabled={!newComment.trim()}
          className={!newComment.trim() ? 'disabled' : ''}
        >
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

const CommentItem = styled.li`
  display: flex;
  height: auto;
  margin-bottom: 24px;
  //justify-content: space-between; /* Added to space out elements */
`;

const DeleteButton = styled.button`
  width: 76px;
  background-color: #fefefe;
  color: #bdbdbd;
  border: none;
  border-radius: 5px;
  padding: 0;
  cursor: pointer;
  &:hover {
    color: #000;
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

  background: radial-gradient(35em 60em at 50% 100%, #FFFFFD, #FFFFFD 70%, transparent), linear-gradient(transparent, #FFFFFD);
`;

const None = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #868686;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  text-align: center;
`;
