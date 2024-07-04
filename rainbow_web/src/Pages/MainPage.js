import React from 'react';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  const goToWriting = () => {
    navigate('/write');
  };

  return (
    <div>
      <Header />
      <button onClick={goToWriting}>
        글쓰기
      </button>
    </div>
  );
}

export default MainPage;