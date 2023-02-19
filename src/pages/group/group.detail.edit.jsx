import { useState } from "react";
import { Divider, TextField, Grid } from "@mui/material";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import { VDropZone, VFormItem, VText, VButton } from "../../form";
import { useAsterController } from "../../context";
import { actionGroupEdit } from "../../context/action";
import { BModal } from "../../components";

const GroupDetailEdit = (props) => {

  const { t } = useTranslation('common');

  const { currGroup } = props;

  const [controller, dispatch] = useAsterController();
  const { loadedGroupEdit } = controller;

  const [url, setUrl] = useState(currGroup.cover_url || '');
  const [modalOpen, setModalOpen] = useState(false);

  const onSubmit = (values) => {
    const obj = JSON.parse(JSON.stringify(values));
    obj.cover_url = url.replace(/\?.*/g, "");
    obj.group_id = currGroup.id;

    setModalOpen(false);
    actionGroupEdit(dispatch, obj, t);
  };

  const formik = useFormik({
    initialValues: {
      name: currGroup.name || '',
      description: currGroup.description || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().max(100, t('Must be 100 characters or less')).required(t('This field is required')),
      description: Yup.string().max(800, t('Must be 800 characters or less')).required(t('This field is required')),
    }),
    onSubmit: onSubmit
  });

  return <>
    <VButton variant="text" color="primary" className="h-min text-sm normal-case" onClick={() => setModalOpen(true)}>
      <Icon icon="eva:edit-outline" />&nbsp;{t('Edit')}
    </VButton>

    <BModal open={modalOpen} setOpen={setModalOpen} width='90vw' height='fit-content' className="w-full max-w-xl h-full max-h-150">
      <div className="w-full">
        <div className="px-8 pt-8">
          <VText className="text-2xl">{t('Edit Group')}</VText>
        </div>
      </div>
      <div>
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
                  <VText>{t('Drag & drop image')}</VText>
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
            <VButton variant="outlined" className="normal-case" onClick={() => setModalOpen(false)}>{t('Cancel')}</VButton>
            <VButton className="normal-case ml-4" type="submit" loading={!loadedGroupEdit}>{t('Update')}</VButton>
          </div>
        </form>
      </div>
    </BModal>

  </>;
};

export default GroupDetailEdit;