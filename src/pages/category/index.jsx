import { Grid, Tab, Tabs, Divider, TextField } from "@mui/material";
import React, { useState, useMemo } from "react";
import { Icon } from '@iconify/react';
import { useConfirm } from "material-ui-confirm";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';

import { VButton, VText, } from "../../form";
import { BGPagination, BModal, BPopOver, BTable } from "../../components";

import { useAsterController } from "../../context";
import { actionCategoryDelete, actionCategoryList } from "../../context/action";
import { getFormatDate } from "../../utils/string";
import { downloadCSV, downloadHTML } from "../../utils/csv";
import CategoryAdd from "./category.add";
import PageNoData from "../PageNoData";

const Category = () => {

  const { t, i18n } = useTranslation('common');
  const confirm = useConfirm();

  const [controller, dispatch] = useAsterController();
  const { categories, loadedAdminDashboardGet, loadedCategoryList, loadedCategoryDelete } = controller;
  const loading = !loadedAdminDashboardGet || !loadedCategoryList;

  const [tab, setTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [term, setTerm] = useState('');

  const showList = useMemo(() => {
    const tmp = term.toLowerCase();
    return (categories.data || []).filter(v => v.name?.toLowerCase()?.includes(tmp));
  }, [categories.data, term]);

  const handleSetTabValue = (_, newValue) => setTab(newValue);

  const handlePageChange = (page, pageSize) => {
    actionCategoryList(dispatch, { page, page_size: pageSize });
  };

  const onDelete = (idx) => {
    confirm({
      title: t("Are you sure?"),
      confirmationText: t("OK"),
      cancellationText: t("Cancel"),
      description: <div><Icon icon="emojione-v1:warning" />&nbsp;{t("Warning: All data in this category will be permanently deleted!")}</div>
    })
      .then(() => actionCategoryDelete(dispatch, categories.data[idx].id, t))
      .catch(() => { });
  };

  const columns = [
    {
      name: <VText>{t('Category Name')}</VText>,
      selector: row => row.name,
      cell: rw => <VText>{rw.name}</VText>,
      grow: 2,
      sortable: true,
      minWidth: '350px'
    },
    {
      name: <VText>{t('Learning Program')}</VText>,
      selector: row => row.courses.length,
      cell: rw => <VText>{rw.courses.length} {('Program')}</VText>,
      sortable: true,
      minWidth: '120px'
    },
    {
      name: <VText>{t('Date Created')}</VText>,
      selector: row => row.created,
      cell: rw => <VText>{getFormatDate(rw.created, i18n.language)}</VText>,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: <VText>{t('Action')}</VText>,
      cell: (rw, idx) => <div className="flex">
        <BPopOver trigger={<VButton iconOnly variant="outlined" color="success"><Icon icon="eva:more-horizontal-outline" /></VButton>}>
          <div className="flex flex-col">
            <Link to={`/catalog/category/detail/${categories.page}/${categories.page_size}/${rw.id}`} className="no-underline">
              <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full">
                <Icon icon="akar-icons:eye" />&nbsp;{t('View')}
              </VButton>
            </Link>
            <VButton variant="text" color="warning" className="px-4 py-1 justify-start w-full" onClick={() => onDelete(idx)}>
              <Icon icon="mi:delete" />&nbsp;{t('Delete')}
            </VButton>
          </div>
        </BPopOver>
      </div>,
      width: '100px'
    },
  ];

  const exportColumns = [
    { header: t('Category Name'), accessor: "name", type: "text" },
    { header: t('Date Created'), accessor: "created", type: "text" }
  ];

  return <div>

    <BModal open={modalOpen} setOpen={setModalOpen} width='90vw' height='fit-content' className="w-full max-w-xl max-h-150" >
      <CategoryAdd setOpen={setModalOpen} />
    </BModal>

    <div className="px-6 py-8" id="v-user-title">
      <Grid container spacing={2}>
        <Grid item sm={12} md={4} className="flex">
          <VText className="text-2xl">{categories.total || 0}</VText>&nbsp;
          <VText color="secondary" className="text-2xl">{t("Categories in total")}</VText>
        </Grid>
        <Grid item sm={12} md={8} className="flex justify-center items-center md:justify-end flex-wrap">
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

          <VButton color="primary" variant="contained" startIcon="add" size="small" className="no-underline ml-4" onClick={() => setModalOpen(true)}>
            {t("Add Category")}
          </VButton>

          <BPopOver className="ml-4" trigger={
            <VButton variant="outlined" className="normal-case" size="small">
              <Icon icon="ep:setting" />&nbsp;{t("Menu")}&nbsp;
              <Icon icon="akar-icons:chevron-down" />
            </VButton>
          }>
            <div className="flex flex-col">
              <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full" onClick={() => downloadCSV(exportColumns, categories.data, "categories")}>
                <Icon icon="ph:file-csv" />&nbsp;{t("Export CSV")}
              </VButton>
              <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full" onClick={() => downloadHTML(exportColumns, categories.data, "categories")}>
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
              !loading ? showList.map((category, idx) =>
                <Grid key={category.id} item xs={12} sm={6} lg={4} xl={3}>
                  <div className="border border-solid border-gray-300 rounded-md">
                    <div className="px-4 py-2 flex items-center">

                      <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5 w-max flex items-center h-min">
                        <Icon icon="ic:outline-published-with-changes" />&nbsp;{t("Public")}
                      </VText>

                      <BPopOver className="ml-auto" trigger={
                        <VButton iconOnly variant="outlined" color="primary">
                          <Icon icon="eva:more-horizontal-outline" />
                        </VButton>}
                      >
                        <div className="flex flex-col">
                          <VButton variant="text" color="secondary" className="px-5 py-2 justify-start" onClick={() => onDelete(idx)}>
                            <Icon icon="mi:delete" />&nbsp;{t("Delete")}
                          </VButton>
                        </div>
                      </BPopOver>

                    </div>
                    <div className="p-4">
                      <VText className="text-limit-1">{category.name}</VText>
                    </div>
                    <Divider className="bg-gray-200 dark:bg-gray-500" />
                    <div className="flex">
                      <div className="flex-1 p-4 border-0 border-r border-solid border-gray-300">
                        <VText color="primary" div className="text-sm">{t("Created")}</VText>
                        <VText className="flex items-center text-lg">
                          <Icon icon="bx:user-check" className="flex-shrink-0" />&nbsp;{getFormatDate(category.created, i18n.language)}
                        </VText>
                      </div>
                      <div className="flex-1 p-4">
                        <VText color="secondary" div className="text-sm">{t("Course Assigned")}</VText>
                        <div className="flex items-center text-lg">
                          <VText className="flex items-center text-lg">
                            <Icon icon="mdi:bookmark-check-outline" className="flex-shrink-0" />&nbsp;{category.courses.length || 0}
                          </VText>
                        </div>
                      </div>
                    </div>
                    <Divider className="bg-gray-200 dark:bg-gray-500" />
                    <div className="p-4">
                      <Link to={`/catalog/category/detail/${categories.page}/${categories.page_size}/${category.id}`} className="no-underline">
                        <VButton variant="contained" className="w-full normal-case">
                          <Icon icon="akar-icons:eye" className="text-xl" />&nbsp;{t("View")}
                        </VButton>
                      </Link>
                    </div>
                  </div>
                </Grid>
              ) : [...Array(10).keys()].map(v => <Grid key={v} item xs={12} sm={6} lg={4} xl={3}>
                <div className="rounded-md border border-solid border-gray-200 p-4">
                  <Skeleton className="aspect-[9/5] mb-4" />
                  <Skeleton count={4} className="mt-2" />
                  <Skeleton className="h-8 mt-4" />
                </div>
              </Grid>)
            }
          </Grid>
        </div>
      }
      {
        tab === 1 &&
        <BTable
          key={`${loading}${loadedCategoryDelete}${showList.length}`}
          columns={columns}
          data={showList}
          total={categories.total}
          loading={loading}
        />
      }
    </div>

    <BGPagination
      handlePageChange={handlePageChange}
      total={categories.total}
      initPage={categories.page}
      initSize={categories.page_size}
    />

    <PageNoData show={!loading && !categories.total} />

  </div >;
};

export default Category;