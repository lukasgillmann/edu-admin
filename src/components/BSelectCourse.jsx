import { Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import { VButton, VText } from "../form";
import { useAsterController } from "../context";
import { actionCourseList } from "../context/action";
import { getCourseImageUrl } from "../utils/string";
import BGPagination from "./BGPagination";
import BModal from "./BModal";
import BTable from "./BTable";

const BSelectCourse = (props) => {

  const { t } = useTranslation('common');

  const { preSelected, setSelections } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [joined, setJoined] = useState([]);

  const [controller, dispatch] = useAsterController();
  const { courses, loadedAdminDashboardGet, loadedCourseList } = controller;
  const loading = !loadedAdminDashboardGet || !loadedCourseList;

  useEffect(() => preSelected.length && setJoined(preSelected), [preSelected]);
  const handlePageChange = (page, pageSize) => actionCourseList(dispatch, { page, page_size: pageSize });

  const onSelectChange = (data) => {
    setOptions(prev => {
      const diffs = prev.filter(({ id: id1 }) => !data.some(({ id: id2 }) => id2 === id1));
      const removedId = diffs.length === 1 && courses.data.map(v => v.id)?.includes(diffs[0].id) ? diffs[0].id : null;

      // Remove duplicates
      let joinData = [...joined, ...data];
      const ids = joinData.map(o => o.id);
      joinData = joinData.filter(({ id }, index) => !ids.includes(id, index + 1));
      joinData = removedId ? joinData.filter(v => v.id !== removedId) : joinData;
      setJoined(joinData);

      return data;
    });
  };

  const onAssign = () => {
    setSelections(joined);
    setModalOpen(false);
  };

  const columns = [
    {
      name: <VText>{t('Image')}</VText>,
      selector: row => row.avatar,
      cell: rw => <div className="w-32 h-16 rounded bg-cover bg-center bg-gray-100 dark:bg-gray-700" style={{ backgroundImage: `url(${getCourseImageUrl(rw.course_image_url)})` }} />,
      minWidth: '130px',
      sortable: true
    },
    {
      name: <VText>{t('Title')}</VText>,
      selector: row => row.display_name,
      cell: rw => <VText>{rw.display_name}</VText>,
      sortable: true
    },
    {
      name: <VText>{t('Description')}</VText>,
      selector: row => row.short_description,
      cell: rw => <VText div className="text-limit-2">{rw.short_description}</VText>,
      sortable: true
    },
  ];

  return <>

    <VButton variant="outlined" color="body" className="text-sm normal-case w-full mt-2 h-10" onClick={() => { setModalOpen(true); }}>
      <Icon icon="akar-icons:plus" />&nbsp;
      {t('Select Courses')}
    </VButton>

    <BModal open={modalOpen} setOpen={setModalOpen} width='90vw' height='fit-content' className="w-full max-w-xl h-full max-h-150">

      <div className="px-8 pt-8 flex justify-between">
        <VText className="text-2xl" div>{t('Assign New Courses')}</VText>
        <VButton variant="contained" color="primary" className="text-sm ml-auto normal-case" onClick={onAssign} disabled={!options.length}>
          {t('Assign')}
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
        selectableRowSelected={row => joined.map(v => v.id)?.includes(row.id)}
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

export default BSelectCourse;