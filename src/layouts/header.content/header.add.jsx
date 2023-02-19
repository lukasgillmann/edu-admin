import { Icon } from "@iconify/react";
import { Divider } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import VButton from "../../form/VButton";
import VText from "../../form/VText";
import { useAsterController } from "../../context";
import { actionUserIdDelete } from "../../context/action";

const HeaderAdd = () => {

  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const [, dispatch] = useAsterController();

  const onAddClick = () => {
    actionUserIdDelete(dispatch);
    navigate('/user/learners/new');
  };

  return <div className="w-72 my-2">
    <VText color="secondary" className="text-xs mx-1.5">{t("Users")}</VText>
    <div className="px-1.5">
      <Link to="/user/learners/new" className="no-underline">
        <VButton variant="text" className="flex items-center w-full justify-start v-primary-text v-tour-useradd" onClick={onAddClick}>
          <VText className="text-sm leading-5 text-limit-1 flex items-center" color="custom">
            <Icon icon="akar-icons:plus" />&nbsp;&nbsp;{t("Add New User")}
          </VText>
        </VButton>
      </Link>
    </div>
    <div className="px-1.5">
      <Link to="/user/groups" className="no-underline">
        <VButton variant="text" className="flex items-center w-full justify-start v-primary-text">
          <VText className="text-sm leading-5 text-limit-1 flex items-center" color="custom">
            <Icon icon="akar-icons:plus" />&nbsp;&nbsp;{t("Create New Group")}
          </VText>
        </VButton>
      </Link>
    </div>
    <div className="px-1.5">
      <Link to="/user/tutors/add" className="no-underline">
        <VButton variant="text" className="flex items-center w-full justify-start v-primary-text">
          <VText className="text-sm leading-5 text-limit-1 flex items-center" color="custom">
            <Icon icon="akar-icons:plus" />&nbsp;&nbsp;{t("Create New Tutor")}
          </VText>
        </VButton>
      </Link>
    </div>
    <div className="px-1.5">
      <Link to="/user/coaches/add" className="no-underline">
        <VButton variant="text" className="flex items-center w-full justify-start v-primary-text">
          <VText className="text-sm leading-5 text-limit-1 flex items-center" color="custom">
            <Icon icon="akar-icons:plus" />&nbsp;&nbsp;{t("Create New Coach")}
          </VText>
        </VButton>
      </Link>
    </div>

    <Divider className="my-4 bg-gray-200 dark:bg-white" />

    <VText color="secondary" className="text-xs mx-1.5">{t("Contents")}</VText>
    <div className="px-1.5">
      <a href={process.env.REACT_APP_STUDIO_ENDPOINT} className="no-underline" rel="noreferrer">
        <VButton variant="text" className="flex items-center w-full justify-start v-primary-text">
          <VText className="text-sm leading-5 text-limit-1 flex items-center" color="custom">
            <Icon icon="akar-icons:plus" />&nbsp;&nbsp;{t("New Course")}
          </VText>
        </VButton>
      </a>
    </div>
    <div className="px-1.5">
      <a href={process.env.REACT_APP_STUDIO_ENDPOINT} className="no-underline" rel="noreferrer">
        <VButton variant="text" className="flex items-center w-full justify-start v-primary-text">
          <VText className="text-sm leading-5 text-limit-1 flex items-center" color="custom">
            <Icon icon="akar-icons:plus" />&nbsp;&nbsp;{t("New Library")}
          </VText>
        </VButton>
      </a>
    </div>
    <div className="px-1.5">
      <Link to="/catalog/virtual/add" className="no-underline">
        <VButton variant="text" className="flex items-center w-full justify-start v-primary-text">
          <VText className="text-sm leading-5 text-limit-1 flex items-center" color="custom">
            <Icon icon="akar-icons:plus" />&nbsp;&nbsp;{t("Create New virtual class")}
          </VText>
        </VButton>
      </Link>
    </div>

  </div>;
};

export default HeaderAdd;