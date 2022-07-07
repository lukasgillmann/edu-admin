import { Box, Icon, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useAsterController, useWindowSize } from "../context";
import { actionDarkMode, actionMiniSidenav } from "../context/action";
import VAvatar from "../form/VAvatar";
import VButton from "../form/VButton";
import VSwitch from "../form/VSwitch";
import VText from "../form/VText";
import HeaderAdd from "./header.content/HeaderAdd";
import HeaderAlert from "./header.content/HeaderAlert";
import HeaderMenu from "./header.content/HeaderMenu";
import HeaderSearch from "./header.content/HeaderSearch";

const paperProp = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 2.2,
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
};

const Header = () => {

  const [controller, dispatch] = useAsterController();
  const { miniSidenav, darkMode } = controller;
  const windowSize = useWindowSize();

  const [anchorEl, setAnchorEl] = useState(null);
  const [elemName, setElemName] = useState('');

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
  const onDarkModeClick = () => actionDarkMode(dispatch, !darkMode);

  return <>
    <Box className="flex items-center px-8 py-2 border-solid border-0 border-b border-gray-300">
      <VSwitch
        checked={!miniSidenav}
        setChecked={onMiniSidenavClick}
        color="info"
        type="square"
        classes="mr-0"
      />
      <Box className="w-px h-7 bg-gray-300 mx-4" />
      <Box className="hidden sm:block mr-2">
        <VText className="text-2xl font-bold text-limit-1">Welcome, Theresha</VText>
        <VText className="text-sm text-limit-1">Here's what happened with your learning system</VText>
      </Box>
      <Box className="ml-auto flex items-center ">
        <VSwitch
          checked={!darkMode}
          setChecked={onDarkModeClick}
          color="info"
          type="MUI"
        />
        <VButton
          startIcon="add"
          iconButton
          variant="contained"
          color="primary"
          onClick={onClick}
          name="add"
        />
        <VButton
          startIcon="notifications_none"
          iconButton
          variant="outlined"
          color="secondary"
          onClick={onClick}
          className="ml-2"
          name="notification"
        />
        <VButton
          startIcon="search"
          iconButton
          variant="outlined"
          color="secondary"
          onClick={onClick}
          className="ml-2"
          name="search"
        />
        <Box className="w-px h-7 bg-gray-300 ml-4 mr-2" />

        <VButton variant="text" className="flex items-center" onClick={onClick} name="menu">
          <VAvatar size='sm' bgColor="light" />
          <Box className="ml-2 hidden lg:block">
            <VText className="text-lg font-bold leading-5 text-limit-1">Theresha</VText>
            <VText className="text-sm text-gray-400 leading-4 text-limit-1">Super Admin</VText>
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
          {
            // menuItems.map(v =>
            //   <MenuItem key={v} onClick={handleClose}>{v}</MenuItem>
            // )
          }
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