import React, { useState } from 'react';
import './App.css';
import SimulatorPage from '././components/BankLoanSimulator/BankLoanSimulator';
import ComparateurPage from '././components/BankComparator/BankComparator';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes, Navigate   } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';



function App() {
  

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="App-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
          <Route path="/comparateur" element={<ComparateurPage />} />
          <Route path="/simulateur" element={<SimulatorPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          
          </Routes>
          
        </main>
      </div>
    </Router>
  );
}

export default App;