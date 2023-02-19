import { Grid, TextField } from "@mui/material";
import { Icon } from '@iconify/react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useState } from "react";

import { VButton, VFormItem, VText } from "../../form";
import { BGPagination, BTable } from "../../components";
import { useAsterController } from "../../context";
import { getCourseImageUrl, getFormatDate } from "../../utils/string";
import { actionCategoryCreate, actionCourseList } from "../../context/action";

const CategoryAdd = (props) => {

  const { setOpen } = props;

  const { t, i18n } = useTranslation('common');

  const [controller, dispatch] = useAsterController();
  const { courses, loadedAdminDashboardGet, loadedCourseList, loadedCategoryCreate } = controller;

  const loading = !loadedAdminDashboardGet || !loadedCourseList;

  const [selectCourses, setSelectCourses] = useState([]);

  const onSelectChange = (data) => setSelectCourses(data);
  const handlePageChange = (page, pageSize) => actionCourseList(dispatch, { page, page_size: pageSize });

  const onSubmit = (values) => {
    actionCategoryCreate(dispatch, { name: values.name, courses: selectCourses }, t);
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t('This field is required')),
    }),
    onSubmit: onSubmit
  });

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
      name: <VText>{t('Category')}</VText>,
      selector: row => row.category,
      cell: rw => <VText>{rw.category || "-"}</VText>,
      sortable: true
    },
    {
      name: <VText>{t('Created')}</VText>,
      selector: row => row.created,
      cell: rw => <VText>{getFormatDate(rw.created, i18n.language)}</VText>,
      sortable: true
    },
  ];

  return <div className="p-4 md:p-8">
    <form onSubmit={formik.handleSubmit}>

      <div className="flex items-center flex-wrap mt-6">
        <div>
          <VText className="text-2xl" div>{t('Add Category')}</VText>
          <VText color="secondary" className="text-sm">
            {t('Add category information here')}
          </VText>
        </div>
        <VButton variant="contained" className="ml-auto" type="submit" loading={!loadedCategoryCreate}>
          <Icon icon="ant-design:save-outlined" className="text-xl" />&nbsp;{t('Save')}
        </VButton>
      </div>

      <div className="mt-5">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <VFormItem formik={formik} label={t("Category Name")} name="name" required>
              <TextField name="name" size="small" value={formik.values.name} onChange={formik.handleChange} className="w-full" color="secondary" />
            </VFormItem>
          </Grid>
        </Grid>
      </div>
    </form >

    <VText div className="mt-8">{t('Add courses')}</VText>
    <BTable
      key={loading}
      columns={columns}
      data={courses.data}
      total={courses.total}
      loading={loading}
      isSelect
      onSelectChange={onSelectChange}
      selectableRowDisabled={row => !!row.category}
      page={courses.page}
      pageSize={courses.page_size}
    />
    <BGPagination
      handlePageChange={handlePageChange}
      total={courses.total}
      initPage={courses.page}
      initSize={courses.page_size}
    />
  </div >;
};

export default CategoryAdd;