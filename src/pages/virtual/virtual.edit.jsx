import { Grid, MenuItem, Select, TextField } from "@mui/material";
import { Icon } from '@iconify/react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState, useMemo, useEffect } from "react";
import { fr, enUS } from "date-fns/locale";

import PaginationFetcher from "../PaginationFetcher";
import { VAvatar, VButton, VFormItem, VText } from "../../form";
import { MEETING_DAY_OPTIONS, MEETING_RECUR_TYPE_OPTIONS, MEETING_TYPE_OPTIONS, TIMEZONE_OPTIONS } from "../../utils/string";
import { useAsterController } from "../../context";
import { actionZoomMeetingEdit, actionZoomMeetingList } from "../../context/action";
import VirtualTutorSelect from "./virtual.select.tutor";
import BSelectCourse from "../../components/BSelectCourse";

const VirtualEdit = () => {

  const { t, i18n } = useTranslation('common');

  const { page, pageSize, virtualId } = useParams();

  const [controller, dispatch] = useAsterController();
  const { zoomMeetings, loadedZoomMeetingEdit } = controller;

  const currMeeting = useMemo(() => zoomMeetings.page === Number(page) && zoomMeetings.page_size === Number(pageSize) ? zoomMeetings.data.find(v => v.id === virtualId) || {} : {}, [page, pageSize, zoomMeetings, virtualId]);
  const currDate = useMemo(() => new Date(), []);

  const [selectedCourses, setSelectCourses] = useState([]);
  const [selectedTutors, setSelectTutors] = useState([]);

  useEffect(() => {
    if (Object.keys(currMeeting).length) {
      setSelectCourses(currMeeting.courses);
      setSelectTutors([{
        id: currMeeting.tutor_id,
        first_name: currMeeting.first_name,
        last_name: currMeeting.last_name,
        bio: currMeeting.bio,
        avatar: currMeeting.avatar
      }]);
    }
  }, [currMeeting]);

  const onSubmit = (values) => {

    const obj = {
      ...values,
      id: currMeeting.id,
      start_time: new Date(values.start_time).toISOString(),
      courses: selectedCourses || [],
      tutor: selectedTutors.length ? selectedTutors[0] : {}
    };

    actionZoomMeetingEdit(dispatch, obj, t);
  };

  const formik = useFormik({
    initialValues: {
      topic: currMeeting.topic || '',
      description: currMeeting.description || '',
      meeting_type: currMeeting.meeting_type || MEETING_TYPE_OPTIONS[0],
      start_time: currMeeting.start_time || currDate,
      duration: currMeeting.duration || 15,
      timezone: currMeeting.timezone || "Europe/Paris",
      recur_type: currMeeting.recur_type || MEETING_RECUR_TYPE_OPTIONS[0],
      recur_day: currMeeting.recur_day || 1,
      end_times: currMeeting.end_times || 1,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      topic: Yup.string().required(t('This field is required')),
      description: Yup.string().required(t('This field is required')),
      meeting_type: Yup.string().required(t('This field is required')),
      start_time: Yup.string().required(t('This field is required')),
      duration: Yup.string().required(t('This field is required')),
      timezone: Yup.string().required(t('This field is required')),
    }),
    onSubmit: onSubmit
  });

  return <div className="p-4 md:p-8">

    <PaginationFetcher page={Number(page)} pageSize={Number(pageSize)} list={zoomMeetings} action={actionZoomMeetingList} />

    <form onSubmit={formik.handleSubmit}>

      <div className="flex items-center">
        <div>
          <VText className="text-2xl mt-6" div>{t('Edit Category')}</VText>
          <VText color="secondary" className="text-sm">
            {t('Edit category information here')}
          </VText>
        </div>
        <VButton variant="contained" className="ml-auto" type="submit" loading={!loadedZoomMeetingEdit}>
          <Icon icon="ant-design:save-outlined" className="text-xl" />&nbsp;{t('Update')}
        </VButton>
      </div>

      <div className="mt-5">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <VFormItem formik={formik} label={t("Topic")} name="topic" required>
              <TextField name="topic" size="small" value={formik.values.topic} onChange={formik.handleChange} className="w-full" color="secondary" />
            </VFormItem>
          </Grid>

          <Grid item xs={12}>
            <VFormItem formik={formik} label={t("Description")} name="description" required>
              <TextField name="description" size="small" value={formik.values.description} onChange={formik.handleChange} className="w-full" color="secondary" rows={3} multiline />
            </VFormItem>
          </Grid>

          <Grid item xs={3}>
            <VFormItem formik={formik} label={t("Meeting type")} name="meeting_type" required>
              <Select name="meeting_type" size="small" value={formik.values.meeting_type} onChange={formik.handleChange} className="w-full" >
                {MEETING_TYPE_OPTIONS.map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
              </Select>
            </VFormItem>
          </Grid>

          <Grid item xs={3}>
            <VFormItem formik={formik} label={t("Recurrency Type")} name="recur_type" required>
              <Select name="recur_type" size="small" value={formik.values.recur_type} onChange={formik.handleChange} className="w-full"
                disabled={formik.values.meeting_type !== MEETING_TYPE_OPTIONS[1]}
              >
                {MEETING_RECUR_TYPE_OPTIONS.map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
              </Select>
            </VFormItem>
          </Grid>

          <Grid item xs={3}>
            <VFormItem formik={formik} label={t("Recurrency Day")} name="recur_day" required>
              {
                formik.values.recur_type === 'Weekly' ?
                  <Select name="recur_day" size="small" value={formik.values.recur_day} onChange={formik.handleChange} className="w-full"
                    disabled={formik.values.meeting_type !== MEETING_TYPE_OPTIONS[1]}
                  >
                    {MEETING_DAY_OPTIONS.map((v, idx) => <MenuItem key={v} value={idx + 1}>{v}</MenuItem>)}
                  </Select>
                  :
                  <Select name="recur_day" size="small" value={formik.values.recur_day} onChange={formik.handleChange} className="w-full"
                    disabled={formik.values.meeting_type !== MEETING_TYPE_OPTIONS[1] || formik.values.recur_type !== "Monthly"}
                  >
                    {[...Array(31).keys()].map((v, idx) => <MenuItem key={v} value={idx + 1}>{idx + 1}</MenuItem>)}
                  </Select>
              }

            </VFormItem>
          </Grid>

          <Grid item xs={3}>
            <VFormItem formik={formik} label={t("Iteration Number")} name="end_times" required>
              <TextField name="end_times" size="small" value={formik.values.end_times} onChange={formik.handleChange} className="w-full" color="secondary" type="number" disabled={formik.values.meeting_type !== MEETING_TYPE_OPTIONS[1]} />
            </VFormItem>
          </Grid>

          <Grid item xs={6}>
            <VFormItem formik={formik} label={t("Start Time")} name="start_time" required>
              <LocalizationProvider adapterLocale={i18n.language === 'uk' ? enUS : fr} dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                  value={formik.values.start_time}
                  onChange={newVal => formik.setFieldValue('start_time', newVal)}
                  minDateTime={new Date()}
                />
              </LocalizationProvider>
            </VFormItem>

          </Grid>

          <Grid item xs={3}>
            <VFormItem formik={formik} label={t("Duration")} name="duration" required>
              <Select name="duration" size="small" value={formik.values.duration} onChange={formik.handleChange} className="w-full" >
                {[15, 30, 60, 120].map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
              </Select>
            </VFormItem>
          </Grid>

          <Grid item xs={3}>
            <VFormItem formik={formik} label={t("Timezone")} name="timezone" required>
              <Select name="timezone" size="small" value={formik.values.timezone} onChange={formik.handleChange} className="w-full" >
                {TIMEZONE_OPTIONS.map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
              </Select>
            </VFormItem>
          </Grid>

          <Grid item xs={6}>
            <VText div>{t('Courses')}</VText>
            <BSelectCourse preSelected={selectedCourses} setSelections={setSelectCourses} />
            <div className="mt-4">
              {
                selectedCourses.map(v => <VText className="my-1 flex items-center" key={v.id} div>
                  <Icon icon="la:dot-circle-solid" className="flex-shrink-0" />&nbsp;{v.display_name}
                </VText>)
              }
            </div>
          </Grid>

          <Grid item xs={6}>
            <VText div>{t('Tutor')}</VText>
            <VirtualTutorSelect preSelected={selectedTutors} setSelections={setSelectTutors} />
            <div className="mt-4">
              {
                selectedTutors.map(v => <div className="flex items-center" key={v.id} >
                  <VAvatar src={v.avatar ? v.avatar : ""} />
                  <div className="ml-4">
                    <VText div>{v.first_name} {v.last_name}</VText>
                  </div>
                </div>)
              }
            </div>
          </Grid>

        </Grid>
      </div>
    </form >
  </div >;
};

export default VirtualEdit;