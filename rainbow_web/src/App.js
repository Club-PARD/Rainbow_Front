import './App.css';
import LoginPage from './Pages/LoginPage';
import {Route, Routes} from "react-router-dom";
import Main from './Pages/Main';
import Book from './Pages/Book';
import List from './Pages/List';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/main" element={<MainPage />}/>
        <Route path="/book" element={<Book />}/> 
        <Route path="/list" element={<List />}/>
      </Routes>
    </div>
  );
}

export default App;