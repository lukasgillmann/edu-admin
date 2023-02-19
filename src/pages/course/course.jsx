import { Divider, Grid, Tab, Tabs, TextField } from "@mui/material";
import React, { useState, useMemo } from "react";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useConfirm } from "material-ui-confirm";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';

import { VButton, VText } from "../../form";
import { BGPagination, BPopOver, BTable } from "../../components";
import { useAsterController } from "../../context";
import { getCourseImageUrl, getFormatDate } from "../../utils/string";
import { actionCourseDelete, actionCourseList } from "../../context/action";
import PageNoData from "../PageNoData";

const Course = () => {

  const { t, i18n } = useTranslation('common');

  const confirm = useConfirm();

  const [controller, dispatch] = useAsterController();
  const { courses, loadedAdminDashboardGet, loadedCourseList, loadedCourseDelete } = controller;
  const loading = !loadedAdminDashboardGet || !loadedCourseList;

  const [tab, setTab] = useState(0);
  const [term, setTerm] = useState('');

  const showList = useMemo(() => {
    const tmp = term.toLowerCase();
    return (courses.data || []).filter(v => v.display_name?.toLowerCase()?.includes(tmp));
  }, [courses.data, term]);

  const onDelete = (courseId) => {
    confirm({
      title: t("Are you sure?"),
      confirmationText: t("OK"),
      cancellationText: t("Cancel"),
      description: <div><Icon icon="emojione-v1:warning" />&nbsp;{t("Warning: All data in this course will be permanently deleted!")}</div>
    })
      .then(() => actionCourseDelete(dispatch, courseId, t))
      .catch(() => { });
  };

  const handleSetTabValue = (_, newValue) => setTab(newValue);
  const handlePageChange = (page, pageSize) => actionCourseList(dispatch, { page, page_size: pageSize });

  const columns = [
    {
      name: <VText>{t('Image')}</VText>,
      cell: rw => <div className="w-32 h-16 rounded bg-cover bg-center bg-gray-100 dark:bg-gray-700" style={{ backgroundImage: `url(${getCourseImageUrl(rw.course_image_url)})` }} />,
      minWidth: '130px',
    },
    {
      name: <VText>{t('Title')}</VText>,
      selector: row => row.display_name,
      cell: rw => <VText>{rw.display_name}</VText>,
      sortable: true
    },
    {
      name: <VText>{t('Description')}</VText>,
      selector: row => row.short_description,
      cell: rw => <VText div className="text-limit-2">{rw.short_description}</VText>,
      sortable: true
    },
    {
      name: <VText>{t('Date Created')}</VText>,
      selector: row => row.created,
      cell: rw => <VText>{getFormatDate(rw.created, i18n.language)}</VText>,
      sortable: true
    },
    {
      name: <VText>{t('Action')}</VText>,
      cell: rw => <BPopOver trigger={<VButton iconOnly variant="outlined" color="success"><Icon icon="eva:more-horizontal-outline" /></VButton>}>
        <div className="flex flex-col">
          <Link to={`/catalog/course/edit/${courses.page}/${courses.page_size}/${rw.id}`} className="no-underline">
            <VButton variant="text" className="w-full justify-start relative" color="secondary">
              <Icon icon="eva:edit-outline" className="text-xl" />&nbsp;{t('Edit')}
            </VButton>
          </Link>
          <VButton variant="text" color="secondary" onClick={() => onDelete(rw.id)}>
            <Icon icon="mi:delete" />&nbsp;{t('Delete')}
          </VButton>
        </div>
      </BPopOver>,
      grow: 0
    },
  ];

  return <div>

    <div className="px-6 py-8" id="v-user-title">
      <Grid container spacing={2}>
        <Grid item sm={12} md={4} className="flex">
          <VText className="text-2xl">{courses.total || 0}</VText>&nbsp;
          <VText color="secondary" className="text-2xl">{t('Courses in total')}</VText>
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

          <a target="_blank" href={`${process.env.REACT_APP_STUDIO_ENDPOINT}/home`} className="no-underline" rel="noreferrer">
            <VButton startIcon="add" variant="contained" color="primary" className="text-sm ml-4 normal-case my-1">
              {t('New Course')}
            </VButton>
          </a>

        </Grid>
      </Grid>
    </div>

    <Divider className="bg-gray-200 dark:bg-gray-500" />

    <div>
      {
        tab === 0 && <div className="p-4 md:p-8">
          <VText className="text-2xl mb-8" div>{t('All courses')}</VText>

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
                showList.map((course, idx) =>
                  <Grid key={course.id} item xs={12} sm={4} lg={4} xl={3}>
                    <div className="border border-solid border-gray-300 rounded-md">
                      <div className="px-4 py-2 flex items-center">
                        <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5 w-max flex items-center h-min">
                          <Icon icon="ic:outline-published-with-changes" />&nbsp;{t('Published')}
                        </VText>

                        <BPopOver className="ml-auto" trigger={
                          <VButton iconOnly variant="outlined" color="primary">
                            <Icon icon="eva:more-horizontal-outline" />
                          </VButton>}
                        >
                          <VButton variant="text" color="secondary" className="px-5 py-2" onClick={() => onDelete(course.id)}>
                            <Icon icon="mi:delete" />&nbsp;{t('Delete')}
                          </VButton>
                        </BPopOver>

                      </div>
                      <div className="w-full aspect-[25/14] bg-cover bg-center bg-gray-100 dark:bg-gray-700" style={{ backgroundImage: `url(${getCourseImageUrl(course.course_image_url)})` }} />
                      <div className="p-4">
                        <VText className="text-limit-1">{course.display_name}</VText>
                        <div className="flex">
                          <VText color="secondary" className="flex items-center text-sm">
                            <Icon icon="bx:user-circle" />&nbsp;
                            {`${course.coach_first_name || ''} ${course.coach_last_name || ''}`.trim() || '-'}
                          </VText>
                          <VText color="secondary" className="flex items-center text-sm ml-4">
                            <Icon icon="bx:category" />&nbsp;{course.category}
                          </VText>
                        </div>
                      </div>
                      <Divider className="bg-gray-200 dark:bg-gray-500" />
                      <div className="flex">
                        <div className="flex-1 p-4 border-0 border-r border-solid border-gray-300">
                          <VText color="primary" div className="text-sm">{t('Duration')}</VText>
                          <VText className="flex items-center text-lg"><Icon icon="gis:timer" />&nbsp;{course.duration} {t("min")}</VText>
                        </div>
                        <div className="flex-1 p-4">
                          <VText color="secondary" div className="text-sm">{t('Date Created')}</VText>
                          <div className="flex items-center text-lg">
                            <Icon icon="akar-icons:calendar" className="flex-shrink-0" />
                            <VText className="text-limit-1 ml-1">{getFormatDate(course.created, i18n.language)}</VText>
                          </div>
                        </div>
                      </div>
                      <Divider className="bg-gray-200 dark:bg-gray-500" />
                      <div className="p-4">
                        <Link to={`/catalog/course/edit/${courses.page}/${courses.page_size}/${course.id}`} className="no-underline">
                          <VButton variant="contained" className="w-full normal-case relative">
                            <Icon icon="eva:edit-outline" className="text-xl" />&nbsp;{t('View Details')}
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
          key={`${loading}${loadedCourseDelete}${showList.length}`}
          columns={columns}
          data={showList}
          total={courses.total}
          loading={loading}
        />
      }
      <BGPagination
        handlePageChange={handlePageChange}
        total={courses.total}
        initPage={courses.page}
        initSize={courses.page_size}
      />
    </div>

    <PageNoData show={!loading && !courses.total} />

  </div>;
};

export default Course;