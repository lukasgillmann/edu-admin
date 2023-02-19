import { Divider } from "@mui/material";
import React, { useState } from "react";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import { VButton, VText } from "../../form";
import { BGPagination, BModal, BTable } from "../../components";
import { useAsterController } from "../../context";
import { actionCourseList } from "../../context/action";
import { getCourseImageUrl } from "../../utils/string";

const DashboardSelectCourse = (props) => {

  const { onCourseChange } = props;

  const { t } = useTranslation('common');

  const [selCourse, setSelection] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const [controller, dispatch] = useAsterController();
  const { courses, loadedAdminDashboardGet, loadedCourseList } = controller;
  const loading = !loadedAdminDashboardGet || !loadedCourseList;

  const onAllSelect = () => {
    setModalOpen(false);
    setSelection({});
    onCourseChange(null);
  };

  const onCourseSelect = (course) => {
    setSelection(course);
    onCourseChange(course.id);
  };
  const handlePageChange = (page, pageSize) => actionCourseList(dispatch, { page, page_size: pageSize });

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
      name: <VText></VText>,
      cell: rw => <VButton onClick={() => { onCourseSelect(rw); setModalOpen(false); }}>{t('Select')}</VButton>,
      width: '140px'
    },
  ];

  return <>

    <VButton variant="outlined" color="secondary" className="text-sm normal-case w-full h-10 text-limit-1" onClick={() => { setModalOpen(true); }}>
      {
        selCourse.display_name ?
          <VText className="text-limit-1">{selCourse.display_name}</VText>
          :
          <VText className="flex items-center" div><Icon icon="akar-icons:plus" />&nbsp;{t('Select a course')}</VText>
      }
    </VButton>

    <BModal open={modalOpen} setOpen={setModalOpen} width='90vw' height='fit-content' className="w-full max-w-xl h-full max-h-150">

      <div className="px-8 pt-8 flex justify-between">
        <VText className="text-2xl" div>{t('Select a course')}</VText>
        <VButton variant="contained" color="primary" className="text-sm ml-auto normal-case" onClick={onAllSelect}>
          {t('All')}
        </VButton>
      </div>

      <Divider className="bg-gray-200 dark:bg-gray-500 mt-4" />

      <BTable
        key={loading}
        columns={columns}
        data={courses.data}
        total={courses.total}
        loading={loading}
        page={courses.page}
        pageSize={courses.page_size}
      />

      <BGPagination
        handlePageChange={handlePageChange}
        total={courses.total}
        initPage={courses.page}
        initSize={courses.page_size}
      />
    </BModal>

  </>;
};

export default DashboardSelectCourse;