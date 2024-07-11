import './App.css';
import {Route, Routes} from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import CommunityPage from './Pages/CommunityPage';
import CommunityDetail from './Pages/CommunityDetail';
import MainPage from './Pages/MainPage';
import CommunityMainPage from './Pages/CommunityMainPage';
import WritingPage from './Pages/WritingPage';
import LocalSignUp from './Pages/LocalSignUp';
import GoogleSignUp from './Pages/GoogleSignUp';
import Comment from './Components/Comment';
import DetailPage from './Pages/DetailPage';
import LandingPage from './Pages/LandingPage';
import EditPage from './Pages/EditPage';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={LoginState ? (<MainPage />) : (<LandingPage />)}/> */}
        <Route path="/" element={<LandingPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/comment" element={<Comment />}/>
        <Route path="/community" element={<CommunityPage />}/>
        <Route path="/main/:userId" element={<MainPage />}/>
        <Route path="/c_main/:userId" element={<CommunityMainPage />}/>
        <Route path="/write" element={<WritingPage />}/>
        <Route path="/register" element={<LocalSignUp />}/>
        <Route path="/register-google" element={<GoogleSignUp />}/>
        <Route path="/detail/:userId/:postId" element={<DetailPage/>}/>
        <Route path="/c_detail/:userId/:postId" element={<CommunityDetail/>}/>
        <Route path="/edit/:userId/:postId" element={<EditPage/>}/>
      </Routes>
    </div>
  );
}

export default App;