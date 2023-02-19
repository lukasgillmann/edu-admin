import { Grid, Tab, Tabs, Divider } from "@mui/material";
import React, { useState, useMemo } from "react";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';

import { VText, VAvatar, VButton, VInput } from "../../form";
import { BGPagination, BPopOver, BTable } from "../../components";
import { useAsterController } from "../../context";
import { actionEmailLogList } from "../../context/action";
import { EMAIL_TYPES, getFormatDate } from '../../utils/string';
import { downloadCSV, downloadHTML } from "../../utils/csv";
import PageNoData from "../PageNoData";

const EmailLogs = () => {

  const { t, i18n } = useTranslation('common');

  const [controller, dispatch] = useAsterController();
  const { emailLogs, loadedAdminDashboardGet, loadedEmailLogList, loadedEmailLogDelete } = controller;
  const loading = !loadedAdminDashboardGet || !loadedEmailLogList;

  const [tab, setTab] = useState(1);
  const [term, setTerm] = useState('');

  const showList = useMemo(() => {
    const tmp = term.toLowerCase();
    return (emailLogs.data || []).filter(v => v.fullname?.toLowerCase()?.includes(tmp) || v.to?.toLowerCase()?.includes(tmp) || v.type?.toLowerCase()?.includes(tmp));
  }, [emailLogs.data, term]);

  const handleSetTabValue = (_, newValue) => setTab(newValue);
  const handlePageChange = (page, pageSize) => actionEmailLogList(dispatch, { page, page_size: pageSize });

  const columns = [
    {
      name: <VText>{t('Avatar')}</VText>,
      selector: rw => rw.fullname,
      cell: rw => <div className="flex items-center" >
        <VAvatar src={rw.avatar} />
        <div className="ml-4">
          <VText div>{rw.fullname}</VText>
          <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5">{t(rw.permission)}</VText>
        </div>
      </div>,
      grow: 1,
      sortable: true,
      minWidth: '220px'
    },
    {
      name: <VText>{t('Contact')}</VText>,
      selector: row => row.to,
      cell: rw => <VText className="break-all flex items-center" div>
        <Icon icon="eva:email-outline" className="text-gray-400 w-6 flex-shrink-0" />&nbsp;{rw.to}
      </VText>,
      sortable: true,
      minWidth: '300px'
    },
    {
      name: <VText>{t('Type')}</VText>,
      selector: row => row.type,
      cell: rw => <VText>{t(EMAIL_TYPES[rw.type])}</VText>,
      sortable: true,
      minWidth: '200px'
    },
    {
      name: <VText>{t('Sending Date')}</VText>,
      selector: row => row.time,
      cell: rw => <VText>{getFormatDate(rw.time, i18n.language)}</VText>,
      sortable: true,
      minWidth: '150px'
    }
  ];

  const exportColumns = [
    { header: t("Type"), accessor: "type", type: "text" },
    { header: t("Email"), accessor: "to", type: "text" },
    { header: t("Username"), accessor: "fullname", type: "text" },
    { header: t("Permission"), accessor: "permission", type: "text" },
    { header: t("Time"), accessor: "time", type: "date" },
  ];

  return <div>

    <div className="p-4 md:p-8">
      <VText className="text-2xl" div>{t('History')}</VText>
      <VText color="secondary">{t('Email logs list')}</VText>
    </div>
    <div className="bg-gray-50 dark:bg-gray-700 w-full flex-wrap flex py-3 px-8 items-center">
      <VInput startIcon="search" size="small" className="m-1 w-full sm:w-max" inputClassName="pt-1 py-1 mt-px" value={term} setValue={val => setTerm(val)} />
      <div className="flex m-1">
        <VButton variant="outlined" color="secondary" size="normal" className="text-sm normal-case">
          <Icon icon="ant-design:filter-filled" />&nbsp;{t('Filter')}
        </VButton>
      </div>


      <div className="h-8 ml-auto v-tab-switch flex">
        <Tabs orientation="horizontal" value={tab} onChange={handleSetTabValue}>
          <Tab icon={<Icon className="mr-0" icon="akar-icons:grid" />} />
          <Tab icon={<Icon className="mr-0" icon="ci:list-checklist" />} />
        </Tabs>

        <BPopOver className="ml-4" trigger={
          <VButton variant="outlined" className="normal-case" size="small">
            <Icon icon="ep:setting" />&nbsp;{t('Menu')}&nbsp;
            <Icon icon="akar-icons:chevron-down" />
          </VButton>
        }>
          <div className="flex flex-col">
            <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full" onClick={() => downloadCSV(exportColumns, emailLogs.data || [], "emailLogs")}>
              <Icon icon="ph:file-csv" />&nbsp;{t('Export CSV')}
            </VButton>
            <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full" onClick={() => downloadHTML(exportColumns, emailLogs.data || [], "emailLogs")}>
              <Icon icon="ph:file-html" />&nbsp;{t('Export HTML')}
            </VButton>
          </div>
        </BPopOver>

      </div>
    </div>

    <div>
      {
        tab === 0 && <div className="px-4 py-4 md:px-8 md:pb-8">
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
                  <Grid key={rw._id} item xs={12} sm={6} lg={4} xl={3}>
                    <div className="border border-solid border-gray-300 rounded-md">
                      <div className="px-4 py-3 flex items-center">
                        <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5 w-max flex items-center h-min">
                          <Icon icon="ic:outline-published-with-changes" />&nbsp;{t(rw.permission)}
                        </VText>
                      </div>
                      <div className="relative">
                        {
                          rw.cover ? <div className="w-full aspect-[5/2] bg-cover bg-center bg-gray-100 dark:bg-gray-700" style={{ backgroundImage: `url(${rw.cover})` }} /> :
                            <div className="w-full aspect-[5/2] bg-cover bg-center bg-gray-100 dark:bg-gray-700" style={{ backgroundImage: `url(${process.env.REACT_APP_S3_ASSET_ENDPOINT + '/v2-assets/default-cover-' + ((rw.author_username?.charCodeAt(0) || 0) % 3 + 1) + '.png'})` }} />
                        }
                        <VAvatar src={rw.avatar} className="w-24 h-24 absolute -bottom-9 left-3" />
                      </div>
                      <div className="p-4">
                        <VText className="text-limit-1 ml-24">{rw.fullname}</VText>
                        <div className="flex flex-wrap mt-4">
                          <VText color="secondary" className="flex items-center text-sm mr-4">
                            <Icon icon="bx:user-circle" />&nbsp;
                            {rw.to}
                          </VText>
                        </div>
                      </div>
                      <Divider className="bg-gray-200 dark:bg-gray-500" />
                      <div className="flex">
                        <div className="flex-1 p-4 border-0 border-r border-solid border-gray-300">
                          <VText color="primary" div className="text-sm">{t('Type')}</VText>
                          <VText className="flex items-center text-base"><Icon icon="bi:check-circle" />&nbsp;{t(EMAIL_TYPES[rw.type])}</VText>
                        </div>
                        <div className="flex-1 p-4 text-limit-1">
                          <VText color="secondary" div className="text-sm">{t('Time')}</VText>
                          <div className="flex items-center text-lg">
                            <Icon icon="ci:group" className="flex-shrink-0" />
                            <VText className="text-limit-1 ml-1">{getFormatDate(rw.time, i18n.language)}</VText>
                          </div>
                        </div>
                      </div>
                      <Divider className="bg-gray-200 dark:bg-gray-500" />
                      <div className="p-4">
                        <VButton variant="contained" color="primary" className="px-5 py-2 w-full" disabled>
                          <Icon icon="mi:delete" />&nbsp;{t('Delete')}
                        </VButton>
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
          key={`${loading}${loadedEmailLogDelete}${showList.length}`}
          columns={columns}
          data={showList}
          total={emailLogs.total}
          loading={loading}
        />
      }
      <BGPagination
        handlePageChange={handlePageChange}
        total={emailLogs.total}
        initPage={emailLogs.page}
        initSize={emailLogs.page_size}
      />
    </div>

    <PageNoData show={!loading && !emailLogs.total} />

  </div>;
};

export default EmailLogs;