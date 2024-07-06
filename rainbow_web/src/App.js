import './App.css';
import {Route, Routes} from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import CommunityPage from './Pages/CommunityPage';
import MainPage from './Pages/MainPage';
import WritingPage from './Pages/WritingPage';
import LocalSignUp from './Pages/LocalSignUp';
import Main from './Pages/Main';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/test" element={<Main />}/>
        <Route path="/community" element={<CommunityPage />}/>
        <Route path="/main" element={<MainPage />}/>
        <Route path="/write" element={<WritingPage />}/>
        <Route path="/register" element={<LocalSignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;