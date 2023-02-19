
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useState } from "react";

import { VButton, VText } from "../../form";
import { BGPagination, BModal, BTable } from "../../components";
import { useAsterController } from "../../context";
import { getCourseImageUrl, getFormatDate } from "../../utils/string";
import { actionCategoryAssignCourses, actionCourseList } from "../../context/action";

const CategoryDetailCourse = (props) => {

  const { t, i18n } = useTranslation('common');

  const { currCategory } = props;

  const [controller, dispatch] = useAsterController();
  const { courses, loadedAdminDashboardGet, loadedCourseList, loadedCategoryCourseAssign } = controller;

  const loading = !loadedAdminDashboardGet || !loadedCourseList;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectCourses, setSelectCourses] = useState([]);

  const onSelectChange = (data) => setSelectCourses(data);
  const handlePageChange = (page, pageSize) => actionCourseList(dispatch, { page, page_size: pageSize });

  const onSubmit = () => {
    actionCategoryAssignCourses(dispatch, { category_id: currCategory.id, name: currCategory.name, courses: selectCourses }, t);
    setModalOpen(false);
  };
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
      sortable: true,
      grow: 3
    },
    {
      name: <VText>{t('Start')}</VText>,
      selector: row => row.run_start,
      cell: rw => <VText>{getFormatDate(rw.run_start, i18n.language)}</VText>,
      sortable: true
    },
    {
      name: <VText>{t('End')}</VText>,
      selector: row => row.run_end,
      cell: rw => <VText>{getFormatDate(rw.run_end, i18n.language)}</VText>,
      sortable: true
    },
  ];

  return <>

    <VButton variant="contained" color="primary" className="text-sm ml-2 normal-case" onClick={() => { setSelectCourses([]); setModalOpen(true); }}>
      <Icon icon="akar-icons:plus" />&nbsp;
      {t('Assign Course')}
    </VButton>

    <BModal open={modalOpen} setOpen={setModalOpen} width='90vw' height='fit-content' className="w-full max-w-3xl h-full max-h-150" >
      <div className="p-4 md:p-8">
        <div className="flex items-center flex-wrap mt-6">
          <div>
            <VText className="text-2xl" div>{t('Add Category')}</VText>
            <VText color="secondary" className="text-sm">
              {t('Add category information here')}
            </VText>
          </div>
          <VButton variant="contained" className="ml-auto" onClick={onSubmit} loading={!loadedCategoryCourseAssign}>
            <Icon icon="ant-design:save-outlined" className="text-xl" />&nbsp;{t('Save')}
          </VButton>
        </div>

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
      </div >
    </BModal>
  </>;
};

export default CategoryDetailCourse;