import { Grid, MenuItem, Select, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { Icon } from '@iconify/react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { VButton, VFormItem, VFroala, VSwitch, VText } from "../../form";
import { useAsterController } from "../../context";
import { EMAIL_TEMPLATE_SCHEDULE_OPTIONS, EMAIL_TYPES } from "../../utils/string";
import { actionEmailTemplateEdit, actionSendTestEmail } from "../../context/action";
import { BModal } from "../../components";

const EmailEdit = () => {

  const { t } = useTranslation('common');

  const { endUser, emailId } = useParams();

  const [controller, dispatch] = useAsterController();
  const { emailTemplates, loadedAdminDashboardGet, loadedEmailTemplateEdit } = controller;

  const [targetEmail, setTargetEmail] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const currTemplate = useMemo(() => {
    if (loadedAdminDashboardGet && emailTemplates.length) {
      const tmps = emailTemplates.filter(v => v.end_user === endUser);
      if (tmps.length > emailId) return tmps[emailId];
    }
    return {};
  }, [emailTemplates, loadedAdminDashboardGet, emailId, endUser]);

  const onSubmit = (values) => actionEmailTemplateEdit(dispatch, values, t);

  const formik = useFormik({
    initialValues: {
      id: currTemplate.id || null,
      type: currTemplate.type || '',
      schedule: currTemplate.schedule || '',
      admin_email: currTemplate.admin_email || '',
      enabled: currTemplate.enabled || false,
      subject: currTemplate.subject || '',
      content: currTemplate.content || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      schedule: Yup.string().required(t('This field is required')),
      admin_email: Yup.string().email(t('Invalid email address')),
      subject: Yup.string().required(t('This field is required')),
      content: Yup.string().required(t('This field is required')),
    }),
    onSubmit: onSubmit
  });

  const onSendTest = () => {
    if (targetEmail) {
      setModalOpen(false);
      actionSendTestEmail(dispatch, { email: targetEmail, name: "Test", html: formik.values.content }, t);
    }
  };

  return <div className="p-4 md:p-8">

    <BModal open={modalOpen} setOpen={setModalOpen} className="max-w-sm w-full" >
      <div className="p-4 md:p-8">
        <VText className="text-lg font-bold">
          {t('Enter email address to test')}
        </VText>
        <div textAlign="center" mt={2}>
          <TextField name="type" size="small" value={targetEmail} onChange={e => setTargetEmail(e.target.value)} className="w-full" color="secondary" />
          <VButton onClick={onSendTest} variant="contained" color="primary" className="mt-4" disabled={!targetEmail}>
            <Icon icon="fluent:send-28-filled" />&nbsp;{t('Send')}
          </VButton>
        </div>
      </div>
    </BModal>

    <form onSubmit={formik.handleSubmit}>

      <div className="flex items-center">
        <div>
          <VText className="text-2xl mt-6" div>{t("Edit user notifications")}</VText>
          <VText color="secondary" className="text-sm">
            {t('Edit notification detail for your learners')}
          </VText>
        </div>
        <div className="ml-auto">
          <VFormItem formik={formik} label="" name="enabled">
            <VSwitch checked={formik.values.enabled} setChecked={val => formik.setFieldValue('enabled', val)} color="info" type="Android">
              {t('Active')}
            </VSwitch>
          </VFormItem>
        </div>
        <VButton variant="contained" onClick={() => setModalOpen(true)}>
          <Icon icon="fluent:send-20-filled" />&nbsp;{t("Send a test")}
        </VButton>
        <VButton variant="contained" className="ml-4" type="submit" loading={!loadedEmailTemplateEdit}>
          <Icon icon="ant-design:save-outlined" className="text-xl" />&nbsp;{t('Update')}
        </VButton>
      </div>

      <div className="mt-5">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <VFormItem formik={formik} label={t("Type")} name="type" required>
              <TextField name="type" size="small" value={t(EMAIL_TYPES[formik.values.type])} onChange={formik.handleChange} className="w-full" color="secondary" disabled />
            </VFormItem>
          </Grid>

          <Grid item xs={6}>
            <VFormItem formik={formik} label={t("Schedule")} name="schedule" required>
              <Select name="schedule" size="small" value={formik.values.schedule} onChange={formik.handleChange} className="w-full" color="secondary" >
                {EMAIL_TEMPLATE_SCHEDULE_OPTIONS.map(v => <MenuItem key={v} value={v}>{t(v)}</MenuItem>)}
              </Select>
            </VFormItem>
          </Grid>
          <Grid item xs={6}>
            <VFormItem formik={formik} label={t("Reply Email")} name="admin_email">
              <TextField name="admin_email" size="small" value={formik.values.admin_email} onChange={formik.handleChange} className="w-full" color="secondary" />
            </VFormItem>
          </Grid>
          <Grid item xs={6}>
            <VFormItem formik={formik} label={t("Subject")} name="subject" required>
              <TextField name="subject" size="small" value={formik.values.subject} onChange={formik.handleChange} className="w-full" color="secondary" />
            </VFormItem>
          </Grid>
          <Grid item xs={9}>
            <VFormItem formik={formik} label={t("Content")} name="content" required>
              <VFroala model={formik.values.content} setModel={val => formik.setFieldValue('content', val)} fileUpload />
            </VFormItem>
          </Grid>
          <Grid item xs={3}>
            <VText div className="mb-2">{t('Variables')}</VText>
            {currTemplate.variable?.map(v => <VText className="font-bold text-sm my-1" key={v} div>{v}</VText>)}
          </Grid>
        </Grid>
      </div>
    </form>
  </div>;
};

export default EmailEdit;