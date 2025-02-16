import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Main-page';
import Admin from './Admin'
import UserDetailPage from "./UserDetailPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user/:userEmail" element={<UserDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
