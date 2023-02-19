import { Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useTranslation } from 'react-i18next';
import { fr, enUS } from "date-fns/locale";

import { VButton, VFormItem, VText } from "../../form";
import { useAsterController } from "../../context";
import { actionPhysicalSessionCreate } from "../../context/action";

const PhysicalAdd = () => {

  const { t, i18n } = useTranslation('common');

  const navigate = useNavigate();

  const [controller, dispatch] = useAsterController();
  const { loadedPhysicalSessionCreate } = controller;

  const [waiting, setWaiting] = useState(false);
  const currDate = useMemo(() => new Date(), []);

  useEffect(() => loadedPhysicalSessionCreate && waiting && navigate('/catalog/physical-session'), [loadedPhysicalSessionCreate, waiting, navigate]);

  const onSubmit = (values) => {
    actionPhysicalSessionCreate(dispatch, values, t);
    setWaiting(true);
  };

  const formik = useFormik({
    initialValues: {
      coach_name: '',
      subject: '',
      program: '',
      location: '',
      signature: '',
      start: currDate,
      duration: 0,
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
          <VButton variant="contained" color="primary" type="submit" className="h-min text-sm" loading={!loadedPhysicalSessionCreate}>{t("Save")}</VButton>
          <Link to={`/catalog/physical-session`} className="no-underline ml-4">
            <VButton variant="outlined" color="secondary" type="submit" className="h-min text-sm">{t("Cancel")}</VButton>
          </Link>
        </Grid>

      </Grid>
    </form>
  </div>;
};

export default PhysicalAdd;