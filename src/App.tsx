import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppShell } from './components/layout/AppShell';
import { SignIn } from './pages/auth/SignIn';
import { SignUpStep1 } from './pages/auth/SignUpStep1';
import { SignUpStep2 } from './pages/auth/SignUpStep2';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { AuthCallback } from './pages/auth/AuthCallback';
import { Home } from './pages/home/Home';
import { ChatWindow } from './pages/chat/ChatWindow';
import { Search } from './pages/search/Search';
import { RandomChat } from './pages/search/RandomChat';
import { Status } from './pages/status/Status';
import { Settings } from './pages/settings/Settings';
import { ProfileSettings } from './pages/settings/ProfileSettings';
import { ThemeSettings } from './pages/settings/ThemeSettings';
import { PrivacySettings } from './pages/settings/PrivacySettings';
import { AdminMessagesPage } from './components/chat/AdminChatEntry';
import { BannedPage } from './pages/auth/BannedPage';

import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminStatuses } from './pages/admin/AdminStatuses';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminMessages } from './pages/admin/AdminMessages';
import { AdminComposeMessage } from './pages/admin/AdminComposeMessage';
import { AdminMessageHistory } from './pages/admin/AdminMessageHistory';
import { AdminDirectMessage } from './pages/admin/AdminDirectMessage';
import { Posts } from './pages/posts/Posts';
import { StatusPostSettings } from './pages/settings/StatusPostSettings';
import { NotificationSettings } from './pages/settings/NotificationSettings';
import { AccountSettings } from './pages/settings/AccountSettings';
import { ChatSettings } from './pages/settings/ChatSettings';
import { AdminPosts } from './pages/admin/AdminPosts';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60, retry: 1, refetchOnWindowFocus: false } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUpStep1 />} />
          <Route path="/signup/username" element={<SignUpStep2 />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Admin routes (Obscure path) */}
          <Route path="/1234/admin" element={<AdminLayout />}>
            <Route index element={<AdminLogin />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="statuses" element={<AdminStatuses />} />
            <Route path="posts" element={<AdminPosts />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="compose" element={<AdminComposeMessage />} />
            <Route path="history" element={<AdminMessageHistory />} />
            <Route path="direct" element={<AdminDirectMessage />} />
          </Route>

          {/* Protected routes */}
          <Route element={<AppShell />}>
            <Route path="/home" element={<Home />} />
            <Route path="/chat/:id" element={<ChatWindow />} />
            <Route path="/chat/official" element={<AdminMessagesPage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/random-chat" element={<RandomChat />} />
            <Route path="/status" element={<Status />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/profile" element={<ProfileSettings />} />
            <Route path="/settings/theme" element={<ThemeSettings />} />
            <Route path="/settings/privacy" element={<PrivacySettings />} />
            <Route path="/settings/status-post" element={<StatusPostSettings />} />
            <Route path="/settings/notifications" element={<NotificationSettings />} />
            <Route path="/settings/account" element={<AccountSettings />} />
            <Route path="/settings/chat" element={<ChatSettings />} />
          </Route>

          {/* Banned route */}
          <Route path="/banned" element={<BannedPage />} />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
