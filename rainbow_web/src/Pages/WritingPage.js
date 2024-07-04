import React from 'react';
import { useLocation } from 'react-router-dom';

function WritingPage() {
  const location = useLocation();
  const { selectedQuestion } = location.state || {};

  return (
    <div>
      <h1>Writing Page</h1>
      {selectedQuestion ? (
        <p>선택된 질문: {selectedQuestion}</p>
      ) : (
        <p>질문이 선택되지 않았습니다.</p>
      )}
    </div>
  );
}

export default WritingPage;