import { Grid, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { Icon } from '@iconify/react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { VButton, VFormItem, VSwitch, VText } from "../../form";
import { numberInputs } from "../../utils/tool";
import { useAsterController } from "../../context";
import { actionSendTestSMS, actionSMSTemplateEdit } from "../../context/action";
import { BModal } from "../../components";

const SmsEdit = () => {

  const { t } = useTranslation('common');

  const { smsId } = numberInputs(useParams());

  const [controller, dispatch] = useAsterController();
  const { smsTemplates, loadedAdminDashboardGet, loadedSMSTemplateEdit } = controller;

  const [targetPhone, setTargetPhone] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const currTemplate = useMemo(() => loadedAdminDashboardGet && smsTemplates.length > smsId ? smsTemplates[smsId] : {}, [smsTemplates, loadedAdminDashboardGet, smsId]);

  const onSubmit = (values) => actionSMSTemplateEdit(dispatch, values, t);

  const formik = useFormik({
    initialValues: {
      id: currTemplate.id || null,
      type: currTemplate.type || '',
      enabled: currTemplate.enabled || false,
      content: currTemplate.content || ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      type: Yup.string().required(t('This field is required')),
      content: Yup.string().required(t('This field is required')),
    }),
    onSubmit: onSubmit
  });

  const onSendTest = () => {
    if (targetPhone) {
      setModalOpen(false);
      actionSendTestSMS(dispatch, { phone: targetPhone, message: formik.values.content }, t);
    }
  };

  return <div className="p-4 md:p-8">

    <BModal open={modalOpen} setOpen={setModalOpen} >
      <div className="p-4 md:p-8">
        <VText className="text-lg font-bold">
          {t("Input Target Phone Number")}
        </VText>
        <div textAlign="center" mt={2}>
          <TextField name="type" size="small" value={targetPhone} onChange={e => setTargetPhone(e.target.value)} className="w-full" color="secondary" placeholder="+1231234456" />
          <VButton onClick={onSendTest} variant="contained" color="primary" className="mt-4" disabled={!targetPhone}>
            <Icon icon="fluent:send-28-filled" />&nbsp;{t("Send")}
          </VButton>
        </div>
      </div>
    </BModal>

    <form onSubmit={formik.handleSubmit}>

      <div className="flex items-center">
        <div>
          <VText className="text-2xl mt-6" div>{t("Edit user notifications")}</VText>
          <VText color="secondary" className="text-sm">
            {t("Edit notification detail for your learners")}
          </VText>
        </div>
        <div className="ml-auto">
          <VFormItem formik={formik} label="" name="enabled">
            <VSwitch checked={formik.values.enabled} setChecked={val => formik.setFieldValue('enabled', val)} color="info" type="Android">
              Active
            </VSwitch>
          </VFormItem>
        </div>
        <VButton variant="contained" onClick={() => setModalOpen(true)}>
          <Icon icon="fluent:send-20-filled" />&nbsp;{t("Send a test")}
        </VButton>
        <VButton variant="contained" className="ml-4" type="submit" loading={!loadedSMSTemplateEdit}>
          <Icon icon="ant-design:save-outlined" className="text-xl" />&nbsp;{t("Update")}
        </VButton>
      </div>

      <div className="mt-5">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <VFormItem formik={formik} label={t("Type")} name="type" required>
              <TextField name="type" size="small" value={formik.values.type} onChange={formik.handleChange} className="w-full" color="secondary" disabled />
            </VFormItem>
          </Grid>

          <Grid item xs={6} />

          <Grid item xs={9}>
            <VFormItem formik={formik} label={t("Content")} name="content" required>
              <TextField
                name="content"
                size="small"
                value={formik.values.content}
                onChange={formik.handleChange}
                className="w-full"
                color="secondary"
                multiline
                rows={4}
                placeholder={t("Type content here...")}
              />
            </VFormItem>
          </Grid>
          <Grid item xs={3}>
            <VText div className="mb-2">{t("Variables")}</VText>
            {currTemplate.variable?.map(v => <VText className="font-bold text-sm my-1" key={v} div>{v}</VText>)}
          </Grid>

        </Grid>
      </div>
    </form>
  </div>;
};

export default SmsEdit;