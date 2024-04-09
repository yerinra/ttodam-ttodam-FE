import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CategoryPage from './pages/CategoryPage';
import PostListPage from './pages/PostListPage';
import PostNewPage from './pages/PostNewPage';
import PostDetailPage from './pages/PostDetailPage';

export default function App() {
  return (
    <div className="bg-secondary">
      <main className="flex flex-col items-center max-w-[940px] mx-auto bg-white relative">
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/post/:categoryName" element={<PostListPage />} />
              <Route path="/post/new" element={<PostNewPage />} />
              <Route path="/post/:postId" element={<PostDetailPage />} />
            </Route>
          </Routes>
        </Router>
      </main>
    </div>
  );
}
