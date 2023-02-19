import { useState, useEffect } from 'react';
import { useAsterController } from './context';
import { Navigate, Route, Routes } from 'react-router-dom';
import Page404 from './pages/Page404';
import Dashboard from "./pages/dashboard";
import SideNavbar from './layouts/SideNavbar';
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from './layouts/MainLayout';
import Chat from './pages/chat';
import User from './pages/user';
import Group from './pages/group';
import Tutor from './pages/tutor';
import Coach from './pages/coach';
import Category from './pages/category';
import Virtual from './pages/virtual';
import EmailNotify from './pages/email_notify';
import Tracking from './pages/tracking';
import Certificate from './pages/certificate';
import License from './pages/license';
import PublicSite from './pages/public_site';
import Help from './pages/help';
import UserDetail from './pages/user/user.detail';
import UserEdit from './pages/user/user.edit';
import GroupDetail from './pages/group/group.detail';
import UserRegister from './pages/user/user.register';
import UserBulkRegister from './pages/user/user.register.bulk';
import TrackDetail from './pages/tracking/track.detail';
import CoachEdit from './pages/coach/coach.edit';
import TutorEdit from './pages/tutor/tutor.edit';
import TutorAdd from './pages/tutor/tutor.add';
import CoachAdd from './pages/coach/coach.add';
import EmailEdit from './pages/email_notify/email.edit';
import LicenseAdd from './pages/license/license.add';
import General from './pages/general';
import Theme from './pages/theme';
import Terms from './pages/terms';
import ApiDevelopment from './pages/api';
import Payment from './pages/payment';
import External from './pages/external';
import CategoryAdd from './pages/category/category.add';
import VirtualAdd from './pages/virtual/virtual.add';
import VirtualEdit from './pages/virtual/virtual.edit';
import CourseEdit from './pages/course/course.edit';
import CategoryDetail from './pages/category/category.detail';
import CourseIndex from './pages/course';
import PhysicalSession from './pages/physical_session';
import PhysicalAdd from './pages/physical_session/physical.add';
import PhysicalEdit from './pages/physical_session/physical.edit';
import PhysicalDetail from './pages/physical_session/physical.detail';
import darkTheme from './assets/theme-dark';
import lightTheme from './assets/theme';

const App = () => {

  const [controller] = useAsterController();
  const { darkMode, miniSidenav, themes } = controller;

  const [contentWidth, setContentWidth] = useState(500);

  useEffect(() => {
    const sidenavWidth = miniSidenav ? 156 : 272;
    const totalWidth = document.body.offsetWidth;
    setContentWidth(totalWidth - sidenavWidth - 18);
  }, [miniSidenav]);

  return <>
    <ThemeProvider theme={darkMode ? darkTheme(themes) : lightTheme(themes)}>
      <ToastContainer
        position='bottom-right'
        autoClose={7000}
        hideProgressBar
        newestOnTop={false}
        pauseOnHover
        closeOnClick
        theme={darkMode ? "dark" : "light"}
        style={{ width: '350px' }}
      />
      <div className="flex h-full">
        <SideNavbar />
        <div className='md:ml-0' />
        <div className="flex-1 m-0 md:my-4 md:mx-4" style={{ width: `${contentWidth}px` }}>
          <MainLayout>
            <Routes>
              <Route path='*' element={<Page404 />} />
              <Route path="/" exact element={<Navigate to="/dashboard" replace />} />
              <Route path="page404" element={<Page404 />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="inbox" element={<Chat />} />
              <Route path="user">
                <Route index element={<Navigate to="/user/learners" replace />} />
                <Route path="learners">
                  <Route index element={<User />} />
                  <Route path="new" element={<Navigate to="/user/learners/register" replace />} />
                  <Route path="register" element={<UserRegister />} />
                  <Route path="bulk-register" element={<UserBulkRegister />} />
                  <Route path="detail/:page/:pageSize/:userId" element={<UserDetail />} />
                  <Route path="edit/:page/:pageSize/:userId" element={<UserEdit />} />
                </Route>
                <Route path="groups">
                  <Route index element={<Group />} />
                  <Route path="detail/:page/:pageSize/:groupId" element={<GroupDetail />} />
                </Route>
                <Route path="tutors">
                  <Route index element={<Tutor />} />
                  <Route path="add" element={<TutorAdd />} />
                  <Route path="edit/:page/:pageSize/:tutorId" element={<TutorEdit />} />
                </Route>
                <Route path="coaches">
                  <Route index element={<Coach />} />
                  <Route path="add" element={<CoachAdd />} />
                  <Route path="edit/:page/:pageSize/:coachId" element={<CoachEdit />} />
                </Route>
              </Route>
              <Route path="catalog">
                <Route index element={<Navigate to="/catalog/course" replace />} />
                <Route path="course">
                  <Route index element={<CourseIndex />} />
                  <Route path="edit/:page/:pageSize/:courseId" element={<CourseEdit />} />
                </Route>
                <Route path="category" element={<Category />} />
                <Route path="category">
                  <Route index element={<Category />} />
                  <Route path="add" element={<CategoryAdd />} />
                  <Route path="detail/:page/:pageSize/:categoryId" element={<CategoryDetail />} />
                </Route>
                <Route path="virtual">
                  <Route index element={<Virtual />} />
                  <Route path="add" element={<VirtualAdd />} />
                  <Route path="edit/:page/:pageSize/:virtualId" element={<VirtualEdit />} />
                </Route>
                <Route path="physical-session">
                  <Route index element={<PhysicalSession />} />
                  <Route path="add" element={<PhysicalAdd />} />
                  <Route path="detail/:page/:pageSize/:sessionId" element={<PhysicalDetail />} />
                  <Route path="edit/:page/:pageSize/:sessionId" element={<PhysicalEdit />} />
                </Route>
              </Route>
              <Route path="email">
                <Route index element={<EmailNotify />} />
                <Route path="edit/:endUser/:emailId" element={<EmailEdit />} />
              </Route>
              <Route path="tracking">
                <Route index element={<Tracking />} />
                <Route path="detail/:page/:pageSize/:userId" element={<TrackDetail />} />
              </Route>
              <Route path="certificate" element={<Certificate />} />
              <Route path="licenses">
                <Route index element={<License />} />
                <Route path="add" element={<LicenseAdd />} />
              </Route>
              <Route path="public_site" element={<PublicSite />} />
              <Route path="help" element={<Help />} />
              <Route path="settings">
                <Route index element={<Navigate to="/settings/general" replace />} />
                <Route path="general" element={<General />} />
                <Route path="theme" element={<Theme />} />
                <Route path="terms" element={<Terms />} />
                <Route path="api" element={<ApiDevelopment />} />
                <Route path="payment" element={<Payment />} />
                <Route path="external" element={<External />} />
              </Route>

            </Routes>
          </MainLayout>
        </div>
      </div>
    </ThemeProvider>
  </>;
};

export default App;

