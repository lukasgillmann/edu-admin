import { Menu } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { Icon } from '@iconify/react';
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAsterController, useWindowSize } from "../context";
import { actionDarkMode, actionMiniSidenav } from "../context/action";
import { VAvatar, VButton, VImage, VSwitch, VText } from "../form";
import routes from "../routes";
import HeaderAdd from "./header.content/header.add";
import HeaderAlert from "./header.content/header.alert";
import HeaderMenu from "./header.content/header.menu";
import HeaderSearch from "./header.content/header.search";
import HeaderLanguage from "./header.content/header.language";
import HeaderDark from "./header.content/header.dark";
import HeaderTour from "./header.content/header.tour";

const Header = () => {

  const { i18n, t } = useTranslation('common');

  const [controller, dispatch] = useAsterController();
  const { miniSidenav, user } = controller;
  const windowSize = useWindowSize();
  const location = useLocation();

  const userName = useMemo(() => user.first_name || user.last_name ? `${user.first_name} ${user.last_name}`.trim() || user.username || '-' : '-', [user]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [elemName, setElemName] = useState('');

  useEffect(() => {
    const lang = localStorage.getItem('language');
    i18n.changeLanguage(lang);

    const mode = localStorage.getItem('dark') === 'true';
    if (mode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    actionDarkMode(dispatch, mode);
  }, [i18n, dispatch]);

  useEffect(() => {
    if (windowSize.width < 992) {
      actionMiniSidenav(dispatch, true);
    }
  }, [windowSize.width, dispatch]);

  const onClick = (e) => {
    setAnchorEl(e.currentTarget);
    setElemName(e.currentTarget.name);
  };

  const handleClose = () => setAnchorEl(null);
  const onMiniSidenavClick = () => actionMiniSidenav(dispatch, !miniSidenav);

  const headerTextDom = useMemo(() => {

    const splits = location.pathname.split('/').filter(v => v && isNaN(v));

    if (!splits.length) return <></>;
    if (splits[0] === 'dashboard') return <>
      <VText className="text-2xl font-bold text-limit-1 leading-6">
        {t('Welcome')}, {userName}&nbsp;<Icon icon="noto:waving-hand" />
      </VText>
      <VText color="secondary" className="text-sm text-limit-1">{t("Here's what happened with your learning system")}</VText>
    </>;

    let item = routes;
    let text = '';
    for (let splitItem of splits) {
      item = item.find(v => v.route === splitItem) || {};
      text = item.text ? item.text : text;
      item = item.children || [];
    }

    let breadcrumbs = null;
    if (splits.length > 1) {
      breadcrumbs = splits.map((v, idx) => {
        if (idx === 0) {
          return <VText color="primary" className="text-sm text-limit-1 capitalize" key={v}>{t(v)} /&nbsp;</VText>;
        }
        else if (idx === splits.length - 1) {
          return <VText color="secondary" className="text-sm text-limit-1 capitalize" key={v}>{t(v)}</VText>;
        } else {
          return <Link to={`/${splits.slice(0, idx).join('/')}`} className="no-underline" key={v}>
            <VText color="primary" className="text-sm text-limit-1 capitalize">{t(v)} /&nbsp;</VText>
          </Link>;
        }
      });
    }
    return <>
      <VText className="text-2xl font-bold text-limit-1 leading-6" div>{t(text)}</VText>
      <div className="flex">{breadcrumbs}</div>
    </>;
  }, [location.pathname, t, userName]);

  return <>
    <div className="flex items-center px-8 py-2 border-solid border-0 border-b border-gray-300 hidden md:flex" id="v-header">
      <VSwitch
        checked={!miniSidenav}
        setChecked={onMiniSidenavClick}
        color="info"
        type="square"
        className="mr-0 v-switch-square"
      />
      <div className="w-px h-7 bg-gray-300 mx-4" />
      <div className="hidden sm:block mr-2">
        {headerTextDom}
      </div>
      <div className="ml-auto flex items-center ">
        <VButton
          iconButton
          variant="contained"
          color="primary"
          id="v-tour-useradd"
          onClick={onClick}
          name="add"
        >
          <Icon className="text-2xl" icon="fluent:add-24-filled" />
        </VButton>
        <VButton
          iconButton
          variant="outlined"
          color="secondary"
          onClick={onClick}
          className="ml-2"
          name="notification"
        >
          <Icon className="text-2xl" icon="fa-regular:bell" />
        </VButton>

        <HeaderSearch />

        <HeaderLanguage />

        <HeaderDark />

        <HeaderTour />

        <div className="w-px h-7 bg-gray-300 ml-4 mr-2" />

        <VButton variant="text" className="flex items-center normal-case" onClick={onClick} name="menu">
          <VAvatar src={user.avatar} size='sm' bgColor="light" />
          <div className="ml-2 hidden lg:block">
            <VText className="text-base font-bold leading-5 text-limit-1">{userName}</VText>
            <VText className="text-xs text-gray-400 leading-4 text-limit-1 text-left">{user.permission || '-'}</VText>
          </div>
          <Icon className="text-gray-400 dark:text-gray-200 ml-2" icon="akar-icons:chevron-down" />
        </VButton>

        <Menu
          id="basic-menu"
          className="v-drop-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{ 'aria-labelledby': 'basic-button' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {elemName === 'add' && <div onClick={handleClose}><HeaderAdd /></div>}
          {elemName === 'notification' && <HeaderAlert />}
          {elemName === 'menu' && <div onClick={handleClose}><HeaderMenu /></div>}
        </Menu>

      </div>
    </div>

    <div className="flex items-center px-8 py-2 border-solid border-0 border-b border-gray-300 flex md:hidden" id="v-header">
      <VImage src="https://edu-file-uploads.s3.amazonaws.com/dev/logo/logo.png" className="h-12" />
      <VButton iconOnly color="secondary" className="ml-auto" onClick={() => actionMiniSidenav(dispatch, false)}>
        <Icon icon="heroicons-solid:menu-alt-1" className="text-3xl" />
      </VButton>
    </div>
  </>;
};

export default Header;