import { Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

import { VButton } from "../../form";
import FlagFr from "../flag/fr";
import FlagUk from "../flag/uk";

const HeaderLanguage = () => {

  const { i18n } = useTranslation('common');

  const [anchorEl, setAnchorEl] = useState(null);
  const [flag, setFlag] = useState('fr');

  useEffect(() => {
    const lang = localStorage.getItem('language');
    setFlag(lang);
  }, [i18n]);

  const onClick = (lang) => {
    setAnchorEl(null);
    setFlag(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return <>
    <VButton iconButton variant="outlined" color="secondary" className="ml-2" onClick={(e) => setAnchorEl(e.currentTarget)}>
      <div className="w-6 h-6">
        {flag === 'uk' ? <FlagUk /> : <FlagFr />}
      </div>
    </VButton>

    <Menu
      className="v-drop-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={() => onClick('fr')}>
        <div className="w-6 h-6 mr-2"><FlagFr /></div>French
      </MenuItem>
      <MenuItem onClick={() => onClick('uk')}>
        <div className="w-6 h-6 mr-2"><FlagUk /></div>English
      </MenuItem>
    </Menu>
  </>;
};

export default HeaderLanguage;