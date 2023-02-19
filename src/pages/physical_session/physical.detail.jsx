import { Tab, Tabs, Divider } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';

import { VButton, VText } from '../../form';
import PhysicalDetailUser from './physical.detail.user';
import PhysicalDetailDetail from './physical.detail.detail';
import { useAsterController } from '../../context';
import PaginationFetcher from '../PaginationFetcher';
import { numberInputs } from '../../utils/tool';
import { actionPhysicalSessionList } from '../../context/action';

const PhysicalDetail = () => {

  const { t } = useTranslation('common');

  const { page, pageSize, sessionId } = numberInputs(useParams());

  const [controller] = useAsterController();
  const { physicalSessions } = controller;

  const currSession = useMemo(() => physicalSessions.page === page && physicalSessions.page_size === pageSize ? physicalSessions.data.find(v => v.id === sessionId) || {} : {}, [page, pageSize, physicalSessions, sessionId]);

  const [tab, setTab] = useState(0);
  const handleSetTabValue = (_, newValue) => setTab(newValue);

  return <div>

    <PaginationFetcher page={page} pageSize={pageSize} list={physicalSessions} action={actionPhysicalSessionList} />

    <div className="p-4 md:p-8">
      <div className="relative flex w-full justify-center md:justify-start flex-wrap items-end pl-0 md:pl-4">
        <VText className="text-4xl my-1" div>{currSession.subject}</VText>

        <Link to={`/catalog/physical-session/edit/${physicalSessions.page}/${physicalSessions.page_size}/${sessionId}`} className="no-underline ml-auto my-1">
          <VButton variant="text" color="primary" className="h-min text-sm normal-case">
            <Icon icon="eva:edit-outline" />&nbsp;{t('Edit')}
          </VButton>
        </Link>
      </div>
    </div>
    <div className="h-8 ml-2">
      <Tabs orientation="horizontal" value={tab} onChange={handleSetTabValue} className="h-9 v-tabs" sx={{ minHeight: 36 }}>
        <Tab label={t("Information")} className="min-h-0 text-dark dark:text-white normal-case" />
        <Tab label={t("Users")} className="min-h-0 text-dark dark:text-white normal-case" />
      </Tabs>
      <Divider className="bg-gray-200 dark:bg-gray-500" />
    </div>
    <div className="p-4 md:p-8">
      {tab === 0 && <PhysicalDetailDetail />}
      {tab === 1 && <PhysicalDetailUser currSession={currSession} />}
    </div>
  </div>;

};

export default PhysicalDetail;