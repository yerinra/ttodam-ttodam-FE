import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PostListPage from './pages/PostListPage';
import PostNewPage from './pages/PostNewPage';
import PostDetailPage from './pages/PostDetailPage';

import BookMarkPage from './pages/BookMarkPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProfilePage from './pages/MyProfilePage';
import EditProfilePage from './components/profilePage/EditProfilePage';
import HistoryPage from './pages/HistoryPage';
import PostEditPage from './pages/PostEditPage';
import SignUpPage from './pages/SignUpPage';
import NotificationPage from './pages/NotificationPage';
import LandingPage from './pages/LandingPage';
import MyPostsPage from './pages/MyPostsPage';
import ChattingList from './pages/ChattingList';
import ChattingPage from './pages/ChattingPage';
import LoginLoadingPage from './pages/LoginLoadingPage';
import KeywordPage from './pages/keywordpage';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-secondary font-PretendardRegular">
        <main className="flex flex-col items-center max-w-[940px] mx-auto bg-white relative">
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/post/new" element={<PostNewPage />} />
              <Route path="/post/edit/:postId" element={<PostEditPage />} />
              <Route path="/my/edit/profile" element={<EditProfilePage />} />

              <Route path="/chatting/:chatroomId" element={<ChattingPage />} />
              <Route element={<Layout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/posts/:selectedCategory" element={<PostListPage />} />
                <Route path="/post/:postId" element={<PostDetailPage />} />
                <Route path="/chat" element={<ChattingList />} />
                <Route path="/my/bookmark" element={<BookMarkPage />} />
                <Route path="/my/profile" element={<ProfilePage />} />
                <Route path="/my/history" element={<HistoryPage />} />
                <Route path="/my/keyword" element={<KeywordPage />} />
                <Route path="/my/posts" element={<MyPostsPage />} />
                <Route path="/notification" element={<NotificationPage />} />

                <Route path="/login/oauth2/code/:domain" element={<LoginLoadingPage />} />
              </Route>
            </Routes>
          </Router>
        </main>
      </div>
    </QueryClientProvider>
  );
}
