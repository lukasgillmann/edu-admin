import { useAsterController } from './context';
import { Navigate, Route, Routes } from 'react-router-dom';
import Page404 from './pages/Page404';
import Dashboard from "./pages/dashboard";
import SideNavbar from './layouts/SideNavbar';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import theme from './assets/theme';
import themeDark from './assets/theme-dark';
import MainLayout from './layouts/MainLayout';
import Chat from './pages/chat';
import User from './pages/user';
import Group from './pages/group';
import Tutor from './pages/tutor';
import Coach from './pages/coach';
import Course from './pages/course';
import Category from './pages/category';
import Virtual from './pages/virtual';
import Comment from './pages/comment';
import Review from './pages/review';
import EmailNotify from './pages/email_notify';
import SmsNotify from './pages/sms_notify';
import Tracking from './pages/tracking';
import Certificate from './pages/certificate';
import License from './pages/license';
import PublicSite from './pages/public_site';
import Help from './pages/help';
import Settings from './pages/settings';


const App = () => {

  const [controller] = useAsterController();
  const { darkMode } = controller;

  return <>
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <Box className="flex h-full">
        <SideNavbar />
        <Box className='ml-0.5 md:ml-0' />
        <Box className="flex-1 my-4 mr-4 ml-24 md:ml-0.5">
          <MainLayout>
            <Routes>
              <Route path='*' element={<Page404 />} />
              <Route path="/" exact element={<Navigate to="/dashboard" replace />} />
              <Route path="page404" element={<Page404 />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="inbox" element={<Chat />} />
              <Route path="user">
                <Route index element={<Navigate to="/user/user" replace />} />
                <Route path="user" element={<User />} />
                <Route path="group" element={<Group />} />
                <Route path="tutor" element={<Tutor />} />
                <Route path="coach" element={<Coach />} />
              </Route>
              <Route path="catalog">
                <Route index element={<Navigate to="/catalog/course" replace />} />
                <Route path="course" element={<Course />} />
                <Route path="category" element={<Category />} />
                <Route path="virtual" element={<Virtual />} />
                <Route path="comment" element={<Comment />} />
                <Route path="review" element={<Review />} />
              </Route>
              <Route path="notifications">
                <Route index element={<Navigate to="/notifications/email" replace />} />
                <Route path="email" element={<EmailNotify />} />
                <Route path="sms" element={<SmsNotify />} />
              </Route>
              <Route path="tracking" element={<Tracking />} />
              <Route path="certificate" element={<Certificate />} />
              <Route path="licenses" element={<License />} />
              <Route path="public_site" element={<PublicSite />} />
              <Route path="help" element={<Help />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </MainLayout>
        </Box>
      </Box>
    </ThemeProvider>
  </>;
};

export default App;

