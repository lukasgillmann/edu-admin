
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import { VAvatar, VText } from "../../form";
import { useAsterController } from "../../context";
import Skeleton from "react-loading-skeleton";

const HeaderSearchUser = () => {

  const { t } = useTranslation('common');

  const [controller] = useAsterController();
  const { searchUsers, loadedSearchList } = controller;

  return <div className="p-4">
    <VText color="secondary" className="text-lg">{t("User")}</VText>
    {
      !loadedSearchList ? <Skeleton className="h-10 mt-2" count={10} />
        : <>
          {
            searchUsers.length ?
              searchUsers.map(user =>
                <Link to={`/user/learners/detail/${user.page}/10/${user.id}`} className="no-underline" key={`${user.id}`}>
                  <div className="flex items-center mt-2 hover:bg-gray-200 p-1">
                    <VAvatar src={user.avatar} className="flex-shrink-0" />
                    <div className="ml-4">
                      <VText>{`${user.first_name || user.username} ${user.last_name}` || '-'}</VText>
                      <div className="flex">
                        <VText color="secondary" className="text-xs rounded px-1 py-0.5 w-max flex items-center h-min ml-2">
                          <Icon icon="bx:user-circle" />&nbsp;{user.email}
                        </VText>
                        <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5 w-max flex items-center h-min ml-4">
                          <Icon icon="ic:outline-published-with-changes" />&nbsp;{user.permission || '-'}
                        </VText>
                      </div>
                    </div>
                  </div>
                </Link>)
              :
              <div className="h-80 flex flex-col justify-center items-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                  <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center">
                    <Icon icon="mdi:selection-search" className="text-3xl text-white" />
                  </div>
                </div>
                <VText className="text-sm mt-4">{t('Your search did not match with anything')}</VText>
              </div>
          }
        </>
    }
  </div>;
};

export default HeaderSearchUser;