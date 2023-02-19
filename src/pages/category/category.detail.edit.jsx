import { useState } from "react";
import { Divider, TextField, Grid } from "@mui/material";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import { VFormItem, VText, VButton } from "../../form";
import { useAsterController } from "../../context";
import { actionCategoryEdit } from "../../context/action";
import { BModal } from "../../components";

const CategoryDetailEdit = (props) => {

  const { t } = useTranslation('common');

  const { currCategory, loadedCategoryEdit } = props;

  const [, dispatch] = useAsterController();
  const [modalOpen, setModalOpen] = useState(false);

  const onSubmit = (values) => {
    actionCategoryEdit(dispatch, { category_id: currCategory.id, name: values.name }, t);
    setModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: currCategory.name || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().max(100, t('Must be 100 characters or less')).required(t('This field is required')),
    }),
    onSubmit: onSubmit
  });

  return <>
    <VButton variant="text" color="primary" className="h-min text-sm normal-case" onClick={() => setModalOpen(true)}>
      <Icon icon="eva:edit-outline" />&nbsp;{t('Edit')}
    </VButton>

    <BModal open={modalOpen} setOpen={setModalOpen} width='90vw' height='fit-content' className="w-full max-w-xl" >
      <div className="w-full">
        <div className="px-8 pt-8">
          <VText className="text-2xl">{t('Edit Category')}</VText>
        </div>
      </div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} className="p-8">
            <Grid item xs={12}>
              <VFormItem formik={formik} label={t("Category Name")} name="name" required>
                <TextField name="name" size="small" value={formik.values.name} onChange={formik.handleChange} className="w-full" color="secondary" />
              </VFormItem>
            </Grid>
          </Grid>
          <Divider className="bg-gray-200 dark:bg-gray-500" />
          <div className="flex p-8 justify-center md:justify-end">
            <VButton variant="outlined" className="normal-case" onClick={() => setModalOpen(false)}>Cancel</VButton>
            <VButton className="normal-case ml-4" type="submit" loading={!loadedCategoryEdit}>{t('Update')}</VButton>
          </div>
        </form>
      </div>
    </BModal>

  </>;
};

export default CategoryDetailEdit;