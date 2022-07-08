import { Box, Icon, Menu, MenuItem } from "@mui/material";
import { useMemo } from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAsterController, useWindowSize } from "../context";
import { actionDarkMode, actionMiniSidenav } from "../context/action";
import VAvatar from "../form/VAvatar";
import VButton from "../form/VButton";
import VSwitch from "../form/VSwitch";
import VText from "../form/VText";
import routes from "../routes";
import HeaderAdd from "./header.content/HeaderAdd";
import HeaderAlert from "./header.content/HeaderAlert";
import HeaderMenu from "./header.content/HeaderMenu";
import HeaderSearch from "./header.content/HeaderSearch";



const Header = () => {

  const [controller, dispatch] = useAsterController();
  const { miniSidenav, darkMode } = controller;
  const windowSize = useWindowSize();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [elemName, setElemName] = useState('');

  const paperProp = useMemo(() => ({
    elevation: 0,
    sx: {
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      backgroundColor: darkMode ? '#323232' : '#FFFFFF',
      mt: 2.2,
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: darkMode ? '#323232' : '#FFFFFF',
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
      },
    },
  }), [darkMode]);

  useEffect(() => {
    if (windowSize.width < 992 && !miniSidenav) {
      actionMiniSidenav(dispatch, true);
    }
  }, [windowSize.width, dispatch, miniSidenav]);

  const onClick = (e) => {
    setAnchorEl(e.currentTarget);
    setElemName(e.currentTarget.name);
  };

  const handleClose = () => setAnchorEl(null);
  const onMiniSidenavClick = () => actionMiniSidenav(dispatch, !miniSidenav);
  const onDarkModeClick = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    actionDarkMode(dispatch, !darkMode);
  };

  const headerTextDom = useMemo(() => {

    const splits = location.pathname.split('/').filter(v => v);
    if (!splits.length) return <></>;
    if (splits[0] === 'dashboard') return <>
      <VText color="secondary" className="text-2xl font-bold text-limit-1 leading-6">Welcome, Theresha</VText>
      <VText color="primary" className="text-sm text-limit-1">Here's what happened with your learning system</VText>
    </>;

    let item = routes;
    let text = '';
    for (let splitItem of splits) {
      item = item.find(v => v.route === splitItem) || {};
      text = item.text;
      item = item.children || [];
    }
    return <VText color="secondary" className="text-2xl font-bold text-limit-1 leading-6">{text}</VText>;
  }, [location.pathname]);

  return <>
    <Box className="flex items-center px-8 py-2 border-solid border-0 border-b border-gray-300" id="v-header">
      <VSwitch
        checked={!miniSidenav}
        setChecked={onMiniSidenavClick}
        color="info"
        type="square"
        classes="mr-0"
      />
      <Box className="w-px h-7 bg-gray-300 mx-4" />
      <Box className="hidden sm:block mr-2">
        {headerTextDom}
      </Box>
      <Box className="ml-auto flex items-center ">
        <VSwitch
          checked={!darkMode}
          setChecked={onDarkModeClick}
          color="info"
          type="MUI"
        />
        <VButton
          iconButton
          variant="contained"
          color="primary"
          onClick={onClick}
          name="add"
        >
          <Icon>add</Icon>
        </VButton>
        <VButton
          iconButton
          variant="outlined"
          color="primary"
          onClick={onClick}
          className="ml-2"
          name="notification"
        >
          <Icon>notifications_none</Icon>
        </VButton>
        <VButton
          iconButton
          variant="outlined"
          color="primary"
          onClick={onClick}
          className="ml-2"
          name="search"
        >
          <Icon>search</Icon>
        </VButton>
        <Box className="w-px h-7 bg-gray-300 ml-4 mr-2" />

        <VButton variant="text" className="flex items-center" onClick={onClick} name="menu">
          <VAvatar size='sm' bgColor="light" />
          <Box className="ml-2 hidden lg:block">
            <VText color="secondary" className="text-base font-bold leading-5 text-limit-1">Theresha</VText>
            <VText color="primary" className="text-xs text-gray-400 leading-4 text-limit-1 text-left">Super Admin</VText>
          </Box>
          <Icon className="text-gray-400 ml-2">expand_more</Icon>
        </VButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{ 'aria-labelledby': 'basic-button' }}
          PaperProps={paperProp}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {elemName === 'add' && <HeaderAdd />}
          {elemName === 'notification' && <HeaderAlert />}
          {elemName === 'search' && <HeaderSearch />}
          {elemName === 'menu' && <HeaderMenu />}
        </Menu>

      </Box>
    </Box>
  </>;
};

export default Header;