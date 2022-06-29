import { AsterControllerProvider } from './context';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Page404 from './pages/Page404';
import Dashboard from "./pages/dashboard";
import SideNavbar from './layouts/SideNavbar';
import { Box, ThemeProvider } from '@mui/material';
import theme from './assets/theme';
import themeDark from './assets/theme-dark';
import MainLayout from './layouts/MainLayout';

const darkMode = false;

const App = () => {

  return <>
    <BrowserRouter>
      <AsterControllerProvider>
        <ThemeProvider theme={darkMode ? themeDark : theme}>
          <div className="flex h-full">
            <SideNavbar />
            <Box className='ml-0.5 md:ml-0' />
            <div className="flex-1 my-4 mr-4 ml-24 md:ml-0.5">
              <MainLayout>
                <Routes>
                  <Route path='*' element={<Page404 />} />
                  <Route path="/" exact element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/page404" element={<Page404 />} />
                  {/* <Route path="sample">
                    <Route index element={<Sample />} />
                    <Route path="other" element={<SampleOther />} />
                    <Route path=":sampleId" element={<Sample />} />
                  </Route> */}
                </Routes>
              </MainLayout>

            </div>
          </div>
        </ThemeProvider>
      </AsterControllerProvider>
    </BrowserRouter>
  </>;
};

export default App;
