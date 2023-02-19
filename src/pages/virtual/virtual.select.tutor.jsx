import { Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import { VAvatar, VButton, VText } from "../../form";
import { BGPagination, BModal, BTable } from "../../components";
import { useAsterController } from "../../context";
import { actionTutorList } from "../../context/action";

const VirtualTutorSelect = (props) => {

  const { t } = useTranslation('common');

  const { preSelected, setSelections } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [joined, setJoined] = useState([]);

  const [controller, dispatch] = useAsterController();
  const { tutors, loadedAdminDashboardGet, loadedTutorList } = controller;
  const loading = !loadedAdminDashboardGet || !loadedTutorList;

  useEffect(() => preSelected.length && setJoined(preSelected), [preSelected]);
  const handlePageChange = (page, pageSize) => actionTutorList(dispatch, { page, page_size: pageSize });

  const onSelectChange = (data) => {
    setOptions(prev => {
      const diffs = prev.filter(({ id: id1 }) => !data.some(({ id: id2 }) => id2 === id1));
      const removedId = diffs.length === 1 && tutors.data.map(v => v.id)?.includes(diffs[0].id) ? diffs[0].id : null;

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
    const oneItem = joined.length ? [joined[joined.length - 1]] : [];
    setSelections(oneItem);
    setJoined(oneItem);
    setModalOpen(false);
  };

  const columns = [
    {
      name: <VText>{t('Avatar')}</VText>,
      selector: rw => `${rw.first_name} ${rw.last_name}`,
      cell: rw => <div className="flex items-center" >
        <VAvatar src={rw.avatar ? rw.avatar : ""} />
        <div className="ml-4">
          <VText div>{rw.first_name} {rw.last_name}</VText>
          <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5">{t("Tutor")}</VText>
        </div>
      </div>,
      grow: 1,
      sortable: true,
      minWidth: '220px'
    },
    {
      name: <VText>{t('Country')}</VText>,
      selector: row => row.country,
      cell: rw => <VText>{rw.country}</VText>,
      sortable: true,
      grow: 0,
    },
    {
      name: <VText>{t('Gender')}</VText>,
      selector: row => row.gender,
      cell: rw => <VText>{rw.gender === 'm' ? t('Male') : t('Female')}</VText>,
      sortable: true,
      minWidth: '150px'
    },
  ];

  return <>

    <VButton variant="outlined" color="body" className="text-sm normal-case w-full mt-2 h-10" onClick={() => { setModalOpen(true); }}>
      <Icon icon="akar-icons:plus" />&nbsp;
      {t('Select tutors')}
    </VButton>

    <BModal open={modalOpen} setOpen={setModalOpen} width='90vw' height='fit-content' className="w-full max-w-xl h-full max-h-150">

      <div className="px-8 pt-8 flex justify-between">
        <VText className="text-2xl" div>{t('Assign New tutors')}</VText>
        <VButton variant="contained" color="primary" className="text-sm ml-auto normal-case" onClick={onAssign} disabled={!options.length}>
          {t('Assign')}
        </VButton>
      </div>

      <Divider className="bg-gray-200 dark:bg-gray-500 mt-4" />

      <BTable
        key={loading}
        columns={columns}
        data={tutors.data}
        total={tutors.total}
        loading={loading}
        isSelect
        onSelectChange={onSelectChange}
        selectableRowSelected={row => joined.map(v => v.id)?.includes(row.id)}
        page={tutors.page}
        pageSize={tutors.page_size}
      />

      <BGPagination
        handlePageChange={handlePageChange}
        total={tutors.total}
        initPage={tutors.page}
        initSize={tutors.page_size}
      />
    </BModal>

  </>;
};

export default VirtualTutorSelect;