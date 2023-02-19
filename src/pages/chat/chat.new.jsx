
import { useState, useMemo } from "react";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import { BGPagination, BModal, BTable } from "../../components";
import { VAvatar, VButton, VInput, VText } from "../../form";
import { useAsterController } from "../../context";
import { actionChatActiveUserAdd, actionUserList } from "../../context/action";
import { getFormatDate, getUserName } from "../../utils/string";

const ChatNew = () => {

  const { t, i18n } = useTranslation('common');

  const [controller, dispatch] = useAsterController();
  const { users, chatActiveUsers, chatArchievedUsers, loadedAdminDashboardGet, loadedUserList } = controller;
  const loading = !loadedAdminDashboardGet || !loadedUserList;

  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState('');
  
  const showList = useMemo(() => {
    const tmp = term.toLowerCase();
    return (users.data || []).filter(v => v.username?.toLowerCase()?.includes(tmp) || v.first_name?.toLowerCase()?.includes(tmp) || v.last_name?.toLowerCase()?.includes(tmp));
  }, [users.data, term]);

  const handlePageChange = (page, pageSize) => actionUserList(dispatch, { page, page_size: pageSize });

  const onChatStart = user => {
    setOpen(false);

    // Now add this user to activeUser list
    const currTime = new Date().toISOString();
    actionChatActiveUserAdd(dispatch, {
      user_id: user.id,
      fullname: `${user.first_name} ${user.last_name}`.trim(),
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      phone_number: user.phone_number,
      role: user.role,
      location: user.location,
      count: 0,
      enabled: true,
      created: currTime,
      updated: currTime,
      message_more: false,
      page: 0,
      messages: []
    });
  };

  const columns = [
    {
      name: <VText>{t('Avatar')}</VText>,
      selector: rw => rw.first_name || rw.username,
      cell: rw => <div className="flex items-center" >
        <VAvatar src={rw.avatar} />
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
      name: <VText>{t('Group')}</VText>,
      selector: row => row.group_name,
      cell: rw => <VText><Icon className="text-yellow-400" icon="pepicons:paint-pallet" />&nbsp;{rw.group_name || '-'}</VText>,
      sortable: true,
      minWidth: '200px'
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
      cell: rw => <VButton variant="outlined"
        onClick={() => onChatStart(rw)}
        disabled={chatActiveUsers.data.map(v => v.user_id).includes(rw.id) || chatArchievedUsers.data.map(v => v.user_id).includes(rw.id)}
      >
        Start Chat
      </VButton>,
      grow: 0,
      minWidth: '150px'
    },
  ];

  return <>
    <VButton startIcon="add" variant="contained" color="primary" className="text-sm ml-4 normal-case my-1" onClick={() => setOpen(true)}>
      {t('New Messages')}
    </VButton>

    <BModal open={open} setOpen={setOpen}>
      <div className="p-4">
        <VText className="text-2xl">{t('New Chat')}</VText>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 w-full flex-wrap flex py-3 px-4 items-center">
        <VInput startIcon="search" size="small" className="m-1 w-full sm:w-max" inputClassName="pt-1 py-1 mt-px" value={term} setValue={val => setTerm(val)} />
        <div className="flex m-1">
          <VButton variant="outlined" color="secondary" size="normal" className="text-sm normal-case">
            <Icon icon="ant-design:filter-filled" />&nbsp;{t('Filter')}
          </VButton>
        </div>
      </div>

      <BTable
        key={`${loading}${showList.length}`}
        columns={columns}
        data={showList}
        total={users.total}
        loading={loading}
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

export default ChatNew;