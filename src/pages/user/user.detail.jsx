import { useEffect, useMemo, useState } from 'react';
import { Tab, Tabs, Divider } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import { VAvatar, VButton, VText } from '../../form';
import UserDetailContent from './user.detail.content';
import UserDetailDetail from './user.detail.detail';
import { useAsterController } from '../../context';
import PaginationFetcher from '../PaginationFetcher';
import { numberInputs } from '../../utils/tool';
import { actionUserCourseList, actionUserList } from '../../context/action';
import { getUserName } from '../../utils/string';

const UserDetail = () => {

  const { t } = useTranslation('common');

  const { page, pageSize, userId } = numberInputs(useParams());

  const [controller, dispatch] = useAsterController();
  const { users } = controller;

  const currUser = useMemo(() => users.page === page && users.page_size === pageSize ? users.data.find(v => v.id === userId) || {} : {}, [page, pageSize, users, userId]);

  useEffect(() => actionUserCourseList(dispatch, userId), [userId, dispatch]);

  const [tab, setTab] = useState(0);
  const handleSetTabValue = (_, newValue) => setTab(newValue);

  return <div>

    <PaginationFetcher page={page} pageSize={pageSize} list={users} action={actionUserList} />

    <div className="p-4 md:p-8">
      {
        currUser.cover ?
          <div className="w-full h-64 rounded-lg bg-center bg-cover bg-gray-100 dark:bg-gray-700" style={{ backgroundImage: `url("${currUser.cover}")` }} />
          :
          <div className="w-full h-64 rounded-lg bg-center bg-cover bg-gray-100 dark:bg-gray-700" style={{ backgroundImage: `url("${process.env.REACT_APP_S3_ASSET_ENDPOINT + '/v2-assets/default-cover-' + ((currUser.username?.charCodeAt(0) % 3 + 1) || 1) + '.png'}")` }} />
      }
      <div className="relative flex w-full justify-center md:justify-start flex-wrap items-end -mt-24 pl-0 md:pl-4">
        <VAvatar src={currUser.avatar} className="w-40 h-40" />
        <VText className="text-4xl my-1" div>{getUserName(currUser)}</VText>

        <Link to={`/user/learners/edit/${users.page}/${users.page_size}/${userId}`} className="no-underline ml-auto my-1">
          <VButton variant="text" color="primary" className="h-min text-sm normal-case">
            <Icon icon="eva:edit-outline" />&nbsp;{t('Edit')}
          </VButton>
        </Link>
      </div>
    </div>
    <div className="h-8 ml-2">
      <Tabs orientation="horizontal" value={tab} onChange={handleSetTabValue} className="h-9 v-tabs" sx={{ minHeight: 36 }}>
        <Tab label={t("Information")} className="min-h-0 text-dark dark:text-white normal-case" />
        <Tab label={t("Contents")} className="min-h-0 text-dark dark:text-white normal-case" />
      </Tabs>
      <Divider className="bg-gray-200 dark:bg-gray-500" />
    </div>
    <div className="p-4 md:p-8">
      {tab === 0 && <UserDetailDetail />}
      {tab === 1 && <UserDetailContent userId={userId} />}
    </div>
  </div>;

};

export default UserDetail;