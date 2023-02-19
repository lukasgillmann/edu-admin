import { Grid, Tab, Tabs, Divider, TextField } from "@mui/material";
import React, { useState, useMemo } from "react";
import { Icon } from '@iconify/react';
import { useConfirm } from "material-ui-confirm";
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';

import { VText, VAvatar, VButton } from "../../form";
import { BGPagination, BModal, BPopOver, BTable } from "../../components";
import { useAsterController } from "../../context";
import { actionReviewDelete, actionReviewList } from "../../context/action";
import { downloadCSV, downloadHTML } from "../../utils/csv";
import { getFormatDate } from "../../utils/string";
import ReviewView from "./review.view";
import PageNoData from "../PageNoData";

const Review = () => {

  const { t, i18n } = useTranslation('common');
  const confirm = useConfirm();

  const [controller, dispatch] = useAsterController();
  const { reviews, loadedAdminDashboardGet, loadedReviewList } = controller;
  const loading = !loadedAdminDashboardGet || !loadedReviewList;

  const [tab, setTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(false);
  const [term, setTerm] = useState('');

  const showList = useMemo(() => {
    const tmp = term.toLowerCase();
    return (reviews.data || []).filter(v => v.first_name?.toLowerCase()?.includes(tmp) || v.author_fullname?.toLowerCase()?.includes(tmp));
  }, [reviews.data, term]);

  const handleSetTabValue = (_, newValue) => setTab(newValue);
  const handlePageChange = (page, pageSize) => actionReviewList(dispatch, { page, page_size: pageSize });

  const onView = (idx) => {
    setReviewIdx(idx);
    setModalOpen(true);
  };

  const onDelete = (idx) => {
    confirm({
      title: t("Are you sure?"),
      confirmationText: t("OK"),
      cancellationText: t("Cancel"),
      description: t("Are you going to delete this item?")
    })
      .then(() => {
        actionReviewDelete(dispatch, reviews.data[idx].id, t);
      })
      .catch(() => { });
  };

  const columns = [
    {
      name: <VText>{t('Tutor')}</VText>,
      selector: rw => rw.first_name || rw.username,
      cell: rw => <div className="flex items-center" >
        <VAvatar src={rw.avatar} />
        <div className="ml-4">
          <VText div>{rw.author_fullname}</VText>
        </div>
      </div>,
      grow: 1,
      sortable: true,
      minWidth: '220px'
    },
    {
      name: <VText>{t('Body')}</VText>,
      selector: row => row.content,
      cell: rw => <VText className="text-limit-2" div>{rw.content}</VText>,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: <VText>{t('Course')}</VText>,
      selector: row => row.course_title,
      cell: rw => <VText className="text-limit-2" div>{rw.course_title}</VText>,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: <VText>{t('Section')}</VText>,
      selector: row => row.section_title,
      cell: rw => <VText className="text-limit-2" div>{rw.section_title}</VText>,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: <VText>{t('Sequence')}</VText>,
      selector: row => row.sequence_title,
      cell: rw => <VText className="text-limit-2" div>{rw.sequence_title}</VText>,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: <VText>{t('Vertical')}</VText>,
      selector: row => row.vertical_title,
      cell: rw => <VText className="text-limit-2" div>{rw.vertical_title}</VText>,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: <VText>{t('Created')}</VText>,
      selector: row => row.created,
      cell: rw => <VText>{getFormatDate(rw.created, i18n.language)}</VText>,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: <VText>{t('Action')}</VText>,
      cell: (rw, idx) =>
        <BPopOver trigger={<VButton iconOnly variant="outlined" color="success"><Icon icon="eva:more-horizontal-outline" /></VButton>}>
          <div className="flex flex-col">
            <VButton variant="text" color="primary" className="px-5 py-1 justify-start" onClick={() => onView(idx)}>
              <Icon icon="akar-icons:eye" className="text-xl" />&nbsp;{t('View')}
            </VButton>
            <VButton variant="text" color="warning" className="px-5 py-1 justify-start" onClick={() => onDelete(idx)}>
              <Icon icon="mi:delete" />&nbsp;{t('Delete')}
            </VButton>
          </div>
        </BPopOver>,
      grow: 0,
    }
  ];

  const exportColumns = [
    { header: t("Author"), accessor: "avatar", type: "img" },
    { header: t("Username"), accessor: "author_fullname", type: "text" },
    { header: t("Content"), accessor: "content", type: "text" },
    { header: t("Course"), accessor: "course", type: "text" },
    { header: t("Section"), accessor: "section_title", type: "text" },
    { header: t("Sequence"), accessor: "sequence_title", type: "text" },
    { header: t("Vertical"), accessor: "vertical_title", type: "text" },
    { header: t("Created"), accessor: "created", type: "date" },
  ];

  return <div>

    <BModal open={modalOpen} setOpen={setModalOpen} width='90vw' height='fit-content' className="w-full max-w-xl max-h-150">
      <ReviewView reviewIdx={reviewIdx} setModalOpen={setModalOpen} />
    </BModal>

    <div className="px-6 py-8" id="v-user-title">
      <Grid container spacing={2}>
        <Grid item sm={12} md={4} className="flex">
          <VText className="text-2xl">{reviews.total}</VText>&nbsp;
          <VText color="secondary" className="text-2xl">{t('Reviews in total')}</VText>
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

          <BPopOver className="ml-4" trigger={
            <VButton variant="outlined" className="normal-case" size="small">
              <Icon icon="ep:setting" />&nbsp;{t('Menu')}&nbsp;
              <Icon icon="akar-icons:chevron-down" />
            </VButton>
          }>
            <div className="flex flex-col">
              <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full" onClick={() => downloadCSV(exportColumns, reviews.data, "reviews")}>
                <Icon icon="ph:file-csv" />&nbsp;{t('Export CSV')}
              </VButton>
              <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full" onClick={() => downloadHTML(exportColumns, reviews.data, "reviews")}>
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
                          <Icon icon="ic:outline-published-with-changes" />&nbsp;{t(rw.permission)}
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
                      <div className="relative">
                        {
                          rw.cover ? <div className="w-full aspect-[5/2] bg-cover bg-center bg-gray-100 dark:bg-gray-700" style={{ backgroundImage: `url(${rw.cover})` }} /> :
                            <div className="w-full aspect-[5/2] bg-cover bg-center bg-gray-100 dark:bg-gray-700" style={{ backgroundImage: `url(${process.env.REACT_APP_S3_ASSET_ENDPOINT + '/v2-assets/default-cover-' + ((rw.author_username?.charCodeAt(0) || 0) % 3 + 1) + '.png'})` }} />
                        }
                        <VAvatar src={rw.avatar} className="w-24 h-24 absolute -bottom-9 left-3" />
                      </div>
                      <div className="p-4">
                        <VText className="text-limit-1 ml-24">{rw.author_fullname || '-'}</VText>
                        <div className="flex flex-wrap mt-4">
                          <VText color="secondary" className="text-sm mr-4 text-limit-1" div>{rw.content || '-'}</VText>
                        </div>
                      </div>
                      <Divider className="bg-gray-200 dark:bg-gray-500" />
                      <div className="flex">
                        <div className="flex-1 p-4 border-0 border-r border-solid border-gray-300">
                          <VText color="primary" div className="text-sm">{t('Course')}</VText>
                          <VText className="text-sm text-limit-1" div>{rw.course_title}</VText>
                        </div>
                        <div className="flex-1 p-4">
                          <VText color="secondary" div className="text-sm">{t('Created')}</VText>
                          <div className="flex items-center text-lg">
                            <Icon icon="ci:group" className="flex-shrink-0" />
                            <VText className="text-limit-1 ml-1">{getFormatDate(rw.created, i18n.language)}</VText>
                          </div>
                        </div>
                      </div>
                      <Divider className="bg-gray-200 dark:bg-gray-500" />
                      <div className="p-4">
                        <VButton variant="contained" className="w-full normal-case" onClick={() => onView(idx)}>
                          <Icon icon="akar-icons:eye" className="text-xl" />&nbsp;{t('View')}
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
          key={`${loading}${showList.length}`}
          columns={columns}
          data={showList}
          total={reviews.total}
          loading={loading}
        />
      }
      <BGPagination
        handlePageChange={handlePageChange}
        total={reviews.total}
        initPage={reviews.page}
        initSize={reviews.page_size}
      />
    </div>

    <PageNoData show={!loading && !reviews.total} />

  </div>;
};

export default Review;