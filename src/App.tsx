import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PostListPage from './pages/PostListPage';
import PostNewPage from './pages/PostNewPage';
import PostDetailPage from './pages/PostDetailPage';

import MyPage from './pages/MyPage';
import BookMarkPage from './pages/BookMarkPage';

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
              <Route path="/my" element={<MyPage />} />
              <Route path="/my/bookmark" element={<BookMarkPage />} />
            </Route>
          </Routes>
        </Router>
      </main>
    </div>
  );
}
