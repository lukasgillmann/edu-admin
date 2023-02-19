import { Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useTranslation } from 'react-i18next';
import { fr, enUS } from "date-fns/locale";

import { VButton, VFormItem, VText } from "../../form";
import { useAsterController } from "../../context";
import { actionPhysicalSessionEdit, actionPhysicalSessionList } from "../../context/action";
import { numberInputs } from "../../utils/tool";
import PaginationFetcher from "../PaginationFetcher";

const PhysicalEdit = () => {

  const { t, i18n } = useTranslation('common');

  const { page, pageSize, sessionId } = numberInputs(useParams());

  const [controller, dispatch] = useAsterController();
  const { physicalSessions, loadedPhysicalSessionEdit } = controller;

  const currDate = useMemo(() => new Date(), []);
  const currSession = useMemo(() => physicalSessions.page === page && physicalSessions.page_size === pageSize ? physicalSessions.data.find(v => v.id === sessionId) || {} : {}, [page, pageSize, physicalSessions, sessionId]);

  const onSubmit = (values) => actionPhysicalSessionEdit(dispatch, values, t("Session edit success!"), t("Session edit error!"));

  const formik = useFormik({
    initialValues: {
      id: sessionId,
      coach_name: currSession.coach_name || '',
      subject: currSession.subject || '',
      program: currSession.program || '',
      location: currSession.location || '',
      signature: currSession.signature || '',
      start: currSession.start || currDate,
      duration: currSession.duration || 0,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      coach_name: Yup.string().max(20, t('Must be 15 characters or less')).required(t('This field is required')),
      subject: Yup.string().max(20, t('Must be 15 characters or less')).required(t('This field is required')),
      program: Yup.string().required(t('This field is required')),
      location: Yup.string().required(t('This field is required')),
      signature: Yup.string().required(t('This field is required')),
      start: Yup.string().required(t('This field is required')),
    }),
    onSubmit: onSubmit
  });

  return <div className="p-4 md:p-8">

    <PaginationFetcher page={page} pageSize={pageSize} list={physicalSessions} action={actionPhysicalSessionList} />

    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} className="md:w-8/12">

        {/******************************** Personal Information ********************************/}
        <Grid item xs={12}>
          <VText className="text-2xl font-bold">{t('Physical session information')}</VText>
        </Grid>

        <Grid item xs={6}>
          <VFormItem formik={formik} label={t("Coach Name")} name="coach_name" required>
            <TextField name="coach_name" size="small" value={formik.values.coach_name} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={6}>
          <VFormItem formik={formik} label={t("Subject")} name="subject" required>
            <TextField name="subject" size="small" value={formik.values.subject} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={12}>
          <VFormItem formik={formik} label={t("Program")} name="program" required>
            <TextField name="program" size="small" value={formik.values.program} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={12}>
          <VFormItem formik={formik} label={t("Location")} name="location">
            <TextField name="location" size="small" value={formik.values.location} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={12}>
          <VFormItem formik={formik} label={t("Signature URL")} name="signature">
            <TextField name="signature" size="small" value={formik.values.signature} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("Start")} name="start" required>
            <LocalizationProvider adapterLocale={i18n.language === 'uk' ? enUS : fr} dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                value={formik.values.start}
                onChange={newVal => formik.setFieldValue('start', newVal)}
                minDateTime={new Date()}
              />
            </LocalizationProvider>
          </VFormItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("Duration")} name="duration">
            <TextField name="duration" size="small" value={formik.values.duration} onChange={formik.handleChange} className="w-full" color="secondary" type="number" />
          </VFormItem>
        </Grid>

        <Grid item xs={12} className="flex justify-center md:justify-end">
          <VButton variant="contained" color="primary" type="submit" className="h-min text-sm" loading={!loadedPhysicalSessionEdit}>{t("Save")}</VButton>
          <Link to={`/catalog/physical-session`} className="no-underline ml-4">
            <VButton variant="outlined" color="secondary" type="submit" className="h-min text-sm">{t("Cancel")}</VButton>
          </Link>
        </Grid>

      </Grid>
    </form>
  </div>;
};

export default PhysicalEdit;