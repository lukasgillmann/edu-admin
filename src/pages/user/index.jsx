import { Grid, Tab, Tabs, Divider, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import { useConfirm } from "material-ui-confirm";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';

import { VText, VAvatar, VButton } from "../../form";
import { BGPagination, BModal, BPopOver, BTable } from "../../components";
import { useAsterController } from "../../context";
import { actionGhostTokenGet, actionResetGhostToken, actionSendReminders, actionUserDelete, actionUserIdDelete, actionUserList } from "../../context/action";
import { formatTimeSpent, getFormatDate, getUserName } from '../../utils/string';
import UserResetPassword from "./user.resetpassword";
import { downloadCSV, downloadHTML } from "../../utils/csv";
import PageNoData from "../PageNoData";
import { useMemo } from "react";

const User = () => {

  const { t, i18n } = useTranslation('common');
  const navigate = useNavigate();
  const confirm = useConfirm();

  const [controller, dispatch] = useAsterController();
  const { users, themes, ghostToken, loadedGhostToken, loadedAdminDashboardGet, loadedUserList, loadedUserDelete } = controller;

  const loading = !loadedAdminDashboardGet || !loadedUserList;
  const colorMain3 = themes.find(v => v.name === 'color_main3')?.value || '#F0BC04';

  const [tab, setTab] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [userIdx, setUserIdx] = useState(null);
  const [term, setTerm] = useState('');

  const showList = useMemo(() => {
    const tmp = term.toLowerCase();
    return (users.data || []).filter(v => v.username?.toLowerCase()?.includes(tmp) || v.first_name?.toLowerCase()?.includes(tmp) || v.last_name?.toLowerCase()?.includes(tmp) || v.email?.toLowerCase()?.includes(tmp));
  }, [users.data, term]);

  useEffect(() => {
    if (loadedGhostToken && ghostToken) {
      actionResetGhostToken(dispatch);
      localStorage.setItem('jwt-ghost', ghostToken);
      setTimeout(() => window.open(process.env.REACT_APP_APP_ENDPOINT), 1000);
    }
  }, [ghostToken, loadedGhostToken, dispatch]);

  const handleSetTabValue = (_, newValue) => setTab(newValue);
  const handlePageChange = (page, pageSize) => actionUserList(dispatch, { page, page_size: pageSize });
  const onSendReminders = () => actionSendReminders(dispatch, [], t);
  const onSendReminder = (idx) => actionSendReminders(dispatch, [users.data[idx].id], t);

  const onGhostClick = (userId) => {
    localStorage.removeItem('jwt-ghost');
    actionGhostTokenGet(dispatch, { user_id: userId }, t);
  };

  const onRegisterClick = () => {
    navigate('/user/learners/register');
    actionUserIdDelete(dispatch);
  };

  const onPasswordReset = (idx) => {
    setUserIdx(idx);
    setModalOpen(true);
  };

  const onDelete = (idx) => {
    confirm({
      title: t("Are you sure?"),
      confirmationText: t("OK"),
      cancellationText: t("Cancel"),
      description: <div><Icon icon="emojione-v1:warning" />&nbsp;{t("Warning: All data for this learner will be permanently deleted!")}</div>
    })
      .then(() => actionUserDelete(dispatch, users.data[idx].id, t))
      .catch(() => { });
  };

  const columns = [
    {
      name: <VText className="ml-20">{t('Name')}</VText>,
      selector: rw => rw.first_name || rw.username,
      cell: rw => <div className="flex items-center" >
        <Link to={`/user/learners/detail/${users.page}/${users.page_size}/${rw.id}`} className="no-underline">
          <VAvatar src={rw.avatar} className="w-16 h-16" />
        </Link>
        <div className="ml-4">
          <VText div className="mb-4">{getUserName(rw)}</VText>
          {rw.permission === 'STAFF' && <div className="text-xs bg-purple-50 dark:bg-purple-500 rounded px-1 py-0.5 w-max" style={{ color: colorMain3 }}>{t("STAFF")}</div>}
          {rw.permission === 'ADMIN' && <div className="text-xs bg-purple-50 dark:bg-purple-500 rounded px-1 py-0.5 w-max" style={{ color: colorMain3 }}>{t("ADMIN")}</div>}
          {rw.permission === 'USER' && <div className="text-xs bg-purple-50 dark:bg-purple-500 rounded px-1 py-0.5 w-max v-text-active text-purple-400 dark:text-purple-100">{t("USER")}</div>}
        </div>
      </div>,
      grow: 1,
      sortable: true,
      minWidth: '220px'
    },
    {
      name: <VText>{t('Contact')}</VText>,
      selector: rw => rw.email,
      cell: rw => <div>
        <VText className="break-all items-center" div>
          <Icon icon="eva:email-outline" className="text-gray-400 w-6" />&nbsp;{rw.email}
        </VText>
        <VText className="break-all mt-2" div>
          <Icon icon="bx:phone" className="text-gray-400 w-6" />&nbsp;{rw.phone_number || '-'}
        </VText>
      </div>,
      sortable: true,
      minWidth: '300px'
    },
    {
      name: <VText>{t('Total courses')}</VText>,
      selector: rw => rw.course_count,
      cell: rw => <VText>{rw.course_count}</VText>,
      sortable: true,
      hide: 'lg',
      grow: 0,
      minWidth: '150px'
    },
    {
      name: <VText>{t('Group')}</VText>,
      selector: rw => rw.group_name,
      cell: rw => <VText><Icon className="text-yellow-400" icon="pepicons:paint-pallet" />&nbsp;{rw.group_name || '-'}</VText>,
      sortable: true,
      minWidth: '200px'
    },
    {
      name: <VText>{t('Date Added')}</VText>,
      selector: rw => rw.created,
      cell: rw => <VText>{getFormatDate(rw.created, i18n.language)}</VText>,
      sortable: true,
      minWidth: '200px'
    },
    {
      name: <VText>{t('Last activity')}</VText>,
      selector: rw => rw.last_login,
      cell: rw => <VText>{getFormatDate(rw.last_login, i18n.language)}</VText>,
      sortable: true,
      minWidth: '200px'
    },
    {
      name: <VText>{t('Total Spent')}</VText>,
      selector: rw => rw.total_spent,
      cell: rw => <VText>{formatTimeSpent(rw.total_spent)}</VText>,
      sortable: true,
      minWidth: '200px'
    },
    {
      name: <VText>{t('Ghost Mode')}</VText>,
      cell: rw => <VButton iconOnly onClick={() => onGhostClick(rw.id)}><Icon icon="ic:baseline-preview" className="text-2xl" /></VButton>,
      minWidth: '100px'
    },
    {
      name: <VText>{t('Action')}</VText>,
      cell: (rw, idx) =>
        <BPopOver trigger={<VButton iconOnly variant="outlined" color="success"><Icon icon="eva:more-horizontal-outline" /></VButton>}>
          <div className="flex flex-col">
            <Link to={`/user/learners/detail/${users.page}/${users.page_size}/${rw.id}`} className="no-underline">
              <VButton variant="text" className="px-5 py-1 justify-start normal-case w-full" color="secondary">
                <Icon icon="akar-icons:eye" />&nbsp;{t('View')}
              </VButton>
            </Link>
            <VButton variant="text" color="primary" className="px-5 py-1 justify-start w-full" onClick={() => onPasswordReset(idx)}>
              <Icon icon="material-symbols:lock-reset" />&nbsp;{t('Reset Password')}
            </VButton>
            {
              !rw.last_login && <VButton variant="text" color="secondary" className="px-5 py-1 justify-start w-full" onClick={() => onSendReminder(idx)}>
                <Icon icon="majesticons:send-line" />&nbsp;{t('Send Reminder')}
              </VButton>
            }
            <VButton variant="text" color="warning" className="px-5 py-1 justify-start w-full" onClick={() => onDelete(idx)}>
              <Icon icon="mi:delete" />&nbsp;{t('Delete')}
            </VButton>

          </div>
        </BPopOver>,
      grow: 0,
    },
  ];

  const exportColumns = [
    { header: t("Email"), accessor: "email", type: "text" },
    { header: t('Username'), accessor: "username", type: "text" },
    { header: t('First Name'), accessor: "first_name", type: "text" },
    { header: t('Last Name'), accessor: "last_name", type: "text" },
    { header: t('Gender'), accessor: "gender", type: "text" },
    { header: t('Phone Number'), accessor: "phone_number", type: "text" },
    { header: t('Last activity'), accessor: "last_login", type: "date" },
    { header: t('Total Spent'), accessor: "total_spent", type: "time" },
  ];

  return <div>

    <BModal open={modalOpen} setOpen={setModalOpen} width='90vw' height='fit-content' className="w-full max-w-xl max-h-150">
      <UserResetPassword userIdx={userIdx} setOpen={setModalOpen} />
    </BModal>

    <div className="px-6 py-8" id="v-user-title">
      <Grid container spacing={2}>
        <Grid item sm={12} md={4} className="flex">
          <VText className="text-2xl">{users.total}</VText>&nbsp;
          <VText color="secondary" className="text-2xl">{t('Users in total')}</VText>
        </Grid>
        <Grid item sm={12} md={8} className="flex justify-center md:justify-end flex-wrap items-center">
          <VButton variant="text" color="secondary" className="text-sm normal-case" onClick={() => setTerm('')} disabled={!term}>
            <Icon icon="akar-icons:circle-check" />&nbsp;{t('All status')}
          </VButton>
          <BPopOver className="ml-2" autoClose={false} trigger={
            <VButton variant="text" color="secondary" className="text-sm normal-case">
              <Icon icon="ant-design:filter-filled" />&nbsp;{t('Filter')}
            </VButton>
          }>
            <TextField className="w-64" size="small" value={term} onChange={e => setTerm(e.target.value)} />
          </BPopOver>

          <div className="h-8 ml-2 v-tab-switch">
            <Tabs orientation="horizontal" value={tab} onChange={handleSetTabValue}>
              <Tab icon={<Icon className="mr-0" icon="akar-icons:grid" />} />
              <Tab icon={<Icon className="mr-0" icon="ci:list-checklist" />} />
            </Tabs>
          </div>

          <VButton className="ml-4" color="primary" variant="contained" startIcon="add" size="small" onClick={onRegisterClick}>
            {t('Add User')}
          </VButton>

          <BPopOver className="ml-4" trigger={
            <VButton variant="outlined" className="normal-case" size="small">
              <Icon icon="ep:setting" />&nbsp;{t('Menu')}&nbsp;
              <Icon icon="akar-icons:chevron-down" />
            </VButton>
          }>
            <div className="flex flex-col">
              <Link to={`/user/learners/bulk-register`} className="no-underline">
                <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full">
                  <Icon icon="ant-design:usergroup-add-outlined" />&nbsp;{t('Add bulk users')}
                </VButton>
              </Link>
              <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full" onClick={() => onSendReminders()}>
                <Icon icon="majesticons:send-line" />&nbsp;{t("Send Reminder")}
              </VButton>
              <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full" onClick={() => downloadCSV(exportColumns, users.data, t('Users'))}>
                <Icon icon="ph:file-csv" />&nbsp;{t("Export CSV")}
              </VButton>
              <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full" onClick={() => downloadHTML(exportColumns, users.data, t('Users'))}>
                <Icon icon="ph:file-html" />&nbsp;{t("Export HTML")}
              </VButton>
            </div>
          </BPopOver>
        </Grid>
      </Grid>
    </div>

    <div>
      {
        tab === 0 && <div className="px-4 pb-4 md:px-8 md:pb-8">
          <Grid container spacing={3}>
            {
              loading ?
                [...Array(10).keys()].map(v => <Grid key={v} item xs={12} sm={6} lg={4} xl={3}>
                  <div className="rounded-md border border-solid border-gray-200 p-4">
                    <Skeleton className="aspect-[9/5] mb-4" />
                    <Skeleton count={4} className="mt-2" />
                    <Skeleton className="h-8 mt-4" />
                  </div>
                </Grid>)
                :
                showList.map((rw, idx) =>
                  <Grid key={rw.id} item xs={12} sm={6} lg={4} xl={3}>
                    <div className="border border-solid border-gray-300 rounded-md h-full flex flex-col">
                      <div className="px-4 py-2 flex items-center">
                        <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5 w-max flex items-center h-min">
                          <Icon icon="ic:outline-published-with-changes" />&nbsp;{t(rw.permission)}
                        </VText>

                        <VButton iconOnly onClick={() => onGhostClick(rw.id)} className="ml-auto">
                          <Icon icon="ic:baseline-preview" className="text-2xl" />
                        </VButton>

                        <BPopOver className="ml-0" trigger={
                          <VButton iconOnly variant="outlined" color="primary">
                            <Icon icon="eva:more-horizontal-outline" />
                          </VButton>}
                        >
                          <div className="flex flex-col">
                            <VButton variant="text" color="primary" className="px-5 py-2 justify-start" onClick={() => onPasswordReset(idx)}>
                              <Icon icon="material-symbols:lock-reset" />&nbsp;{t("Reset Password")}
                            </VButton>
                            {
                              !rw.last_login && <VButton variant="text" color="secondary" className="px-5 py-2 justify-start" onClick={() => onSendReminder(idx)}>
                                <Icon icon="majesticons:send-line" />&nbsp;{t("Send Reminder")}
                              </VButton>
                            }
                            <VButton variant="text" color="warning" className="px-5 py-2 justify-start" onClick={() => onDelete(idx)}>
                              <Icon icon="mi:delete" />&nbsp;{t("Delete")}
                            </VButton>
                          </div>
                        </BPopOver>

                      </div>
                      <div className="relative">
                        {
                          rw.cover ? <div className="w-full aspect-[5/2] bg-cover bg-center bg-gray-100 dark:bg-gray-700" style={{ backgroundImage: `url("${rw.cover}")` }} /> :
                            <div className="w-full aspect-[5/2] bg-cover bg-center bg-gray-100 dark:bg-gray-700" style={{ backgroundImage: `url("${process.env.REACT_APP_S3_ASSET_ENDPOINT + '/v2-assets/default-cover-' + (rw.username.charCodeAt(0) % 3 + 1) + '.png'}")` }} />
                        }
                        <VAvatar src={rw.avatar} className="w-24 h-24 absolute -bottom-9 left-3" />
                      </div>
                      <div className="p-4">
                        <VText className="text-limit-1 ml-24">{getUserName(rw)}</VText>

                        <div className="flex flex-wrap mt-4">
                          <VText color="secondary" className="flex items-center text-sm mr-4">
                            <Icon icon="bx:user-circle" />&nbsp;
                            {rw.email}
                          </VText>
                          <VText color="secondary" className="flex items-center text-sm">
                            <Icon icon="mdi:login-variant" />&nbsp;
                            {getFormatDate(rw.last_login, i18n.language)}
                          </VText>
                        </div>
                      </div>
                      <Divider className="bg-gray-200 dark:bg-gray-500 mt-auto" />
                      <div className="flex">
                        <div className="flex-1 p-4 border-0 border-r border-solid border-gray-300">
                          <VText color="primary" div className="text-sm">{t("Course Assigned")}</VText>
                          <VText className="flex items-center text-lg"><Icon icon="bi:check-circle" />&nbsp;{rw.course_count}</VText>
                        </div>
                        <div className="flex-1 p-4">
                          <VText color="secondary" div className="text-sm">{t('Group')}</VText>
                          <div className="flex items-center text-lg">
                            <Icon icon="ci:group" className="flex-shrink-0" />
                            <VText className="text-limit-1 ml-1">{rw.group_name || '-'}</VText>
                          </div>


                        </div>
                      </div>
                      <Divider className="bg-gray-200 dark:bg-gray-500" />
                      <div className="p-4">
                        <Link to={`/user/learners/detail/${users.page}/${users.page_size}/${users.data[idx].id}`} className="no-underline">
                          <VButton variant="contained" className="w-full normal-case">
                            <Icon icon="akar-icons:eye" className="text-xl" />&nbsp;{t("View")}
                          </VButton>
                        </Link>
                      </div>
                    </div>
                  </Grid>
                )
            }
          </Grid>

        </div>
      }
      {
        tab === 1 && <BTable
          key={`${loading}${loadedUserDelete}${showList.length}`}
          columns={columns}
          data={showList}
          total={users.total}
          loading={loading}
        />
      }
      <BGPagination
        handlePageChange={handlePageChange}
        total={users.total}
        initPage={users.page}
        initSize={users.page_size}
      />
    </div>

    <PageNoData show={!loading && !users.total} />

  </div>;
};

export default User;