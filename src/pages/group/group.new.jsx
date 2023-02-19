import { useState } from "react";
import { Divider, TextField, Grid } from "@mui/material";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import { actionGroupCreate } from "../../context/action";
import { VDropZone, VText, VFormItem, VButton } from "../../form";
import { useAsterController } from "../../context";

const GroupNew = (props) => {

  const { t } = useTranslation('common');

  const { setOpen } = props;

  const [, dispatch] = useAsterController();

  const [url, setUrl] = useState('');

  const onSubmit = (values) => {
    const obj = JSON.parse(JSON.stringify(values));
    obj.cover_url = url.replace(/\?.*/g, "");
    actionGroupCreate(dispatch, obj, t);
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().max(15, t('Must be 15 characters or less')).required(t('This field is required')),
      description: Yup.string().max(800, t('Must be 800 characters or less')).required(t('This field is required')),
    }),
    onSubmit: onSubmit
  });

  return <div className="w-full">
    <div className="px-8 pt-8">
      <VText className="text-2xl">{t('New Group')}</VText>
    </div>

    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} className="p-8">
        <Grid item xs={12}>
          <VFormItem formik={formik} label={t("Group Name")} name="name" required>
            <TextField name="name" size="small" value={formik.values.name} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={12}>
          <VText div className="mb-2">{t("Group Cover")}</VText>
          <VDropZone
            key={formik.values.name}
            url={url}
            setUrl={url => setUrl(`${url}?${new Date().getTime()}`)}
            filename={formik.values.name + '.png'}
            disabled={!formik.values.name}
            directory='groupcover'
            accept="image/*"
            className="w-full h-56"
          >
            <div className="opacity-40 flex flex-col justify-center items-center">
              <Icon icon="ion:image" className="text-5xl" />
              <VText>{t("Drag & drop image")}</VText>
            </div>
          </VDropZone>
        </Grid>
        <Grid item xs={12}>
          <VFormItem formik={formik} label={t("Description")} name="description" required>
            <TextField name="description" size="small" value={formik.values.description} onChange={formik.handleChange} className="w-full" color="secondary" rows={3} multiline />
          </VFormItem>
        </Grid>
      </Grid>
      <Divider className="bg-gray-200 dark:bg-gray-500" />
      <div className="flex p-8 justify-center md:justify-end">
        <VButton variant="outlined" className="normal-case" onClick={() => setOpen(false)}>{t("Cancel")}</VButton>
        <VButton className="normal-case ml-4" type="submit" variant="contained">{t("Create")}</VButton>
      </div>
    </form>
  </div>;
};

export default GroupNew;