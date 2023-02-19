import { Grid, Tab, Tabs, Divider, CircularProgress } from "@mui/material";
import React, { useState, useMemo } from "react";
import { Icon } from '@iconify/react';
import { useConfirm } from "material-ui-confirm";
import { useTranslation } from 'react-i18next';

import { VText, VAvatar, VButton, VInput } from "../../form";
import { BGPagination, BPopOver, BTable } from "../../components";
import { useAsterController } from "../../context";
import { actionSMSLogDelete, actionSMSLogList } from "../../context/action";
import { getFormatDate } from '../../utils/string';
import { downloadCSV, downloadHTML } from "../../utils/csv";

const SmsLogs = () => {

  const { t, i18n } = useTranslation('common');
  const confirm = useConfirm();

  const [controller, dispatch] = useAsterController();
  const { smsLogs, loadedAdminDashboardGet, loadedSMSLogList } = controller;
  const loading = !loadedAdminDashboardGet || !loadedSMSLogList;

  const [tab, setTab] = useState(0);
  const [term, setTerm] = useState('');

  const showList = useMemo(() => {
    const tmp = term.toLowerCase();
    return (smsLogs.data || []).filter(v => v.fullname?.toLowerCase()?.includes(tmp) || v.to?.toLowerCase()?.includes(tmp) || v.type?.toLowerCase()?.includes(tmp));
  }, [smsLogs.data, term]);

  const handleSetTabValue = (_, newValue) => setTab(newValue);
  const handlePageChange = (page, pageSize) => actionSMSLogList(dispatch, { page, page_size: pageSize });

  const onDelete = (idx) => {
    confirm({
      title: t("Are you sure?"),
      confirmationText: t("OK"),
      cancellationText: t("Cancel"),
      description: t("Are you going to delete this item?")
    })
      .then(() => actionSMSLogDelete(dispatch, smsLogs.data[idx].id, t))
      .catch(() => { });
  };

  const columns = [
    {
      name: <VText>{t('Avatar')}</VText>,
      selector: rw => rw.fullname,
      cell: rw => <div className="flex items-center" >
        <VAvatar src={rw.avatar} />
        <div className="ml-4">
          <VText div>{rw.fullname}</VText>
          <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5">{t(rw.permission)}</VText>
        </div>
      </div>,
      grow: 1,
      sortable: true,
      minWidth: '220px'
    },
    {
      name: <VText>{t('Contact')}</VText>,
      selector: row => row.to,
      cell: rw => <VText className="break-all flex items-center" div>
        <Icon icon="eva:email-outline" className="text-gray-400 w-6 flex-shrink-0" />&nbsp;{rw.to}
      </VText>,
      sortable: true,
      minWidth: '300px'
    },
    {
      name: <VText>{t("Type")}</VText>,
      selector: row => row.type,
      cell: rw => <VText>{rw.type}</VText>,
      sortable: true,
      minWidth: '200px'
    },
    {
      name: <VText>{t('Date Added')}</VText>,
      selector: row => row.time,
      cell: rw => <VText>{getFormatDate(rw.time, i18n.language)}</VText>,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: <VText>{t('Action')}</VText>,
      cell: (rw, idx) => <VButton variant="text" color="warning" className="px-5 py-1 justify-start" onClick={() => onDelete(idx)}>
        <Icon icon="mi:delete" />&nbsp;Delete
      </VButton>,
      minWidth: '150px'
    },
  ];

  const exportColumns = [
    { header: t("Type"), accessor: "type", type: "text" },
    { header: t("Email"), accessor: "to", type: "text" },
    { header: t("Username"), accessor: "fullname", type: "text" },
    { header: t("Permission"), accessor: "permission", type: "text" },
    { header: t("Time"), accessor: "time", type: "date" },
  ];

  return <div>

    <div className="p-4 md:p-8">
      <VText className="text-2xl" div>{t("Logs")}</VText>
      <VText color="secondary">{t("Learner email notification list")}</VText>
    </div>
    <div className="bg-gray-50 dark:bg-gray-700 w-full flex-wrap flex py-3 px-8 items-center">
      <VInput startIcon="search" size="small" className="m-1 w-full sm:w-max" inputClassName="pt-1 py-1 mt-px" value={term} setValue={val => setTerm(val)} />
      <div className="flex m-1">
        <VButton variant="outlined" color="secondary" size="normal" className="text-sm normal-case">
          <Icon icon="ant-design:filter-filled" />&nbsp;{t('Filter')}
        </VButton>
      </div>

      <div className="h-8 ml-auto v-tab-switch flex">
        <Tabs orientation="horizontal" value={tab} onChange={handleSetTabValue}>
          <Tab icon={<Icon className="mr-0" icon="akar-icons:grid" />} />
          <Tab icon={<Icon className="mr-0" icon="ci:list-checklist" />} />
        </Tabs>

        <BPopOver className="ml-4" trigger={
          <VButton variant="outlined" className="normal-case" size="small">
            <Icon icon="ep:setting" />&nbsp;{t("Menu")}&nbsp;
            <Icon icon="akar-icons:chevron-down" />
          </VButton>
        }>
          <div className="flex flex-col">
            <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full" onClick={() => downloadCSV(exportColumns, smsLogs, "smsLogs")}>
              <Icon icon="ph:file-csv" />&nbsp;{t("Export CSV")}
            </VButton>
            <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full" onClick={() => downloadHTML(exportColumns, smsLogs, "smsLogs")}>
              <Icon icon="ph:file-html" />&nbsp;{t("Export HTML")}
            </VButton>
          </div>
        </BPopOver>

      </div>
    </div>

    <div>
      {
        tab === 0 && <div className="px-4 py-4 md:px-8 md:py-8">
          <Grid container spacing={3}>
            {
              loading ?
                <div className="w-full h-40 flex justify-center items-center">
                  <CircularProgress color="primary" />
                </div>
                :
                showList.map((rw, idx) =>
                  <Grid key={rw._id} item xs={6} sm={3} lg={2} xl={1}>
                    <div className="border border-solid border-gray-300 rounded-md">
                      <div className="px-4 py-3 flex items-center">
                        <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5 w-max flex items-center h-min">
                          <Icon icon="ic:outline-published-with-changes" />&nbsp;{t("LOG")}
                        </VText>
                      </div>
                      <div className="p-4 text-center">
                        <VText className="text-limit-1" div>{rw.type}</VText>
                        <VText className="text-limit-1 mt-4" div>{rw.to}</VText>
                        <VText className="text-limit-1 mt-4">{getFormatDate(rw.time, i18n.language)}</VText>
                      </div>
                      <Divider className="bg-gray-200 dark:bg-gray-500" />
                      <div className="p-4">
                        <VButton variant="outlined" color="warning" className="px-5 py-2 w-full" onClick={() => onDelete(idx)}>
                          <Icon icon="mi:delete" />&nbsp;{t("Delete")}
                        </VButton>
                      </div>
                    </div>
                  </Grid>
                )
            }
          </Grid>

        </div>
      }
      {
        tab === 1 && <BTable
          key={`${loading}${showList.length}`}
          columns={columns}
          data={showList}
          total={smsLogs.total}
          loading={loading}
        />
      }
      <BGPagination
        handlePageChange={handlePageChange}
        total={smsLogs.total}
        initPage={smsLogs.page}
        initSize={smsLogs.page_size}
      />
    </div>

  </div>;
};

export default SmsLogs;