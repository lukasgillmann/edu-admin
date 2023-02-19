import { useState, useMemo } from "react";
import { Grid, Tab, Tabs, CircularProgress, Divider, TextField } from "@mui/material";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useConfirm } from "material-ui-confirm";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr, enUS } from "date-fns/locale";

import { VButton, VText } from "../../form";
import { useAsterController } from "../../context";
import { actionStudentEnrollDateEdit, actionUserDismissCourses } from "../../context/action";
import { getCourseImageUrl, getFormatDate } from "../../utils/string";
import { BPopOver, BTable } from "../../components";
import UserDetailContentAdd from "./user.detail.content.add";

const UserDetailContent = (props) => {

  const { userId } = props;

  const { t, i18n } = useTranslation('common');

  const confirm = useConfirm();
  const [controller, dispatch] = useAsterController();
  const { loadedUserCourseList, userCourses } = controller;

  const [tab, setTab] = useState(0);
  const [term, setTerm] = useState('');

  const showList = useMemo(() => {
    const tmp = term.toLowerCase();
    return (userCourses || []).filter(v => v.display_name?.toLowerCase()?.includes(tmp));
  }, [userCourses, term]);

  const handleSetTabValue = (_, newValue) => setTab(newValue);

  const onDismiss = (courseId) => {
    confirm({
      title: t("Are you sure?"),
      confirmationText: t("OK"),
      cancellationText: t("Cancel"),
      description: t("Are you going to dismiss this course?")
    })
      .then(() => actionUserDismissCourses(dispatch, { user_id: userId, course_ids: [courseId] }, t))
      .catch(() => { });
  };

  const onDateChange = (idx, courseId, newDate) => {
    const dt = new Date(newDate).toISOString();
    userCourses[idx].run_end = dt;
    actionStudentEnrollDateEdit(dispatch, { user_id: userId, course_id: courseId, run_end: dt }, t);
  };

  const columns = [
    {
      name: <VText>{t('Image')}</VText>,
      cell: rw => <div className="w-32 h-16 rounded bg-cover bg-center bg-gray-100 dark:bg-gray-700" style={{ backgroundImage: `url(${getCourseImageUrl(rw.course_image_url)})` }} />,
      minWidth: '130px'
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
      name: <VText>{t('Start')}</VText>,
      selector: row => row.run_start,
      cell: rw => <VText>{getFormatDate(rw.run_start, i18n.language)}</VText>,
      sortable: true
    },
    {
      name: <VText>{t('End')}</VText>,
      selector: row => row.run_end,
      cell: (rw, idx) => <LocalizationProvider adapterLocale={i18n.language === 'uk' ? enUS : fr} dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          renderInput={(params) => <TextField {...params} className="w-full" size="small" />}
          value={rw.run_end}
          onChange={(val) => onDateChange(idx, rw.id, val)}
          minDateTime={new Date()}
        />
      </LocalizationProvider>,
      minWidth: '160px',
      sortable: true
    },
    {
      name: <VText>{t('Action')}</VText>,
      cell: (rw, idx) => <VButton variant="outlined" className="normal-case" onClick={() => onDismiss(rw.id)}>
        <Icon icon="gg:remove" className="text-xl" />&nbsp;{t('Dismiss')}
      </VButton>,
      minWidth: '150px'
    },
  ];

  return <div>
    <Grid container spacing={2}>
      <Grid item sm={12} md={4} className="flex">
        <VText className="text-2xl">{userCourses.length || 0}</VText>&nbsp;
        <VText color="secondary" className="text-2xl">{t('Contents in total')}</VText>
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
        <UserDetailContentAdd userId={userId} />
      </Grid>
    </Grid>

    <div className="mt-8">
      {
        tab === 0 && <div>
          <Grid container spacing={3}>
            {
              !loadedUserCourseList ?
                <div className="w-full h-40 flex justify-center items-center">
                  <CircularProgress color="primary" />
                </div>
                :
                showList.map((course, idx) =>
                  <Grid key={course.id} item xs={12} sm={4} lg={4} xl={3}>
                    <div className="border border-solid border-gray-300 rounded-md">
                      <div className="px-4 py-2 flex items-center">
                        <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5 w-max flex items-center h-min">
                          <Icon icon="ic:outline-published-with-changes" />&nbsp;{t('Published')}
                        </VText>
                      </div>
                      <div className="w-full aspect-[5/2] bg-cover bg-center bg-gray-100 dark:bg-gray-700" style={{ backgroundImage: `url(${getCourseImageUrl(course.course_image_url)})` }} />
                      <div className="p-4">
                        <VText className="text-limit-1">{course.display_name}</VText>
                        {/* <VText color="secondary" className="flex items-center text-sm">
                          {course.short_description}
                        </VText> */}
                      </div>
                      <Divider className="bg-gray-200 dark:bg-gray-500" />
                      <div className="p-4">
                        <VText color="primary" className="text-sm text-limit-1" div>{t('Start')}: {getFormatDate(course.run_start, i18n.language)}</VText>
                        <div className="flex items-center mt-4">
                          <VText color="primary" className="text-sm" div>{t('End')}:</VText>
                          <VText className="text-sm flex-1 ml-2" div>
                            <LocalizationProvider adapterLocale={i18n.language === 'uk' ? enUS : fr} dateAdapter={AdapterDateFns}>
                              <DesktopDatePicker
                                renderInput={(params) => <TextField {...params} className="w-full" size="small" />}
                                value={course.run_end}
                                onChange={(val) => onDateChange(idx, course.id, val)}
                                minDateTime={new Date()}
                              />
                            </LocalizationProvider>
                          </VText>
                        </div>

                      </div>
                      <Divider className="bg-gray-200 dark:bg-gray-500" />
                      <div className="p-4">

                        <VButton variant="contained" className="w-full normal-case" onClick={() => onDismiss(course.id)}>
                          <Icon icon="gg:remove" className="text-xl" />&nbsp;{t('Dismiss')}
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
          key={showList.length}
          columns={columns}
          data={showList}
          total={userCourses.length}
          loading={!loadedUserCourseList}
        />
      }
    </div>

  </div>;
};

export default UserDetailContent;