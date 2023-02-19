import { Tab, Tabs, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { VText } from '../../form';
import GroupDetailMember from './group.detail.member';
import GroupDetailProgram from './group.detail.program';
import GroupDetailDetail from './group.detail.detail';
import { numberInputs } from '../../utils/tool';
import { useAsterController } from '../../context';
import { actionGroupList } from '../../context/action';
import PaginationFetcher from '../PaginationFetcher';
import GroupDetailEdit from './group.detail.edit';

const GroupDetail = () => {

  const { t } = useTranslation('common');

  const { page, pageSize, groupId } = numberInputs(useParams());

  const [controller] = useAsterController();
  const { groups } = controller;

  const currGroup = useMemo(() => groups.page === page && groups.page_size === pageSize ? groups.data.find(v => v.id === groupId) || { users: [], courses: [] } : {}, [page, pageSize, groups, groupId]);

  const [tab, setTab] = useState(0);
  const handleSetTabValue = (_, newValue) => setTab(newValue);

  return <div>

    <PaginationFetcher page={page} pageSize={pageSize} list={groups} action={actionGroupList} />

    <div className="p-4 md:p-8">
      {
        currGroup.cover_url ?
          <div className="w-full h-64 rounded-lg bg-center bg-cover bg-gray-100 dark:bg-gray-700" style={{ backgroundImage: `url("${currGroup.cover_url}")` }} />
          :
          <div className="w-full h-64 rounded-lg bg-center bg-cover bg-gray-100 dark:bg-gray-700" style={{ backgroundImage: `url("${process.env.REACT_APP_S3_ASSET_ENDPOINT + '/v2-assets/default-cover-' + (currGroup.name?.charCodeAt(0) % 3 + 1) + '.png'}")` }} />
      }

      <div className="relative flex w-full items-end mt-8">
        <VText className="text-4xl">{t('General Learning Group')}</VText>

        <div className="ml-auto">
          <GroupDetailEdit currGroup={currGroup} key={currGroup.id} />
        </div>
      </div>
    </div>
    <div className="h-8 ml-2">
      <Tabs orientation="horizontal" value={tab} onChange={handleSetTabValue} className="h-9 v-tabs" sx={{ minHeight: 36 }}>
        <Tab label={t("Members")} className="min-h-0 text-dark dark:text-white" />
        <Tab label={t("Learning Programs")} className="min-h-0 text-dark dark:text-white" />
        <Tab label={t("Group Details")} className="min-h-0 text-dark dark:text-white" />
      </Tabs>
      <Divider className="bg-gray-200 dark:bg-gray-500" />
    </div>
    <div className="py-2">
      {tab === 0 && <GroupDetailMember currGroup={currGroup} key={currGroup.id} />}
      {tab === 1 && <GroupDetailProgram currGroup={currGroup} key={currGroup.id} />}
      {tab === 2 && <GroupDetailDetail currGroup={currGroup} key={currGroup.id} />}
    </div>
  </div>;

};

export default GroupDetail;