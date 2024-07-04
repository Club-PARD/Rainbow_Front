import './App.css';
import {Route, Routes} from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import CommunityPage from './Pages/CommunityPage';
import MainPage from './Pages/MainPage';
import WritingPage from './Pages/WritingPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/community" element={<CommunityPage />}/>
        <Route path="/main" element={<MainPage />}/>
        <Route path="/write" element={<WritingPage />}/>
      </Routes>
    </div>
  );
}

export default App;