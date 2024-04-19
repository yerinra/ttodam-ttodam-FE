import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PostListPage from './pages/PostListPage';
import PostNewPage from './pages/PostNewPage';
import PostDetailPage from './pages/PostDetailPage';

import MyPage from './pages/MyPage';
import BookMarkPage from './pages/BookMarkPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProfilePage from './pages/MyProfilePage';
import EditProfile from './components/profilePage/EditProfile';
import HistoryPage from './pages/HistoryPage';
import HistoryDetailPage from './components/historyPage/HistoryDetailPage';
import RequestPage from './pages/RequestPage';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-secondary">
        <main className="flex flex-col items-center max-w-[940px] mx-auto bg-white relative">
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/post/new" element={<PostNewPage />} />
              <Route path="/my/edit/profile" element={<EditProfile />} />

              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/posts/:selectedCategory" element={<PostListPage />} />
                <Route path="/post/:postId" element={<PostDetailPage />} />

                <Route path="/my/bookmark" element={<BookMarkPage />} />
                <Route path="/my/profile" element={<ProfilePage />} />
                <Route path="/my/history" element={<HistoryPage />} />
                <Route path="/my/history/:postId" element={<HistoryDetailPage />} />
                <Route path="/my/request" element={<RequestPage />} />
              </Route>
            </Routes>
          </Router>
        </main>
      </div>
    </QueryClientProvider>
  );
}
