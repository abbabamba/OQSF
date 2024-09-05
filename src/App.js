import React, { useState } from 'react';
import './App.css';
import SimulatorPage from '././components/BankLoanSimulator/BankLoanSimulator';
import ComparateurPage from '././components/BankComparator/BankComparator';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import UserForm from './components/UserForm';
import { BrowserRouter as Router, Route, Routes   } from 'react-router-dom';

function App() {
  const [userInfo, setUserInfo] = useState(null);

   const handleUserSubmit = (info) => {
     setUserInfo(info);
   };

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="App-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/simulateur"
              
               element={
                userInfo ? <SimulatorPage userInfo={userInfo} /> : <UserForm onSubmit={handleUserSubmit} redirectTo="/simulator" />
               }
            />
            <Route
              path="/comparateur"
              
               element={
                 userInfo ? <ComparateurPage userInfo={userInfo} /> : <UserForm onSubmit={handleUserSubmit} redirectTo="/comparateur" />
             }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;