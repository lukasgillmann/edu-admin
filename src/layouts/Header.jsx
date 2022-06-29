import { Box, Icon, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useAsterController, useWindowSize } from "../context";
import { actionMiniSidenav } from "../context/action";
import VAvatar from "../form/VAvatar";
import VButton from "../form/VButton";
import VSwitch from "../form/VSwitch";

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
  const { miniSidenav } = controller;
  const windowSize = useWindowSize();

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (windowSize.width < 992 && !miniSidenav) {
      actionMiniSidenav(dispatch, true);
    }
  }, [windowSize.width]);

  const onMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuItems(['Profile', 'My account', 'Logout']);
  };

  const onAlertClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuItems(['Alert 1', 'Alert 2', 'Alert 3']);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClick = () => {

  };

  const onMiniSidenavClick = () => {
    actionMiniSidenav(dispatch, !miniSidenav);
  };

  return <>
    <Box className="flex items-center px-6 py-2 border-solid border-0 border-b border-gray-300">
      <VSwitch
        checked={!miniSidenav}
        setChecked={onMiniSidenavClick}
        color="info"
        type="square"
        classes="mr-0"
      />
      <Box className="w-px h-7 bg-gray-300 mx-4" />
      <Box className="hidden sm:block mr-2">
        <Box className="text-2xl font-bold text-limit-1">Welcome, Theresha</Box>
        <Box className="text-sm text-gray-400 text-limit-1">Here's what happened with your learning system</Box>
      </Box>
      <Box className="ml-auto flex items-center ">
        <VButton
          startIcon="add"
          iconButton
          variant="contained"
          color="secondary"
          onClick={onClick}
        />
        <VButton
          startIcon="notifications_none"
          iconButton
          variant="outlined"
          color="secondary"
          onClick={onAlertClick}
          classes="ml-2"
          name="notification"
        />
        <VButton
          startIcon="search"
          iconButton
          variant="outlined"
          color="secondary"
          onClick={onClick}
          classes="ml-2"
        />
        <Box className="w-px h-7 bg-gray-300 mx-4" />

        <Box className="flex items-center cursor-pointer" onClick={onMenuClick}>
          <VAvatar size='sm' shadow='sm' />
          <Box className="ml-2 hidden lg:block">
            <Box className="text-lg font-bold leading-5 text-limit-1">Theresha</Box>
            <Box className="text-sm text-gray-400 leading-4 text-limit-1">Super Admin</Box>
          </Box>
          <Icon className="text-gray-400 ml-2">expand_more</Icon>
        </Box>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{ 'aria-labelledby': 'basic-button' }}
          PaperProps={paperProp}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {
            menuItems.map(v =>
              <MenuItem key={v} onClick={handleClose}>{v}</MenuItem>
            )
          }
        </Menu>

      </Box>
    </Box>
  </>;
};

export default Header;