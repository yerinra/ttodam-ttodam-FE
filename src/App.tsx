import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PostListPage from './pages/PostListPage';
import PostNewPage from './pages/PostNewPage';
import PostDetailPage from './pages/PostDetailPage';
import SearchResultPage from './pages/SearchResultPage';

export default function App() {
  return (
    <div className="bg-secondary">
      <main className="flex flex-col items-center max-w-[940px] mx-auto bg-white relative">
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/post/new" element={<PostNewPage />} />
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/posts/:selectedCategory" element={<PostListPage />} />
              <Route path="/post/:postId" element={<PostDetailPage />} />
              <Route path="/search" element={<SearchResultPage />} />
            </Route>
          </Routes>
        </Router>
      </main>
    </div>
  );
}
