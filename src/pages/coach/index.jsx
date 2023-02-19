import { Grid, Tab, Tabs, Divider, TextField } from "@mui/material";
import React, { useState, useMemo } from "react";
import { Icon } from '@iconify/react';
import { useConfirm } from "material-ui-confirm";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';

import { VText, VAvatar, VButton } from "../../form";
import { BGPagination, BPopOver, BTable } from "../../components";
import { useAsterController } from "../../context";
import { actionCoachDelete, actionCoachList } from "../../context/action";
import { downloadCSV, downloadHTML } from "../../utils/csv";
import PageNoData from "../PageNoData";

const Coach = () => {

  const { t } = useTranslation('common');
  const confirm = useConfirm();

  const [controller, dispatch] = useAsterController();
  const { coaches, loadedAdminDashboardGet, loadedCoachList, loadedCoachDelete } = controller;
  const loading = !loadedAdminDashboardGet || !loadedCoachList;

  const [tab, setTab] = useState(1);
  const [term, setTerm] = useState('');

  const showList = useMemo(() => {
    const tmp = term.toLowerCase();
    return (coaches.data || []).filter(v => v.first_name?.toLowerCase()?.includes(tmp) || v.last_name?.toLowerCase()?.includes(tmp) || v.email?.toLowerCase()?.includes(tmp));
  }, [coaches.data, term]);

  const handleSetTabValue = (_, newValue) => setTab(newValue);

  const handlePageChange = (page, pageSize) => {
    actionCoachList(dispatch, { page, page_size: pageSize });
  };

  const onDelete = (idx) => {
    confirm({
      title: t("Are you sure?"),
      confirmationText: t("OK"),
      cancellationText: t("Cancel"),
      description: <div><Icon icon="emojione-v1:warning" />&nbsp;{t("Warning: All data of this coach will be permanently deleted!")}</div>
    })
      .then(() => actionCoachDelete(dispatch, coaches.data[idx].id, t))
      .catch(() => { });
  };

  const columns = [
    {
      name: <VText className="ml-20">{t('Name')}</VText>,
      selector: rw => `${rw.first_name} ${rw.last_name}`,
      cell: rw => <div className="flex items-center" >
        <Link to={`/user/coaches/edit/${coaches.page}/${coaches.page_size}/${rw.id}`} className="no-underline">
          <VAvatar src={rw.avatar ? rw.avatar : ""} className="w-16 h-16" />
        </Link>
        <div className="ml-4">
          <VText div>{rw.first_name} {rw.last_name}</VText>
          <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5 mt-4 w-max" div>{t('Coach')}</VText>
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
        <VText className="break-all mt-2" div>
          <Icon icon="bx:phone" className="text-gray-400 w-6" />&nbsp;{rw.phone_number || '-'}
        </VText>
      </div>,
      sortable: true,
      minWidth: '300px'
    },
    {
      name: <VText>{t('Country')}</VText>,
      selector: row => row.country,
      cell: rw => <VText>{rw.country}</VText>,
      sortable: true,
      grow: 0,
    },
    {
      name: <VText>{t('Gender')}</VText>,
      selector: row => row.gender,
      cell: rw => <VText>{rw.gender === 'm' ? t('Male') : t('Female')}</VText>,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: <VText>{t('Action')}</VText>,
      cell: (rw, idx) =>
        <BPopOver trigger={<VButton iconOnly variant="outlined" color="success"><Icon icon="eva:more-horizontal-outline" /></VButton>}>
          <div className="flex flex-col">
            <Link to={`/user/coaches/edit/${coaches.page}/${coaches.page_size}/${rw.id}`} className="no-underline">
              <VButton variant="text" className="px-5 py-1 justify-start normal-case" color="secondary">
                <Icon icon="eva:edit-outline" />&nbsp;{t('Edit')}
              </VButton>
            </Link>
            <VButton variant="text" color="warning" className="px-5 py-1 justify-start" onClick={() => onDelete(idx)}>
              <Icon icon="mi:delete" />&nbsp;{t('Delete')}
            </VButton>

          </div>
        </BPopOver>,
      grow: 0,
    },
  ];

  const exportColumns = [
    { header: t('First Name'), accessor: "first_name", type: "text" },
    { header: t('Last Name'), accessor: "last_name", type: "text" },
    { header: t('Email'), accessor: "email", type: "text" },
    { header: t('Phone Number'), accessor: "phone_number", type: "text" },
    { header: t('Gender'), accessor: "gender", type: "text" },
    { header: t("Bio"), accessor: "bio", type: "text" },
    { header: t("Country"), accessor: "country", type: "text" },
    { header: t("State"), accessor: "state", type: "text" },
    { header: t("City"), accessor: "city", type: "text" },
  ];

  return <div>
    <div className="px-6 py-8" id="v-user-title">
      <Grid container spacing={2}>
        <Grid item sm={12} md={4} className="flex">
          <VText className="text-2xl">{coaches.total}</VText>&nbsp;
          <VText color="secondary" className="text-2xl">{t('Coaches in total')}</VText>
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

          <Link to={`/user/coaches/add`} className="no-underline ml-4">
            <VButton color="primary" variant="contained" startIcon="add" size="small">
              {t('Add Coach')}
            </VButton>
          </Link>

          <BPopOver className="ml-4" trigger={
            <VButton variant="outlined" className="normal-case" size="small">
              <Icon icon="ep:setting" />&nbsp;{t('Menu')}&nbsp;
              <Icon icon="akar-icons:chevron-down" />
            </VButton>
          }>
            <div className="flex flex-col">
              <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full" onClick={() => downloadCSV(exportColumns, coaches.data, "coaches")}>
                <Icon icon="ph:file-csv" />&nbsp;{t('Export CSV')}
              </VButton>
              <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full" onClick={() => downloadHTML(exportColumns, coaches.data, "coaches")}>
                <Icon icon="ph:file-html" />&nbsp;{t('Export HTML')}
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
                    <div className="border border-solid border-gray-300 rounded-md">
                      <div className="px-4 py-2 flex items-center">
                        <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5 w-max flex items-center h-min">
                          <Icon icon="ic:outline-published-with-changes" />&nbsp;{t('Coach')}
                        </VText>

                        <BPopOver className="ml-auto" trigger={
                          <VButton iconOnly variant="outlined" color="primary">
                            <Icon icon="eva:more-horizontal-outline" />
                          </VButton>}
                        >
                          <div className="flex flex-col">
                            <VButton variant="text" color="warning" className="px-5 py-2 justify-start" onClick={() => onDelete(idx)}>
                              <Icon icon="mi:delete" />&nbsp;{t('Delete')}
                            </VButton>
                          </div>
                        </BPopOver>

                      </div>
                      <div className="p-4 flex items-center">
                        <VAvatar src={rw.avatar ? rw.avatar : ""} className="w-20 h-20" />
                        <div className="ml-4 overflow-hidden">
                          <VText className="text-limit-1" div>{rw.first_name} {rw.last_name}</VText>
                          <div className="flex items-center text-sm">
                            <VText color="secondary" className="leading-0 mr-1 flex-shrink-0" div><Icon icon="eva:email-outline" /></VText>
                            <VText color="secondary" className="mr-4 text-limit-1" div>{rw.email}</VText>
                          </div>
                          <div className="flex items-center text-sm">
                            <VText color="secondary" className="leading-0 mr-1 flex-shrink-0" div><Icon icon="heroicons-outline:identification" /></VText>
                            <VText color="secondary" className="mr-4 text-limit-1" div>{`${rw.first_name} ${rw.last_name}`}</VText>
                          </div>
                        </div>
                      </div>
                      <Divider className="bg-gray-200 dark:bg-gray-500" />
                      <div className="flex">
                        <div className="flex-1 p-4 border-0 border-r border-solid border-gray-300">
                          <VText color="primary" div className="text-sm">{t('Country')}</VText>
                          <VText className="flex items-center text-lg"><Icon icon="gis:search-country" />&nbsp;{rw.country}</VText>
                        </div>
                        <div className="flex-1 p-4">
                          <VText color="secondary" div className="text-sm">{t('Gender')}</VText>
                          <div className="flex items-center text-lg">
                            <Icon icon="ant-design:user-outlined" className="flex-shrink-0" />
                            <VText className="text-limit-1 ml-1">{rw.gender === 'm' ? t("Male") : t("Female")}</VText>
                          </div>
                        </div>
                      </div>
                      <Divider className="bg-gray-200 dark:bg-gray-500" />
                      <div className="p-4">
                        <Link to={`/user/coaches/edit/${coaches.page}/${coaches.page_size}/${coaches.data[idx].id}`} className="no-underline">
                          <VButton variant="contained" className="w-full normal-case">
                            <Icon icon="eva:edit-outline" className="text-xl" />&nbsp;{t('Edit')}
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
          key={`${loading}${loadedCoachDelete}${showList.length}`}
          columns={columns}
          data={showList}
          total={coaches.total}
          loading={loading}
        />
      }
      <BGPagination
        handlePageChange={handlePageChange}
        total={coaches.total}
        initPage={coaches.page}
        initSize={coaches.page_size}
      />
    </div>

    <PageNoData show={!loading && !coaches.total} />

  </div>;
};

export default Coach;