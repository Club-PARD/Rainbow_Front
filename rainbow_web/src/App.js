import './App.css';
import LoginPage from './Pages/LoginPage';
import {Route, Routes} from "react-router-dom";
import CommunityPage from './Pages/CommunityPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/community" element={<CommunityPage />}/>
      </Routes>
    </div>
  );
}

export default App;