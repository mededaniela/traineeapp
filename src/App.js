import './App.css';
import Customerlist from './components/Customerlist';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Trainingslist from './components/Trainingslist';
import Home from './components/Home';
import Nav from './components/Nav';
import TrainingsCalendar from './components/Calendar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/customerlist" element={<Customerlist />} />
          <Route path="/trainingslist" element={<Trainingslist />} />
          <Route path="/calendar" element={<TrainingsCalendar />} />
        </Routes>
      </BrowserRouter>
      <Nav />
    </div>
  );
}

export default App;
