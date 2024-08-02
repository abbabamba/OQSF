import React from 'react';
import './App.css';
import SimulatorPage from './pages/Simulator';
import ComparateurPage from './pages/Comparator';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="App-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/simulator" element={<SimulatorPage />} />
            <Route path="/comparateur" element={<ComparateurPage />} />

          </Routes>
        </main>
       
      </div>
    </Router>
  );
}

export default App;
