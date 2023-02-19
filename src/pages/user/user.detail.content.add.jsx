import { Divider } from "@mui/material";
import React, { useState } from "react";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import { VButton, VText } from "../../form";
import { BGPagination, BModal, BTable } from "../../components";
import { useAsterController } from "../../context";
import { actionCourseList, actionUserAssignCourses } from "../../context/action";
import { getCourseImageUrl, getFormatDate } from "../../utils/string";
import toaster from "../../utils/toast.msg";

const UserDetailContentAdd = (props) => {

  const { t, i18n } = useTranslation('common');

  const { userId } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectCourses, setSelectCourses] = useState([]);

  const [controller, dispatch] = useAsterController();
  const { courses, loadedAdminDashboardGet, loadedCourseList, loadedUserCourseAssign, userCourses, dashboardInfo } = controller;

  const licenseNumber = dashboardInfo?.license_number || { license_available: 0 };

  const loading = !loadedAdminDashboardGet || !loadedCourseList;

  const handlePageChange = (page, pageSize) => actionCourseList(dispatch, { page, page_size: pageSize });
  const onSelectChange = (data) => setSelectCourses(data);
  const onAssign = () => {

    if (selectCourses.length > licenseNumber.license_available) {
      toaster({ type: "error", title: t("License limit error!"), body: t("Please contact your sales manager to update your licenses credits!") });
      return;
    }

    actionUserAssignCourses(dispatch, { user_id: userId, courses: selectCourses }, t);
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
      name: <VText>{t("End")}</VText>,
      selector: row => row.run_end,
      cell: rw => <VText>{getFormatDate(rw.run_end, i18n.language)}</VText>,
      sortable: true
    },
  ];

  return <>

    <VButton variant="contained" color="primary" className="text-sm ml-2 normal-case" onClick={() => { setSelectCourses([]); setModalOpen(true); }} disabled={!userId}>
      <Icon icon="akar-icons:plus" />&nbsp;
      {t('Assign Course')}
    </VButton>

    <BModal open={modalOpen} setOpen={setModalOpen} width='90vw' height='fit-content' className="w-full max-w-3xl h-full max-h-150">

      <div className="px-8 pt-8 flex justify-between">
        <VText className="text-2xl" div>{t('Assign New Courses')}</VText>
        <VButton variant="contained" color="primary" className="text-sm ml-2 normal-case" onClick={onAssign} disabled={!selectCourses.length} loading={!loadedUserCourseAssign}>
          {t("Assign")}
        </VButton>
      </div>

      <Divider className="bg-gray-200 dark:bg-gray-500 mt-4" />

      <BTable
        key={loading}
        columns={columns}
        data={courses.data}
        total={courses.total}
        loading={loading}
        isSelect
        onSelectChange={onSelectChange}
        selectableRowDisabled={row => userCourses.map(v => v.id).includes(row.id)}
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

export default UserDetailContentAdd;