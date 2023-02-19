import { useMemo } from "react";
import { Icon } from "@iconify/react";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import VAvatar from "../../form/VAvatar";
import VButton from "../../form/VButton";
import VText from "../../form/VText";
import { useAsterController } from "../../context";

const HeaderMenu = () => {

  const { t } = useTranslation('common');

  const [controller] = useAsterController();
  const { user } = controller;
  const userName = useMemo(() => user.first_name || user.last_name ? `${user.first_name} ${user.last_name}`.trim() || user.username || '-' : '-', [user]);

  const onClick = () => { };

  return <div className="w-64 my-2">
    <Link to="/settings/general" className="no-underline">
      <VButton variant="text" className="flex items-center w-full justify-start px-4 normal-case">
        <VAvatar src={user.avatar} size='sm' bgColor="light" />
        <div className="text-left ml-2">
          <VText className="text-lg font-bold leading-5 text-limit-1">{userName}</VText>
          <VText className="text-sm text-gray-400 leading-4 text-limit-1" color="primary">{user.permission || '-'}</VText>
        </div>
      </VButton>
    </Link>
    <Divider className="my-4 bg-gray-200 dark:bg-white" />
    <div className="mx-1.5">
      <VButton variant="text" className="flex items-center w-full justify-start px-4 text-left normal-case v-primary-text" onClick={onClick}>
        <VText className="text-base leading-5 text-limit-1 flex items-center" color="custom">
          <Icon icon="ci:user-plus" className="text-xl" />&nbsp;&nbsp;{t('Add Another Account')}
        </VText>
      </VButton>
    </div>
    {
      user.permission === "SUPERADMIN" &&
      <div className="mx-1.5">
        <a href={`https://master.digitallearningsolution.net/token/${localStorage.getItem('jwt')}`} className="no-underline" rel="noreferrer" target="_blank">
          <VButton variant="text" className="flex items-center w-full justify-start px-4 text-left normal-case v-primary-text" onClick={onClick}>
            <VText className="text-base leading-5 text-limit-1 flex items-center" color="custom">
              <Icon icon="fa-brands:superpowers" className="text-xl" />&nbsp;&nbsp;{t('Master Admin')}
            </VText>
          </VButton>
        </a>
      </div>
    }

    <Divider className="my-4 bg-gray-200 dark:bg-white" />
    <div className="px-4">
      <a href={`${process.env.REACT_APP_BASE_URL}/logout`} rel="noopener noreferrer" className="no-underline">
        <VButton variant="contained" color="primary" className="w-full normal-case" onClick={onClick}>
          <Icon icon="ic:outline-logout" className="text-xl" />&nbsp;&nbsp;{t("Logout")}
        </VButton>
      </a>
    </div>
  </div >;
};

export default HeaderMenu;