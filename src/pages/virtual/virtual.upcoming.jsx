import { Grid, Tab, Tabs, Divider, TextField } from "@mui/material";
import React, { useState } from "react";
import { Icon } from '@iconify/react';
import { useConfirm } from "material-ui-confirm";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';

import { VText, VAvatar, VButton } from "../../form";
import { BGPagination, BPopOver, BTable } from "../../components";
import { useAsterController } from "../../context";
import { actionZoomMeetingDelete, actionZoomMeetingList } from "../../context/action";
import { getShortDate, getShortTime } from '../../utils/string';
import { downloadCSV, downloadHTML } from "../../utils/csv";
import PageNoData from "../PageNoData";
import { useMemo } from "react";

const VirtualUpcoming = () => {

  const { t } = useTranslation('common');
  const confirm = useConfirm();

  const [controller, dispatch] = useAsterController();
  const { zoomMeetings, loadedAdminDashboardGet, loadedZoomMeetingList, loadedZoomMeetingDelete } = controller;
  const loading = !loadedAdminDashboardGet || !loadedZoomMeetingList;

  const [tab, setTab] = useState(0);
  const [term, setTerm] = useState('');

  const showList = useMemo(() => {
    const tmp = term.toLowerCase();
    return (zoomMeetings.data || []).filter(v => v.topic?.toLowerCase()?.includes(tmp) || v.first_name?.toLowerCase()?.includes(tmp) || v.last_name?.toLowerCase()?.includes(tmp) || v.description?.toLowerCase()?.includes(tmp));
  }, [zoomMeetings.data, term]);

  const handleSetTabValue = (_, newValue) => setTab(newValue);
  const handlePageChange = (page, pageSize) => actionZoomMeetingList(dispatch, { page, page_size: pageSize });

  const onDelete = (idx) => {
    confirm({
      title: t("Are you sure?"),
      confirmationText: t("OK"),
      cancellationText: t("Cancel"),
      description: t("Are you going to delete this item?")
    })
      .then(() => actionZoomMeetingDelete(dispatch, zoomMeetings.data[idx].id, t))
      .catch(() => { });
  };

  const columns = [
    {
      name: <VText>{t("Tutor")}</VText>,
      selector: rw => rw.first_name || rw.username,
      cell: rw => <div className="flex items-center" >
        <VAvatar src={rw.avatar ? rw.avatar : ""} />
        <div className="ml-4">
          <VText div>{rw.first_name} {rw.last_name}</VText>
        </div>
      </div>,
      grow: 1,
      sortable: true,
      minWidth: '220px'
    },
    {
      name: <VText>{t('Topic')}</VText>,
      selector: row => row.topic,
      cell: rw => <VText>{rw.topic}</VText>,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: <VText>{t('Description')}</VText>,
      selector: row => row.description,
      cell: rw => <VText>{rw.description}</VText>,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: <VText>{t('Total courses')}</VText>,
      selector: row => row.course_ids?.length,
      cell: rw => <VText>{rw.course_ids?.length || 0}</VText>,
      sortable: true,
      grow: 0,
    },
    {
      name: <VText>{t('Start Time')}</VText>,
      selector: row => row.start_time,
      cell: rw => <VText>{getShortDate(rw.start_time)} {getShortTime(rw.start_time)}</VText>,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: <VText>{t('Duration')}</VText>,
      selector: row => row.duration,
      cell: rw => <VText>{rw.duration}</VText>,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: <VText>{t('Action')}</VText>,
      cell: (rw, idx) =>
        <BPopOver trigger={<VButton iconOnly variant="outlined" color="success"><Icon icon="eva:more-horizontal-outline" /></VButton>}>
          <div className="flex flex-col">
            <Link to={`/catalog/virtual/edit/${zoomMeetings.page}/${zoomMeetings.page_size}/${rw.id}`} className="no-underline">
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
    { header: t("Topic"), accessor: "topic", type: "text" },
    { header: t("Description"), accessor: "description", type: "text" },
    { header: t("Start Time"), accessor: "start_time", type: "date" },
    { header: t("Duration"), accessor: "duration", type: "text" },
    { header: t("Start Url"), accessor: "start_url", type: "text" },
    { header: t("Join url"), accessor: "join_url", type: "text" },
    { header: t("Tutor"), accessor: "first_name", type: "text" },
  ];

  return <div>

    <div className="px-6 py-8" id="v-user-title">
      <Grid container spacing={2}>
        <Grid item sm={12} md={4} className="flex">
          <VText className="text-2xl">{zoomMeetings.total}</VText>&nbsp;
          <VText color="secondary" className="text-2xl">{t('Sessions in total')}</VText>
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

          <Link to={`/catalog/virtual/add`} className="no-underline ml-4">
            <VButton color="primary" variant="contained" startIcon="add" size="small">
              {t('Add Session')}
            </VButton>
          </Link>

          <BPopOver className="ml-4" trigger={
            <VButton variant="outlined" className="normal-case" size="small">
              <Icon icon="ep:setting" />&nbsp;{t('Menu')}&nbsp;
              <Icon icon="akar-icons:chevron-down" />
            </VButton>
          }>
            <div className="flex flex-col">
              <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full" onClick={() => downloadCSV(exportColumns, zoomMeetings.data, 'Zoom meeting')}>
                <Icon icon="ph:file-csv" />&nbsp;{t("Export CSV")}
              </VButton>
              <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full" onClick={() => downloadHTML(exportColumns, zoomMeetings.data, 'Zoom meeting')}>
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
                    <div className="border border-solid border-gray-300 rounded-md">
                      <div className="px-4 py-2 flex items-center">
                        <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5 w-max flex items-center h-min">
                          <Icon icon="ic:outline-published-with-changes" />&nbsp;{t('Session')}
                        </VText>

                        <BPopOver className="ml-auto" trigger={
                          <VButton iconOnly variant="outlined" color="primary">
                            <Icon icon="eva:more-horizontal-outline" />
                          </VButton>}
                        >
                          <div className="flex flex-col">
                            <Link to={`/catalog/virtual/edit/${zoomMeetings.page}/${zoomMeetings.page_size}/${rw.id}`} className="no-underline">
                              <VButton variant="text" className="px-5 py-1 justify-start normal-case w-full" color="secondary">
                                <Icon icon="eva:edit-outline" />&nbsp;{t('Edit')}
                              </VButton>
                            </Link>
                            <VButton variant="text" color="warning" className="px-5 py-2 justify-start w-full" onClick={() => onDelete(idx)}>
                              <Icon icon="mi:delete" />&nbsp;{t('Delete')}
                            </VButton>
                          </div>
                        </BPopOver>

                      </div>
                      <div className="p-4 flex items-center">
                        <VAvatar src={rw.avatar || ""} className="w-20 h-20" />
                        <div className="ml-4 overflow-hidden">
                          <VText className="text-limit-1" div>{rw.topic}</VText>
                          <VText color="secondary" className="mr-4 text-limit-1 text-sm" div>{rw.description}</VText>
                          <div className="flex items-center text-sm">
                            <VText color="secondary" className="leading-0 mr-1 flex-shrink-0" div><Icon icon="heroicons-outline:identification" /></VText>
                            <VText color="secondary" className="mr-4 text-limit-1" div>{getShortDate(rw.start_time)}-{getShortTime(rw.start_time)} {rw.duration} min</VText>
                          </div>
                        </div>
                      </div>
                      <Divider className="bg-gray-200 dark:bg-gray-500" />
                      <div className="flex">
                        <div className="flex-1 p-4 border-0 border-r border-solid border-gray-300">
                          <VText color="primary" div className="text-sm">{t('Tutor')}</VText>
                          <VText className="flex items-center text-lg"><Icon icon="bi:check-circle" />&nbsp;{rw.first_name} {rw.last_name}</VText>
                        </div>
                        <div className="flex-1 p-4">
                          <VText color="secondary" div className="text-sm">{t('Courses')}</VText>
                          <div className="flex items-center text-lg">
                            <Icon icon="ci:group" className="flex-shrink-0" />
                            <VText className="text-limit-1 ml-1">{rw.courses?.length || 0}</VText>
                          </div>
                        </div>
                      </div>
                      <Divider className="bg-gray-200 dark:bg-gray-500" />
                      <div className="p-4">
                        <a target="_blank" href={rw.start_url} className="no-underline" rel="noreferrer">
                          <VButton variant="contained" className="w-full normal-case">
                            <Icon icon="eva:edit-outline" className="text-xl" />&nbsp;{t('Join')}
                          </VButton>
                        </a>
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
          key={`${loading}${loadedZoomMeetingDelete}${showList.length}`}
          columns={columns}
          data={showList}
          total={zoomMeetings.total}
          loading={loading}
        />
      }
      <BGPagination
        handlePageChange={handlePageChange}
        total={zoomMeetings.total}
        initPage={zoomMeetings.page}
        initSize={zoomMeetings.page_size}
      />
    </div>

    <PageNoData show={!loading && !zoomMeetings.total} />

  </div>;
};

export default VirtualUpcoming;