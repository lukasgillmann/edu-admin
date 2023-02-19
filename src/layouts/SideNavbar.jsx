import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, styled, Divider } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import MuiDrawer from '@mui/material/Drawer';
import { useTranslation } from 'react-i18next';

import VImage from "../form/VImage";
import routes from "../routes";
import { useAsterController, useWindowSize } from "../context";
import { actionMiniSidenav, actionMobile } from "../context/action";
import VText from "../form/VText";
import { useEffect } from "react";
import { BPopOver } from "../components";
import { VButton } from "../form";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: 'transparent',
  left: 16,
  minWidth: 65,
  border: 'none',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: 'transparent',
  left: 16,
  minWidth: 65,
  border: 'none',
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const SideNavbar = () => {

  const { t } = useTranslation('common');

  const [controller, dispatch] = useAsterController();
  const { miniSidenav, mobile } = controller;

  const location = useLocation();
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const [openRoutes, setOpenRoutes] = useState([]);
  const [setting, setSetting] = useState(false);

  useEffect(() => {
    const splits = location.pathname.split('/');
    if (splits.length > 2 && splits[2]) {
      setOpenRoutes(routes => [...new Set([...routes, splits[1]])]);
    }
  }, [location.pathname]);

  useEffect(() => {
    actionMobile(dispatch, windowSize.width < 992 ? true : false);
  }, [windowSize.width, dispatch]);

  const onClick = (route, subRoute = '') => {
    const isCollapse = routes.find(v => v.route === route)?.children ? true : false;

    if (isCollapse && !subRoute) {
      if (openRoutes.includes(route)) {
        setOpenRoutes(openRoutes.filter(v => v !== route));
      } else {
        setOpenRoutes([...openRoutes, route]);
      }
    } else {
      navigate(`/${route}/${subRoute}`);
    }
  };

  const renderChildren = () => <>
    <List component="nav" aria-labelledby="nested-lsit-subheader">
      <BPopOver trigger={
        <ListItemButton className={`bg-white dark:bg-gray-700 rounded-lg shadow mt-2 py-4`} id="v-tour-sidebar">
          {
            miniSidenav ?
              <ListItemIcon>
                <VImage src={`${process.env.REACT_APP_S3_ENDPOINT}/${process.env.REACT_APP_SITE_NAME}/favicon/logo.png?${miniSidenav}`} id="sidebar-favicon" className="h-10 -ml-0.5" />
              </ListItemIcon>
              :
              <ListItemIcon className="flex flex-1 justify-center">
                <VImage src={`${process.env.REACT_APP_S3_ENDPOINT}/${process.env.REACT_APP_SITE_NAME}/logo/logo.png?${miniSidenav}`} id="sidebar-logo" className="h-10" />
              </ListItemIcon>
          }
          <Icon className="text-xl ml-auto" icon="fluent:chevron-up-down-16-filled" />
        </ListItemButton>
      }>
        <div className="flex w-60 p-4 v-tour-sidebar">
          <a href={process.env.REACT_APP_APP_ENDPOINT} className="no-underline w-full" rel="noreferrer">
            <VButton variant="outlined" color="primary" className="px-4 py-1 w-full" onClick={() => localStorage.removeItem('jwt-ghost')}>
              <Icon icon="mdi:application-variable-outline" className="flex-shrink-0" />&nbsp;{t('App')}
            </VButton>
          </a>
          <a href={process.env.REACT_APP_STUDIO_ENDPOINT} className="no-underline ml-4 w-full" rel="noreferrer">
            <VButton variant="outlined" color="primary" className="px-4 py-1 w-full">
              <Icon icon="humbleicons:dashboard" className="flex-shrink-0" />&nbsp;{t('Studio')}
            </VButton>
          </a>
        </div>
      </BPopOver>
    </List>
    <List aria-labelledby="nested-lsit-subheader" className="flex-1 mt-2 overflow-y-auto overflow-x-hidden relative v-trans-scrollbar">
      <div className="relative h-full">
        {
          routes.map(v =>
            <div key={v.route} className={`v-tour-${v.route}`}>
              <ListItemButton onClick={() => onClick(v.route)} className={`${location.pathname.includes(v.route) ? 'v-bg-side-active' : ""} rounded-lg mt-2 pl-5`}>
                <ListItemIcon className="text-2xl color-secondary">{v.icon}</ListItemIcon>
                <ListItemText><VText>{t(v.text)}</VText></ListItemText>
                {v.children && <> {openRoutes.includes(v.route) ? <ExpandLess className="text-gray-400" /> : <ExpandMore className="text-gray-400" />}</>}
              </ListItemButton>

              {
                v.children && <>
                  <Collapse in={openRoutes.includes(v.route)} timeout="auto">
                    <List component="div" disablePadding>
                      {
                        v.children.map(vc =>
                          <ListItemButton
                            onClick={() => onClick(v.route, vc.route)}
                            key={`${v.route}-${vc.route}`}
                            className={`pl-6 rounded-lg mt-2 ${location.pathname.includes(`/${v.route}/${vc.route}`) ? 'v-bg-side-active' : ""}`}
                          >
                            <ListItemIcon className="font-bold ml-0.5 color-secondary v-side-symbol"><VText>{t(vc.text)[0]}</VText></ListItemIcon>
                            <ListItemText><VText>{t(vc.text)}</VText></ListItemText>
                          </ListItemButton>
                        )
                      }
                    </List>
                  </Collapse>
                </>
              }
              {v.divider && <Divider className="bg-gray-200 dark:bg-gray-500 mt-2" />}

            </div>
          )
        }
      </div>

    </List>

    <List component="nav" aria-labelledby="nested-lsit-subheader">
      <Divider className="bg-gray-200 dark:bg-gray-500" />
      <ListItemButton onClick={() => onClick("help")} className={`${location.pathname.includes("/help") ? "v-bg-side-active" : ""} rounded-lg mt-2 pl-5`}>
        <ListItemIcon className="text-2xl color-secondary"><Icon icon="iconoir:chat-bubble-question" /></ListItemIcon>
        <ListItemText><VText>{t('Help')}</VText></ListItemText>
      </ListItemButton>

      <div className="v-tour-settings">
        <ListItemButton onClick={() => setSetting(!setting)} className={`${location.pathname.includes("/settings") ? "v-bg-side-active" : ""} rounded-lg mt-2 pl-5`}>
          <ListItemIcon className="text-2xl color-secondary"><Icon icon="icon-park-outline:setting-two" /></ListItemIcon>
          <ListItemText><VText>{t('Settings')}</VText></ListItemText>
          {setting ? <ExpandLess className="text-gray-400" /> : <ExpandMore className="text-gray-400" />}
        </ListItemButton>

        <Collapse in={setting} timeout="auto">
          <List component="div" disablePadding>
            <ListItemButton onClick={() => navigate(`/settings/general`)} className={`pl-6 rounded-lg mt-2 ${location.pathname.includes(`/settings/general`) ? 'v-bg-side-active' : ""}`} >
              <ListItemIcon className="font-bold ml-0.5 color-secondary v-side-symbol"><VText>{t('General')[0]}</VText></ListItemIcon>
              <ListItemText><VText>{t('General')}</VText></ListItemText>
            </ListItemButton>
            <ListItemButton onClick={() => navigate(`/settings/theme`)} className={`pl-6 rounded-lg mt-2 ${location.pathname.includes(`/settings/theme`) ? 'v-bg-side-active' : ""}`} >
              <ListItemIcon className="font-bold ml-0.5 color-secondary v-side-symbol"><VText>{t('Theming')[0]}</VText></ListItemIcon>
              <ListItemText><VText>{t('Theming')}</VText></ListItemText>
            </ListItemButton>
            <ListItemButton onClick={() => navigate(`/settings/terms`)} className={`pl-6 rounded-lg mt-2 ${location.pathname.includes(`/settings/terms`) ? 'v-bg-side-active' : ""}`} >
              <ListItemIcon className="font-bold ml-0.5 color-secondary v-side-symbol"><VText>{t('Terms')[0]}</VText></ListItemIcon>
              <ListItemText><VText>{t('Terms')}</VText></ListItemText>
            </ListItemButton>
          </List>
        </Collapse>
      </div>

      <Divider className="bg-gray-200 dark:bg-gray-500" />
      {
        !miniSidenav && <div className="px-2 my-4 flex items-center">
          <VText className="text-gray-500 text-base">{t('Powered by')}</VText>
          <VImage src={`${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-assets/univo.png`} className="h-6 ml-2" />
        </div>
      }

    </List>
  </>;

  return <>
    {
      mobile ?
        <MuiDrawer
          anchor="left"
          open={!miniSidenav}
          onClose={() => actionMiniSidenav(dispatch, true)}
        >
          <div className="m-4" style={{ width: drawerWidth }}>
            {renderChildren()}
          </div>
        </MuiDrawer>
        :
        <div
          className={`h-full p-4 md:relative z-10 ${miniSidenav ? '' : 'shadow-md md:shadow-none'} v-sidenav`}
        >
          <div className=" h-full rounded-lg flex flex-col">
            <Drawer
              anchor="left"
              variant="permanent"
              open={!miniSidenav}
            >
              {renderChildren()}
            </Drawer>
          </div>
        </div>
    }
  </>;
};

export default SideNavbar;;