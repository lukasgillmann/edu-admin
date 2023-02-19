import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';

import VText from "../../form/VText";
import VAvatar from "../../form/VAvatar";
import BTable from '../../components/BTable';
import VButton from '../../form/VButton';
import { useAsterController } from '../../context';
import { actionUserList } from '../../context/action';
import { BGPagination } from '../../components';
import { getFormatDate, getUserName } from '../../utils/string';
import PageNoData from '../PageNoData';

const TrackCourseTable = () => {

  const { t, i18n } = useTranslation('common');

  const [controller, dispatch] = useAsterController();
  const { users, loadedAdminDashboardGet, loadedUserList } = controller;
  const loading = !loadedAdminDashboardGet || !loadedUserList;

  const handlePageChange = (page, pageSize) => actionUserList(dispatch, { page, page_size: pageSize });

  const columns = [
    {
      name: <VText>{t('Avatar')}</VText>,
      selector: rw => rw.first_name || rw.username,
      cell: rw => <div className="flex items-center" >
        <Link to={`/tracking/detail/${users.page}/${users.page_size}/${rw.id}`} className="no-underline">
          <VAvatar src={rw.avatar} />
        </Link>
        <div className="ml-4">
          <VText div>{getUserName(rw)}</VText>
          <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5">{t(rw.permission)}</VText>
        </div>
      </div>,
      grow: 1,
      sortable: true,
      minWidth: '220px'
    },
    {
      name: <VText>{t('Contact')}</VText>,
      selector: row => row.email,
      cell: rw => <div>
        <VText className="break-all items-center" div>
          <Icon icon="eva:email-outline" className="text-gray-400 w-6" />&nbsp;{rw.email}
        </VText>
        <VText className="break-all">
          <Icon icon="bx:phone" className="text-gray-400 w-6" />&nbsp;{rw.phone_number || '-'}
        </VText>
      </div>,
      sortable: true,
      minWidth: '300px'
    },
    {
      name: <VText>{t('Total courses')}</VText>,
      selector: row => row.course_count,
      cell: rw => <VText>{rw.course_count}</VText>,
      sortable: true,
      hide: 'lg',
      grow: 0,
      minWidth: '150px'
    },
    {
      name: <VText>{t('Date Added')}</VText>,
      selector: row => row.created,
      cell: rw => <VText>{getFormatDate(rw.created, i18n.language)}</VText>,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: <VText>{t('Action')}</VText>,
      cell: rw =>
        <Link to={`/tracking/detail/${users.page}/${users.page_size}/${rw.id}`} className="no-underline">
          <VButton iconOnly color="secondary">
            <Icon icon="akar-icons:eye" className="text-xl" />
          </VButton>
        </Link>,
      grow: 0,
    },
  ];

  return <>
    <Divider className="bg-gray-200 dark:bg-gray-500" />
    <BTable
      key={loading}
      columns={columns}
      data={users.data}
      total={users.total}
      loading={loading}
    />
    <BGPagination
      handlePageChange={handlePageChange}
      total={users.total}
      initPage={users.page}
      initSize={users.page_size}
    />

    <PageNoData show={!loading && !users.total} />
  </>;
};

export default TrackCourseTable;