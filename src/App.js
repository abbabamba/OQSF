import React, { useState } from 'react';
import './App.css';
import SimulatorPage from '././components/BankLoanSimulator/BankLoanSimulator';
import ComparateurPage from '././components/BankComparator/BankComparator';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import UserForm from './components/UserForm';
import { BrowserRouter as Router, Route, Routes, Navigate   } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken');
  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

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
                userInfo ? <SimulatorPage userInfo={userInfo} /> : <UserForm onSubmit={handleUserSubmit} redirectTo="/simulateur" />
               }
            />
            <Route
              path="/comparateur"
              
               element={
                 userInfo ? <ComparateurPage userInfo={userInfo} /> : <UserForm onSubmit={handleUserSubmit} redirectTo="/comparateur" />
             }
            />
            <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          </Routes>
          
        </main>
      </div>
    </Router>
  );
}

export default App;