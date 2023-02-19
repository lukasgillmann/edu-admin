import { Grid, Tab, Tabs, Divider, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { VText, VButton, VInput } from "../../form";
import { BPopOver, BTable } from "../../components";
import { useAsterController } from "../../context";
import { downloadCSV, downloadHTML } from "../../utils/csv";
import { getFormatDate } from "../../utils/string";

const SmsManagement = () => {

  const { t, i18n } = useTranslation('common');

  const [controller] = useAsterController();
  const { smsTemplates, loadedAdminDashboardGet, loadedSMSTemplateList } = controller;
  const loading = !loadedAdminDashboardGet || !loadedSMSTemplateList;

  const [tab, setTab] = useState(0);
  const [term, setTerm] = useState('');

  const showList = useMemo(() => {
    const tmp = term.toLowerCase();
    return (smsTemplates || []).filter(v => v.type?.toLowerCase()?.includes(tmp) || v.content?.toLowerCase()?.includes(tmp));
  }, [smsTemplates, term]);

  const handleSetTabValue = (_, newValue) => setTab(newValue);

  const columns = [
    {
      name: <VText>{t("Type")}</VText>,
      selector: rw => rw.type,
      cell: rw => <VText div>{rw.type}</VText>,
      grow: 1,
      sortable: true,
      minWidth: '220px'
    },
    {
      name: <VText>{t('Content')}</VText>,
      selector: row => row.content,
      cell: rw => <VText className="text-limit-2" div>{rw.content}</VText>,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: <VText>{t("Enabled")}</VText>,
      selector: row => row.enabled,
      cell: rw => <VText div>{rw.enabled}</VText>,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: <VText>{t('Variable')}</VText>,
      selector: row => row.variable.length,
      cell: rw => <VText className="text-limit-2" div>{rw.variable.length}</VText>,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: <VText>{t('Updated')}</VText>,
      selector: row => row.updated,
      cell: rw => <VText className="text-limit-2" div>{getFormatDate(rw.updated, i18n.language)}</VText>,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: <VText>{t('Action')}</VText>,
      cell: (rw, idx) => <Link to={`/notifications/sms/edit/${idx}`} className="no-underline">
        <VButton variant="text" className="w-full normal-case">
          <Icon icon="eva:edit-outline" className="text-xl" />&nbsp;{t('Edit')}
        </VButton>
      </Link>,
      minWidth: '150px'
    }
  ];

  const exportColumns = [
    { header: t("Author"), accessor: "avatar", type: "img" },
    { header: t("Username"), accessor: "author_fullname", type: "text" },
    { header: t("Content"), accessor: "content", type: "text" },
    { header: t("Course"), accessor: "course", type: "text" },
    { header: t("Section"), accessor: "section_title", type: "text" },
    { header: t("Sequence"), accessor: "sequence_title", type: "text" },
    { header: t("Vertical"), accessor: "vertical_title", type: "text" },
    { header: t("Created"), accessor: "created", type: "date" },
  ];

  return <div>
    <div className="p-4 md:p-8">
      <VText className="text-2xl" div>{t("SMS Management")}</VText>
      <VText color="secondary">{t("User sms notification list")}</VText>
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
            <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full" onClick={() => downloadCSV(exportColumns, smsTemplates, "smsTemplates")}>
              <Icon icon="ph:file-csv" />&nbsp;{t("Export CSV")}
            </VButton>
            <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full" onClick={() => downloadHTML(exportColumns, smsTemplates, "smsTemplates")}>
              <Icon icon="ph:file-html" />&nbsp;{t("Export HTML")}
            </VButton>
          </div>
        </BPopOver>

      </div>
    </div>

    <div className="px-8 my-3">
      <VText className="text-2xl">{smsTemplates.length}</VText>&nbsp;
      <VText color="secondary" className="text-2xl">{t('SMS')}</VText>
    </div>

    <div>
      {
        tab === 0 && <div className="px-4 pb-4 md:px-8 md:pb-8">
          <Grid container spacing={3}>
            {
              loading ?
                <div className="w-full h-40 flex justify-center items-center">
                  <CircularProgress color="primary" />
                </div>
                :
                showList.map((rw, idx) =>
                  <Grid key={rw.id} item xs={12} sm={6} lg={4} xl={3}>
                    <div className="border border-solid border-gray-300 rounded-md">
                      <div className="px-4 py-3 flex items-center">
                        <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5 w-max flex items-center h-min uppercase">
                          <Icon icon="ic:outline-published-with-changes" />&nbsp;{t("MESSAGE")}
                        </VText>
                      </div>
                      <div className="p-4">
                        <VText className="text-limit-1">{rw.type}</VText>
                        <div className="flex mt-4">
                          <VText color="secondary" className="text-sm text-limit-1" div>
                            {rw.content || '-'}
                          </VText>
                        </div>
                      </div>
                      <Divider className="bg-gray-200 dark:bg-gray-500" />
                      <div className="flex">
                        <div className="flex-1 p-4 border-0 border-r border-solid border-gray-300">
                          <VText color="primary" div className="text-sm">{t("Variables")}</VText>
                          <VText className="flex items-center text-lg"><Icon icon="bi:check-circle" />&nbsp;{rw.variable.length}</VText>
                        </div>
                        <div className="flex-1 p-4">
                          <VText color="secondary" div className="text-sm">{t("Updated At")}</VText>
                          <div className="flex items-center text-lg">
                            <Icon icon="fe:smile" className="flex-shrink-0" />
                            <VText className="text-limit-1 ml-1">{getFormatDate(rw.updated, i18n.language)}</VText>
                          </div>
                        </div>
                      </div>
                      <Divider className="bg-gray-200 dark:bg-gray-500" />
                      <div className="p-4">
                        <Link to={`/notifications/sms/edit/${idx}`} className="no-underline">
                          <VButton variant="outlined" className="w-full normal-case">
                            <Icon icon="eva:edit-outline" className="text-xl" />&nbsp;{t('Edit')}
                          </VButton>
                        </Link>
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
          total={smsTemplates.length}
        />
      }
    </div>

  </div>;
};

export default SmsManagement;