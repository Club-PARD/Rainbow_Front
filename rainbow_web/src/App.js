import './App.css';
import {Route, Routes} from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import CommunityPage from './Pages/CommunityPage';
import MainPage from './Pages/MainPage';
import WritingPage from './Pages/WritingPage';
import LocalSignUp from './Pages/LocalSignUp';
import GoogleSignUp from './Pages/GoogleSignUp';
import Comment from './Components/Comment';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/comment" element={<Comment />}/>
        <Route path="/community" element={<CommunityPage />}/>
        <Route path="/main" element={<MainPage />}/>
        <Route path="/write" element={<WritingPage />}/>
        <Route path="/register" element={<LocalSignUp />}/>
        <Route path="/register-google" element={<GoogleSignUp />}/>
      </Routes>
    </div>
  );
}

export default App;