import { Grid, MenuItem, Select, TextField } from "@mui/material";
import { Icon } from '@iconify/react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fr, enUS } from "date-fns/locale";

import { VAvatar, VButton, VFormItem, VText } from "../../form";
import { MEETING_DAY_OPTIONS, MEETING_RECUR_TYPE_OPTIONS, MEETING_TYPE_OPTIONS, TIMEZONE_OPTIONS } from "../../utils/string";
import { useAsterController } from "../../context";
import { actionZoomMeetingCreate, actionZoomMeetingList } from "../../context/action";
import VirtualTutorSelect from "./virtual.select.tutor";
import BSelectCourse from "../../components/BSelectCourse";

const VirtualAdd = () => {

  const { t, i18n } = useTranslation('common');
  const navigate = useNavigate();

  const [controller, dispatch] = useAsterController();
  const { loadedZoomMeetingCreate } = controller;
  const [selectedCourses, setSelectCourses] = useState([]);
  const [selectedTutors, setSelectTutors] = useState([]);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (loadedZoomMeetingCreate && waiting) {
      navigate('/catalog/virtual');
      actionZoomMeetingList(dispatch, { page: 0, page_size: 10 });
    }
  }, [loadedZoomMeetingCreate, waiting, navigate, dispatch]);

  const onSubmit = (values) => {

    const obj = {
      ...values,
      start_time: new Date(values.start_time).toISOString(),
      courses: selectedCourses,
      tutor: selectedTutors.length ? selectedTutors[0] : {}
    };

    actionZoomMeetingCreate(dispatch, obj, t);
    setWaiting(true);
  };

  const formik = useFormik({
    initialValues: {
      topic: '',
      description: '',
      meeting_type: MEETING_TYPE_OPTIONS[0],
      start_time: new Date(),
      duration: 15,
      timezone: "Europe/Paris",
      recur_type: MEETING_RECUR_TYPE_OPTIONS[0],
      recur_day: 1,
      end_times: 0,
    },
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
    <form onSubmit={formik.handleSubmit}>

      <div className="flex items-center">
        <div>
          <VText className="text-2xl mt-6" div>{t('Add Category')}</VText>
          <VText color="secondary" className="text-sm">
            {t('Add category information here')}
          </VText>
        </div>
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
              <TextField name="description" size="small" value={formik.values.description} onChange={formik.handleChange} className="w-full" color="secondary" multiline rows={3} />
            </VFormItem>
          </Grid>

          <Grid item xs={3}>
            <VFormItem formik={formik} label={t("Meeting Type")} name="meeting_type" required>
              <Select name="meeting_type" size="small" value={formik.values.meeting_type} onChange={formik.handleChange} className="w-full" >
                {MEETING_TYPE_OPTIONS.map(v => <MenuItem key={v} value={v}>{t(v)}</MenuItem>)}
              </Select>
            </VFormItem>
          </Grid>

          <Grid item xs={3}>
            <VFormItem formik={formik} label={t("Recurrency Type")} name="recur_type" required>
              <Select name="recur_type" size="small" value={formik.values.recur_type} onChange={formik.handleChange} className="w-full"
                disabled={formik.values.meeting_type !== MEETING_TYPE_OPTIONS[1]}
              >
                {MEETING_RECUR_TYPE_OPTIONS.map(v => <MenuItem key={v} value={v}>{t(v)}</MenuItem>)}
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
                    {MEETING_DAY_OPTIONS.map((v, idx) => <MenuItem key={v} value={idx + 1}>{t(v)}</MenuItem>)}
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

          <Grid item xs={12} className="flex justify-center md:justify-end">
            <VButton variant="contained" color="primary" type="submit" className="h-min text-sm" loading={!loadedZoomMeetingCreate}>{t('Create')}</VButton>
            <Link to={`/catalog/virtual`} className="no-underline ml-4">
              <VButton variant="outlined" color="secondary" type="submit" className="h-min text-sm">{t('Cancel')}</VButton>
            </Link>
          </Grid>

        </Grid>
      </div>
    </form >
  </div >;
};

export default VirtualAdd;