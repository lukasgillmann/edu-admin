import { Grid, Tab, Tabs, Divider, TextField } from "@mui/material";
import React, { useState, useMemo } from "react";
import { Icon } from '@iconify/react';
import { useConfirm } from "material-ui-confirm";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';

import { VText, VButton } from "../../form";
import { BGPagination, BPopOver, BTable } from "../../components";
import { useAsterController } from "../../context";
import { actionPhysicalSessionDelete, actionPhysicalSessionList } from "../../context/action";
import { downloadCSV, downloadHTML } from "../../utils/csv";
import PageNoData from "../PageNoData";
import { getFormatDate } from "../../utils/string";

const PhysicalSession = () => {

  const { t, i18n } = useTranslation('common');
  const confirm = useConfirm();

  const [controller, dispatch] = useAsterController();
  const { physicalSessions, loadedAdminDashboardGet, loadedPhysicalSessions, loadedPhysicalSessionDelete } = controller;
  const loading = !loadedAdminDashboardGet || !loadedPhysicalSessions;

  const [tab, setTab] = useState(0);
  const [term, setTerm] = useState('');

  const showList = useMemo(() => {
    const tmp = term.toLowerCase();
    return (physicalSessions.data || []).filter(v => v.coach_name?.toLowerCase()?.includes(tmp) || v.email?.toLowerCase()?.includes(tmp));
  }, [physicalSessions.data, term]);

  const handleSetTabValue = (_, newValue) => setTab(newValue);
  const handlePageChange = (page, pageSize) => actionPhysicalSessionList(dispatch, { page, page_size: pageSize });

  const onDelete = (idx) => {
    confirm({
      title: t("Are you sure?"),
      confirmationText: t("OK"),
      cancellationText: t("Cancel"),
      description: t("Are you going to delete this item?")
    })
      .then(() => actionPhysicalSessionDelete(dispatch, physicalSessions.data[idx].id, t))
      .catch(() => { });
  };

  const columns = [
    {
      name: <VText>{t('Coach Name')}</VText>,
      selector: rw => rw.coach_name,
      cell: rw => <div className="flex items-center" >
        <VText div>{rw.coach_name}</VText>
        <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5">{t("Physical Session")}</VText>
      </div>,
      grow: 1,
      sortable: true,
      minWidth: '220px'
    },
    {
      name: <VText>{t("Subject")}</VText>,
      selector: row => row.subject,
      cell: rw => <VText div>{rw.subject}</VText>,
      sortable: true,
      minWidth: '300px'
    },
    {
      name: <VText>{t("Program")}</VText>,
      selector: row => row.program,
      cell: rw => <VText>{rw.program}</VText>,
      sortable: true,
    },
    {
      name: <VText>{t("Location")}</VText>,
      selector: row => row.location,
      cell: rw => <VText>{rw.location}</VText>,
      sortable: true,
    },
    {
      name: <VText>{t("Total Users")}</VText>,
      selector: row => row.total_assigned,
      cell: rw => <VText>{rw.total_assigned}</VText>,
      sortable: true,
    },
    {
      name: <VText>{t("Start")}</VText>,
      selector: row => row.start,
      cell: rw => <VText>{getFormatDate(rw.start, i18n.language)}</VText>,
      sortable: true,
    },
    {
      name: <VText>{t("Action")}</VText>,
      cell: (rw, idx) =>
        <BPopOver trigger={<VButton iconOnly variant="outlined" color="success"><Icon icon="eva:more-horizontal-outline" /></VButton>}>
          <div className="flex flex-col">
            <Link to={`/catalog/physical-session/detail/${physicalSessions.page}/${physicalSessions.page_size}/${rw.id}`} className="no-underline">
              <VButton variant="text" className="px-5 py-1 justify-start normal-case" color="secondary">
                <Icon icon="akar-icons:eye" className="text-xl" />&nbsp;{t("View")}
              </VButton>
            </Link>
            <VButton variant="text" color="warning" className="px-5 py-1 justify-start" onClick={() => onDelete(idx)}>
              <Icon icon="mi:delete" />&nbsp;{t("Delete")}
            </VButton>

          </div>
        </BPopOver>,
      grow: 0,
    },
  ];

  const exportColumns = [
    { header: t('Coach Name'), accessor: "coach_name", type: "text" },
    { header: t('Subject'), accessor: "subject", type: "text" },
    { header: t('Program'), accessor: "program", type: "text" },
    { header: t('Location'), accessor: "location", type: "text" },
    { header: t('Total Users'), accessor: "total_assigned", type: "text" },
    { header: t('Start'), accessor: "start", type: "text" },
  ];

  return <div>
    <div className="px-6 py-8" id="v-user-title">
      <Grid container spacing={2}>
        <Grid item sm={12} md={4} className="flex">
          <VText className="text-2xl">{physicalSessions.total}</VText>&nbsp;
          <VText color="secondary" className="text-2xl">{t("Sessions in total")}</VText>
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

          <Link to={`/catalog/physical-session/add`} className="no-underline ml-4">
            <VButton color="primary" variant="contained" startIcon="add" size="small">
              {t("Add Session")}
            </VButton>
          </Link>

          <BPopOver className="ml-4" trigger={
            <VButton variant="outlined" className="normal-case" size="small">
              <Icon icon="ep:setting" />&nbsp;{t("Menu")}&nbsp;
              <Icon icon="akar-icons:chevron-down" />
            </VButton>
          }>
            <div className="flex flex-col">
              <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full" onClick={() => downloadCSV(exportColumns, physicalSessions.data, "physicalSessions")}>
                <Icon icon="ph:file-csv" />&nbsp;{t("Export CSV")}
              </VButton>
              <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full" onClick={() => downloadHTML(exportColumns, physicalSessions.data, "physicalSessions")}>
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
                [...Array(12).keys()].map(v => <Grid key={v} item xs={12} sm={6} lg={4} xl={3}>
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
                          <Icon icon="ic:outline-published-with-changes" />&nbsp;{t("Physical Session")}
                        </VText>

                        <BPopOver className="ml-auto" trigger={
                          <VButton iconOnly variant="outlined" color="primary">
                            <Icon icon="eva:more-horizontal-outline" />
                          </VButton>}
                        >
                          <div className="flex flex-col">
                            <VButton variant="text" color="warning" className="px-5 py-2 justify-start" onClick={() => onDelete(idx)}>
                              <Icon icon="mi:delete" />&nbsp;{t("Delete")}
                            </VButton>
                          </div>
                        </BPopOver>

                      </div>
                      <div className="p-4">
                        <div className="flex items-center text-limit-1">
                          <VText color="secondary" className="flex items-center" div>
                            <Icon icon="ant-design:user-outlined" className="flex-shrink-0" />&nbsp;{rw.coach_name}
                          </VText>
                        </div>
                        <div className="flex items-center text-limit-1 mt-4">
                          <VText color="secondary" className="flex items-center" div>
                            <Icon icon="ic:outline-topic" className="flex-shrink-0" />&nbsp;{rw.subject}
                          </VText>
                        </div>
                        <div className="flex items-center text-limit-1 mt-4">
                          <VText color="secondary" className="flex items-center" div>
                            <Icon icon="material-symbols:energy-program-saving" className="flex-shrink-0" />&nbsp;{rw.program}
                          </VText>
                        </div>
                        <div className="flex items-center text-limit-1 mt-4">
                          <VText color="secondary" className="flex items-center" div>
                            <Icon icon="akar-icons:calendar" className="flex-shrink-0" />&nbsp;{getFormatDate(rw.start, i18n.language)}
                          </VText>
                        </div>
                      </div>
                      <Divider className="bg-gray-200 dark:bg-gray-500" />
                      <div className="flex">
                        <div className="flex-1 p-4 border-0 border-r border-solid border-gray-300">
                          <VText color="primary" div className="text-sm">{t("Total Users")}</VText>
                          <VText className="flex items-center text-lg"><Icon icon="majesticons:users-line" className="flex-shrink-0" />&nbsp;{rw.total_assigned}</VText>
                        </div>
                        <div className="flex-1 p-4">
                          <VText color="secondary" div className="text-sm">{t("Location")}</VText>
                          <div className="flex items-center text-lg">
                            <Icon icon="ci:location" className="flex-shrink-0" />
                            <VText className="text-limit-1 ml-1">{rw.location}</VText>
                          </div>
                        </div>
                      </div>
                      <Divider className="bg-gray-200 dark:bg-gray-500" />
                      <div className="p-4">
                        <Link to={`/catalog/physical-session/detail/${physicalSessions.page}/${physicalSessions.page_size}/${physicalSessions.data[idx].id}`} className="no-underline">
                          <VButton variant="contained" className="w-full normal-case">
                            <Icon icon="akar-icons:eye" className="text-xl" />&nbsp;{t('View')}
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
          key={`${loading}${loadedPhysicalSessionDelete}${showList.length}`}
          columns={columns}
          data={showList}
          total={physicalSessions.total}
          loading={loading}
        />
      }
      <BGPagination
        handlePageChange={handlePageChange}
        total={physicalSessions.total}
        initPage={physicalSessions.page}
        initSize={physicalSessions.page_size}
      />
    </div>

    <PageNoData show={!loading && !physicalSessions.total} />

  </div>;
};

export default PhysicalSession;