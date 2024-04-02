import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <div className="bg-light-gray">
      <main className="flex flex-col items-center max-w-[940px] mx-auto bg-white relative">
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
            </Route>
          </Routes>
        </Router>
      </main>
    </div>
  );
}
