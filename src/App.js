import logo from './logo.svg';
import './App.css';
import Customerlist from './components/Customerlist';
import { Link, Route, Routes, BrowserRouter } from 'react-router-dom';
import Trainingslist from './components/Trainingslist';
import Home from './components/Home';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/customerlist" element={<Customerlist />} />
          <Route path="/trainingslist" element={<Trainingslist />} />
        </Routes>
      </BrowserRouter>
      <Nav />
    </div>
  );
}

export default App;
