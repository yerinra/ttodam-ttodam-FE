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
import EditProfile from './components/profilePage/EditProfile';
import HistoryPage from './pages/HistoryPage';
import PostEditPage from './pages/PostEditPage';
import SignUpPage from './pages/SignUpPage';
<<<<<<< HEAD
import KeywordPage from './pages/keywordpage';
import ChattingPage from './pages/ChattingPage';
import ChattingList from './pages/ChattingList';
=======
import NotificationPage from './pages/NotificationPage';
import LandingPage from './pages/LandingPage';
import MyPostsPage from './pages/MyPostsPage';
>>>>>>> 19a97e2b6bd6ea569b95c08f43335f292ab56448

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-secondary">
        <main className="flex flex-col items-center max-w-[940px] mx-auto bg-white relative">
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
<<<<<<< HEAD
              <Route path="/sign" element={<SignUpPage />} />
              <Route path="/my/keyword" element={<KeywordPage />} />
=======
              <Route path="/signup" element={<SignUpPage />} />
>>>>>>> 19a97e2b6bd6ea569b95c08f43335f292ab56448
              <Route path="/post/new" element={<PostNewPage />} />
              <Route path="/post/edit/:postId" element={<PostEditPage />} />
              <Route path="/my/edit/profile" element={<EditProfile />} />

              <Route element={<Layout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/posts/:selectedCategory" element={<PostListPage />} />
                <Route path="/post/:postId" element={<PostDetailPage />} />

                <Route path="/my/bookmark" element={<BookMarkPage />} />
                <Route path="/my/profile" element={<ProfilePage />} />
                <Route path="/chat" element={<ChattingList />} />
                <Route path="/chatting" element={<ChattingPage />} />
                <Route path="/my/history" element={<HistoryPage />} />

                <Route path="/my/history/:postId" element={<HistoryDetailPage />} />
                <Route path="/my/posts" element={<MyPostsPage />} />
                <Route path="/notification" element={<NotificationPage />} />

              </Route>
            </Routes>
          </Router>
        </main>
      </div>
    </QueryClientProvider>
  );
}
