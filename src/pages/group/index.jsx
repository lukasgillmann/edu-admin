import { Grid, Tab, Tabs, Divider, AvatarGroup, TextField } from "@mui/material";
import React, { useState, useMemo } from "react";
import { Icon } from '@iconify/react';
import { VButton, VText, VAvatar, VImage } from "../../form";
import GroupNew from "./group.new";
import { BGPagination, BModal, BPopOver, BTable } from "../../components";

import { useConfirm } from "material-ui-confirm";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';

import { useAsterController } from "../../context";
import { actionGroupDelete, actionUserList } from "../../context/action";
import { getAvatarUrl, getFormatDate } from "../../utils/string";
import PageNoData from "../PageNoData";

const Group = () => {

  const { t, i18n } = useTranslation('common');
  const confirm = useConfirm();

  const [controller, dispatch] = useAsterController();
  const { groups, loadedAdminDashboardGet, loadedGroupList, loadedGroupDelete } = controller;
  const loading = !loadedAdminDashboardGet || !loadedGroupList;

  const [tab, setTab] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [term, setTerm] = useState('');

  const showList = useMemo(() => {
    const tmp = term.toLowerCase();
    return (groups.data || []).filter(v => v.name?.toLowerCase()?.includes(tmp));
  }, [groups.data, term]);

  const handleSetTabValue = (_, newValue) => setTab(newValue);

  const handlePageChange = (page, pageSize) => {
    actionUserList(dispatch, { page, page_size: pageSize });
  };

  const onDelete = (idx) => {
    confirm({
      title: t("Are you sure?"),
      confirmationText: t("OK"),
      cancellationText: t("Cancel"),
      description: <div><Icon icon="emojione-v1:warning" />&nbsp;{t("Warning: All data in this group will be permanently deleted!")}</div>
    })
      .then(() => actionGroupDelete(dispatch, groups.data[idx].id, t))
      .catch(() => { });
  };

  const columns = [
    {
      name: <VText>{t('Name')}</VText>,
      selector: row => row.name,
      cell: rw => <div className="flex items-center" >
        <Link to={`/user/groups/detail/${groups.page}/${groups.page_size}/${rw.id}`} className="no-underline">
          {
            rw.cover_url ? <VImage src={rw.cover_url} className="w-32 h-16 rounded" /> :
              <div className="w-32 h-16 rounded flex justify-center items-center uppercase bg-primary text-white text-3xl">
                {rw.name.slice(0, 2)}
              </div>
          }
        </Link>

        <div className="ml-4">
          <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5 w-max flex items-center" div>
            <Icon icon="bx:user-circle" />&nbsp;{t('Public')}
          </VText>
          <VText>{rw.name}</VText>
        </div>
      </div>,
      sortable: true,
      grow: 2,
      minWidth: '350px'
    },
    {
      name: <VText>{t("Members")}</VText>,
      selector: rw => rw.users.length,
      cell: rw => <div className="flex justify-start">
        <AvatarGroup max={4} spacing={15} className="v-user-detail-group" total={rw.users.length || 0}>
          {rw.users.map(user => <VAvatar size="sm" alt="" key={user.username} src={user.is_avatar ? getAvatarUrl(user.username) : ''} />)}
        </AvatarGroup>
      </div>,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: <VText>{t("Learning Program")}</VText>,
      selector: row => row.courses.length,
      cell: rw => <VText>{rw.courses.length} Program</VText>,
      sortable: true,
      minWidth: '120px'
    },
    {
      name: <VText>{t("Date Created")}</VText>,
      selector: row => row.created,
      cell: rw => <VText>{getFormatDate(rw.created, i18n.language)}</VText>,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: <VText>{t("Action")}</VText>,
      cell: (rw, idx) => <div className="flex">
        <BPopOver trigger={<VButton iconOnly variant="outlined" color="success"><Icon icon="eva:more-horizontal-outline" /></VButton>}>
          <div className="flex flex-col">
            <Link to={`/user/groups/detail/${groups.page}/${groups.page_size}/${rw.id}`} className="no-underline">
              <VButton variant="text" className="px-5 py-1 justify-start normal-case w-full" color="secondary">
                <Icon icon="akar-icons:eye" />&nbsp;{t("View")}
              </VButton>
            </Link>
            <VButton variant="text" color="warning" className="px-5 py-1 justify-start w-full" onClick={() => onDelete(idx)}>
              <Icon icon="mi:delete" />&nbsp;{t("Delete")}
            </VButton>
          </div>
        </BPopOver>
      </div>,
      grow: 0,
    },
  ];

  return <div>

    <BModal open={modalOpen} setOpen={setModalOpen} width='90vw' height='fit-content' className="w-full max-w-xl h-full max-h-150">
      <GroupNew setOpen={setModalOpen} />
    </BModal>

    <div className="px-6 py-8" id="v-user-title">
      <Grid container spacing={2}>
        <Grid item sm={12} md={4} className="flex">
          <VText className="text-2xl">{groups.total || 0}</VText>&nbsp;
          <VText color="secondary" className="text-2xl">{t("Groups in total")}</VText>
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

          <VButton startIcon="add" variant="contained" color="primary" className="text-sm ml-4 normal-case my-1" onClick={() => setModalOpen(true)}>
            {t("New Group")}
          </VButton>
        </Grid>
      </Grid>
    </div>

    <div>
      {
        tab === 0 && <div className="px-4 pb-4 md:px-8 md:pb-8">
          <Grid container spacing={3}>
            {
              !loading ? showList.map((group, idx) =>
                <Grid key={group.id} item xs={12} sm={6} lg={4} xl={3}>
                  <div className="border border-solid border-gray-300 rounded-md">
                    <div className="px-4 py-2 flex items-center">
                      <div className="flex justify-start">
                        <AvatarGroup max={4} spacing={15} className="v-user-detail-group" total={group.users.length}>
                          {group.users.map(user => <VAvatar key={user.id} size="sm" alt="" src={user.is_avatar ? getAvatarUrl(user.username) : ''} />)}
                        </AvatarGroup>
                      </div>

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
                    {
                      group.cover_url ? <div className="w-full aspect-[5/2] bg-cover bg-center bg-gray-100 dark:bg-gray-700" style={{ backgroundImage: `url("${group.cover_url}")` }} /> :
                        <div className="w-full aspect-[5/2] bg-cover bg-center bg-gray-100 dark:bg-gray-700" style={{ backgroundImage: `url("${process.env.REACT_APP_S3_ASSET_ENDPOINT + '/v2-assets/default-cover-' + (group.name.charCodeAt(0) % 3 + 1) + '.png'}")` }} />
                    }
                    <div className="p-4">
                      <VText className="text-limit-1">{group.name}</VText>
                      <div className="flex items-center text-sm mt-4">
                        <VText color="secondary" className="leading-0 mr-1 flex-shrink-0" div><Icon icon="bx:calendar-check" /></VText>
                        <VText color="secondary" className="mr-4 text-limit-1" div>{t("Created on")} {getFormatDate(group.created, i18n.language)}</VText>
                      </div>
                    </div>
                    <Divider className="bg-gray-200 dark:bg-gray-500" />
                    <div className="flex">
                      <div className="flex-1 p-4 border-0 border-r border-solid border-gray-300">
                        <VText color="primary" div className="text-sm">{t("User Assigned")}</VText>
                        <VText className="flex items-center text-lg">
                          <Icon icon="bx:user-check" className="flex-shrink-0" />&nbsp;{group.users.length || 0}
                        </VText>
                      </div>
                      <div className="flex-1 p-4">
                        <VText color="secondary" div className="text-sm">{t("Course Assigned")}</VText>
                        <div className="flex items-center text-lg">
                          <VText className="flex items-center text-lg">
                            <Icon icon="mdi:bookmark-check-outline" className="flex-shrink-0" />&nbsp;{group.courses.length || 0}
                          </VText>
                        </div>
                      </div>
                    </div>
                    <Divider className="bg-gray-200 dark:bg-gray-500" />
                    <div className="p-4">
                      <Link to={`/user/groups/detail/${groups.page}/${groups.page_size}/${group.id}`} className="no-underline">
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
          key={`${loading}${loadedGroupDelete}${showList.length}`}
          columns={columns}
          data={showList}
          total={groups.data.length}
          loading={loading}
        />
      }
    </div>

    <BGPagination
      handlePageChange={handlePageChange}
      total={groups.total}
      initPage={groups.page}
      initSize={groups.page_size}
    />

    <PageNoData show={!loading && !groups.total} />

  </div >;
};

export default Group;