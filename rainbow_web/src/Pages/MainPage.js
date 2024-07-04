import React from 'react';
import Header from '../Components/Header';

function MainPage() {
  const handleClick = () => {
    console.log("글쓰기 버튼 클릭됨");
  };
  return (
    <div>
      <Header />
      <button onClick={handleClick}>
        글쓰기
      </button>
    </div>
  );
}

export default MainPage;