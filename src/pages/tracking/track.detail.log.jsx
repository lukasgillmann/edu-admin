import { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';

import VText from "../../form/VText";
import BTable from '../../components/BTable';
import VButton from '../../form/VButton';
import { VSelect } from '../../form';
import { FREQ_OPTIONS, getShortDate, getShortTime } from '../../utils/string';
import { useAsterController } from '../../context';
import { BGPagination, BPopOver } from '../../components';
import { actionAnaUserLogList } from '../../context/action';
import { numberInputs } from '../../utils/tool';
import BPdfExporter from '../../components/BPdfExporter';

const TrackDetailLog = () => {

  const { t } = useTranslation('common');

  const { userId } = numberInputs(useParams());

  const [controller, dispatch] = useAsterController();
  const { anaUserLogins, loadedAdminUserInspectGet, loadedAnaUserLoginList } = controller;
  const loading = !loadedAdminUserInspectGet || !loadedAnaUserLoginList;

  const [option, setOption] = useState('');
  const [term, setTerm] = useState('');

  const showList = useMemo(() => {
    const tmp = term.toLowerCase();
    return (anaUserLogins.data || []).filter(v => v.device?.toLowerCase()?.includes(tmp) || v.ip_address?.toLowerCase()?.includes(tmp) || v.browser?.toLowerCase()?.includes(tmp));
  }, [anaUserLogins.data, term]);

  const handlePageChange = (page, pageSize) => actionAnaUserLogList(dispatch, { user_id: userId, page, page_size: pageSize });

  const columns = [
    {
      name: <VText>{t('Date')}</VText>,
      selector: row => row.date,
      cell: rw => <VText>{getShortDate(rw.date)} - {getShortTime(rw.date)}</VText>,
      sortable: true
    },
    {
      name: <VText>{t('Device')}</VText>,
      selector: row => row.device,
      cell: rw => <VText>{rw.device}</VText>,
      sortable: true
    },
    {
      name: <VText>{t('IP Address')}</VText>,
      selector: row => row.ip_address,
      cell: rw => <VText>{rw.ip_address}</VText>,
      sortable: true
    },
    {
      name: <VText>{t('Browser')}</VText>,
      selector: row => row.browser,
      cell: rw => <VText>{rw.browser}</VText>,
      sortable: true
    }
  ];

  return <>

    <Grid container spacing={6} className="mt-6">
      <Grid item sm={12} md={4} className="flex">
        <VText className="text-2xl">{t("Logs history")}</VText>
      </Grid>
      <Grid item sm={12} md={8} className="flex justify-center md:justify-end flex-wrap items-center">
        <VButton variant="text" color="secondary" className="text-sm normal-case" onClick={() => setTerm('')} disabled={!term}>
          <Icon icon="akar-icons:circle-check" />&nbsp;{t('All status')}
        </VButton>
        <BPopOver className="ml-2" autoClose={false} trigger={
          <VButton variant="text" color="secondary" className="text-sm normal-case">
            <Icon icon="ant-design:filter-filled" />&nbsp;{t('Filter')}
          </VButton>
        }>
          <TextField className="w-64" size="small" value={term} onChange={e => setTerm(e.target.value)} />
        </BPopOver>

        <BPdfExporter
          filename={`${t("Logs history")}.pdf`}
          title={t("Logs history")}
          columns={columns}
          rows={anaUserLogins.data}
        />

        <VSelect
          className="w-32 ml-2"
          inputClassName="py-2"
          option={option}
          setOption={setOption}
          items={FREQ_OPTIONS}
          label={t("Occurrency")}
          size="small"
        />
      </Grid>
    </Grid>


    <BTable
      key={`${loading}${showList.length}`}
      columns={columns}
      data={showList}
      total={anaUserLogins.total}
      loading={loading}
    />

    <BGPagination
      handlePageChange={handlePageChange}
      total={anaUserLogins.total}
      initPage={anaUserLogins.page}
      initSize={anaUserLogins.page_size}
    />
  </>;
};

export default TrackDetailLog;