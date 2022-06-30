import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, Icon, List, ListItemButton, ListItemIcon, ListItemText, Box, styled } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import MuiDrawer from '@mui/material/Drawer';

import VImage from "../form/VImage";

import routes from "../routes";
import { useAsterController } from "../context";
import VSwitch from "../form/VSwitch";
import { actionMiniSidenav } from "../context/action";
import VText from "../form/VText";
import { useMemo } from "react";

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

  const [controller, dispatch] = useAsterController();
  const { miniSidenav, darkMode } = controller;

  const location = useLocation();
  const navigate = useNavigate();
  const [openRoutes, setOpenRoutes] = useState([]);

  const logoClass = useMemo(() => darkMode ? 'bg-indigo-900' : 'bg-red-100', [darkMode]);
  const activeClassItem = useMemo(() => darkMode ? 'bg-indigo-900' : 'bg-red-100', [darkMode]);
  const activeClassSubItem = useMemo(() => darkMode ? 'bg-indigo-700' : 'bg-red-100', [darkMode]);

  const onClick = (route, subRoute = '') => {
    const isCollapse = routes.find(v => v.route === route)?.children ? true : false;

    if (isCollapse && !subRoute) {
      if (openRoutes.includes(route)) {
        setOpenRoutes(openRoutes.filter(v => v !== route));
      } else {
        setOpenRoutes([...openRoutes, route]);
      }
    } else {
      navigate(`${route}${subRoute}`);
    }
  };

  const onMiniSidenavClick = () => {
    actionMiniSidenav(dispatch, !miniSidenav);
  };

  return <>
    <Box className={`h-full p-4 fixed md:relative z-10 ${miniSidenav ? '' : 'shadow-md md:shadow-none'}`} sx={{ background: darkMode ? '#1A2035' : '#F8F8F8' }}>
      <Box className=" h-full rounded-lg flex flex-col">
        <Drawer variant="permanent" open={!miniSidenav}>
          <List component="nav" aria-labelledby="nested-lsit-subheader">
            <ListItemButton className={`${logoClass} rounded-xl border border-solid border-gray-200 rounded-xl mt-2 py-4`}>
              <ListItemIcon><VImage src="https://edu-file-uploads.s3.amazonaws.com/dev/favicon/logo.png" className="w-8 h-8" /></ListItemIcon>
              <ListItemText><VText>Univo</VText></ListItemText>
              {!miniSidenav && <VSwitch
                checked={!miniSidenav}
                setChecked={onMiniSidenavClick}
                color="info"
                type="square"
                className="mr-0 block md:hidden"
              />}
              <Icon className="hidden md:block">unfold_more</Icon>
            </ListItemButton>
          </List>
          <List component="nav" aria-labelledby="nested-lsit-subheader" className="flex-1 overflow-y-auto overflow-x-hidden mt-2 v-light-scrollbar">
            {
              routes.map(v =>
                <Fragment key={v.route}>
                  <ListItemButton onClick={() => onClick(v.route)} className={`${location.pathname.includes(v.route) ? activeClassItem : ""} rounded-xl mt-2`}>
                    <ListItemIcon><Icon sx={{ color: '#9CA0A0' }}>{v.icon}</Icon></ListItemIcon>
                    <ListItemText><VText>{v.text}</VText></ListItemText>
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
                                className={`pl-5 rounded-xl mt-2 ${location.pathname === v.route + vc.route ? activeClassSubItem : ""}`}
                              >
                                <ListItemIcon className="font-bold ml-0.5"><VText>{vc.text[0]}</VText></ListItemIcon>
                                <ListItemText><VText>{vc.text}</VText></ListItemText>
                              </ListItemButton>
                            )
                          }
                        </List>
                      </Collapse>
                    </>
                  }
                  {v.divider && <div className="h-px w-full my-2 bg-gray-200" />}

                </Fragment>
              )
            }
          </List>

          <List component="nav" aria-labelledby="nested-lsit-subheader">
            <div className="h-px w-full my-2 bg-gray-200" />
            <ListItemButton onClick={() => onClick("/help")} className={`${location.pathname.includes("/help") ? "bg-red-100" : ""} rounded-xl mt-2`}>
              <ListItemIcon><Icon sx={{ color: '#9CA0A0' }}>help_outline</Icon></ListItemIcon>
              <ListItemText primary='Help' />
            </ListItemButton>
            <ListItemButton onClick={() => onClick("/settings")} className={`${location.pathname.includes("/settings") ? "bg-red-100" : ""} rounded-xl mt-2`}>
              <ListItemIcon><Icon sx={{ color: '#9CA0A0' }}>settings</Icon></ListItemIcon>
              <ListItemText primary='Settings' />
            </ListItemButton>
            <Box className="px-2 my-4" sx={{ visibility: miniSidenav ? 'hidden' : 'visible' }}>
              <Box size={24} className="text-gray-500">Powered by</Box>
              <Box className="flex items-center">
                <VImage src="https://edu-file-uploads.s3.amazonaws.com/dev/favicon/logo.png" className="w-8 h-8" />
                <Box size={30} inline className="ml-2 font-bold">Univo</Box>
              </Box>
            </Box>
          </List>

        </Drawer>

      </Box>
    </Box>
  </>;
};

export default SideNavbar;