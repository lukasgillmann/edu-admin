import { Divider } from "@mui/material";
import React, { useMemo, useState } from "react";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import { VButton, VText, VAvatar } from "../../form";
import { BGPagination, BModal, BTable } from "../../components";
import { useAsterController } from "../../context";
import { actionGroupAssignUsers, actionUserList } from "../../context/action";
import { getAvatarUrl, getFormatDate, getUserName } from "../../utils/string";

const GroupDetailMemberAdd = (props) => {

  const { t, i18n } = useTranslation('common');

  const { currGroup } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [groupUsers, setGroupUsers] = useState([]);
  const groupUserIds = useMemo(() => currGroup.users.map(v => v.id), [currGroup.users]);

  const [controller, dispatch] = useAsterController();
  const { users, loadedAdminDashboardGet, loadedUserList, loadedGroupUserAssign } = controller;

  const loading = !loadedAdminDashboardGet || !loadedUserList;

  const handlePageChange = (page, pageSize) => actionUserList(dispatch, { page, page_size: pageSize });
  const onSelectChange = (data) => setGroupUsers(data);
  const onAssign = () => {
    actionGroupAssignUsers(dispatch, { group_id: currGroup.id, users: groupUsers.map(v => ({ ...v, group_name: currGroup.name })) }, t);
    setModalOpen(false);
  };

  const columns = [
    {
      name: <VText>{t("Avatar")}</VText>,
      selector: rw => rw.first_name || rw.username,
      cell: rw => <div className="flex items-center" >
        <VAvatar src={rw.is_avatar ? getAvatarUrl(rw.username) : ""} />
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
      name: <VText>{t('Date Added')}</VText>,
      selector: row => row.created,
      cell: rw => <VText>{getFormatDate(rw.created, i18n.language)}</VText>,
      sortable: true,
      minWidth: '150px'
    },
  ];

  return <>

    <VButton variant="contained" color="primary" className="text-sm ml-2 normal-case" onClick={() => { setGroupUsers([]); setModalOpen(true); }}>
      <Icon icon="akar-icons:plus" />&nbsp;
      {t('New Member')}
    </VButton>

    <BModal open={modalOpen} setOpen={setModalOpen} width='90vw' height='fit-content' className="w-full max-w-xl h-full max-h-150">

      <div className="px-8 pt-8 flex justify-between">
        <VText className="text-2xl" div>{t('Assign Users')}</VText>
        <VButton variant="contained" color="primary" className="text-sm ml-2 normal-case" onClick={onAssign} disabled={!groupUsers.length} loading={!loadedGroupUserAssign}>
          {t('Assign')}
        </VButton>
      </div>

      <Divider className="bg-gray-200 dark:bg-gray-500 mt-4" />

      <BTable
        key={loading}
        columns={columns}
        data={users.data}
        total={users.total}
        loading={loading}
        isSelect
        onSelectChange={onSelectChange}
        selectableRowDisabled={row => groupUserIds.includes(row.id)}
        page={users.page}
        pageSize={users.page_size}
      />
      <BGPagination
        handlePageChange={handlePageChange}
        total={users.total}
        initPage={users.page}
        initSize={users.page_size}
      />
    </BModal>

  </>;
};

export default GroupDetailMemberAdd;