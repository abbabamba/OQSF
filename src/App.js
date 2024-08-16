import React, { useState } from 'react';
import './App.css';
import SimulatorPage from './pages/Simulator';
import ComparateurPage from './pages/Comparator';
import HomePage from './pages/HomePage';
import Header from './components/Header';
// import UserForm from './components/UserForm';
import { BrowserRouter as Router, Route, Routes /*, Navigate */ } from 'react-router-dom';

function App() {
  // const [userInfo, setUserInfo] = useState(null);

  // const handleUserSubmit = (info) => {
  //   setUserInfo(info);
  // };

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="App-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/simulateur"
              element={<SimulatorPage />}
              // element={
              //   userInfo ? <SimulatorPage userInfo={userInfo} /> : <UserForm onSubmit={handleUserSubmit} redirectTo="/simulator" />
              // }
            />
            <Route
              path="/comparateur"
              element={<ComparateurPage />}
              // element={
              //   userInfo ? <ComparateurPage userInfo={userInfo} /> : <UserForm onSubmit={handleUserSubmit} redirectTo="/comparateur" />
              // }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;