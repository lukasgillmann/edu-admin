import { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';

import VText from "../../form/VText";
import BTable from '../../components/BTable';
import VButton from '../../form/VButton';
import { VSelect } from '../../form';
import { FREQ_OPTIONS, getFormatDate } from '../../utils/string';
import { useAsterController } from '../../context';
import { BGPagination, BPopOver } from '../../components';
import { actionAnaModuleList } from '../../context/action';
import { numberInputs } from '../../utils/tool';
import Skeleton from 'react-loading-skeleton';
import BPdfExporter from '../../components/BPdfExporter';

const TrackDetailModule = () => {

  const { t, i18n } = useTranslation('common');

  const { userId } = numberInputs(useParams());

  const [controller, dispatch] = useAsterController();
  const { anaModules, loadedAdminUserInspectGet, loadedAnaModuleList } = controller;
  const loading = !loadedAdminUserInspectGet || !loadedAnaModuleList;

  const [option, setOption] = useState('');
  const [term, setTerm] = useState('');

  const showList = useMemo(() => {
    const tmp = term.toLowerCase();
    return (anaModules.data || []).filter(v => v.course_title?.toLowerCase()?.includes(tmp) || v.details.module_title?.toLowerCase()?.includes(tmp));
  }, [anaModules.data, term]);

  const handlePageChange = (page, pageSize) => actionAnaModuleList(dispatch, { user_id: userId, page, page_size: pageSize });

  const columns = [
    {
      name: <VText>{t('Date')}</VText>,
      selector: row => row.date,
      cell: rw => <VText>{getFormatDate(rw.date, i18n.language)}</VText>,
      minWidth: '150px',
      sortable: true
    },
    {
      name: <VText>{t('Course Title')}</VText>,
      selector: row => row.course_title,
      cell: rw => <VText>{rw.course_title}</VText>,
      minWidth: '250px',
      sortable: true
    },
    {
      name: <VText>{t('Module Title')}</VText>,
      selector: row => row.details.module_title,
      cell: rw => <VText>{rw.details.module_title}</VText>,
      minWidth: '250px',
      sortable: true
    },
    {
      name: <VText>{t('Grade')}</VText>,
      selector: row => row.details.correct_count,
      cell: rw => <VText>{rw.details.total_count ? Math.round(rw.details.correct_count * 100 / rw.details.total_count) : 0} %</VText>,
      sortable: true
    },
    {
      name: <VText>{t('Quiz Spent')}</VText>,
      selector: row => row.details.quiz_spent,
      cell: rw => <VText>{Math.round(rw.details.quiz_spent / 60)}</VText>,
      minWidth: '150px',
      sortable: true
    },
    {
      name: <VText>{t('Total Spent')}</VText>,
      selector: row => row.details.total_spent,
      cell: rw => <VText>{Math.round(rw.details.total_spent / 60)}</VText>,
      minWidth: '150px',
      sortable: true
    },
  ];

  return <>

    <Grid container spacing={3} className="mt-6">
      <Grid item sm={12} md={4} className="flex">
        <VText className="text-2xl">{t("Progross by module")}</VText>
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
          filename={`${t("Progross by module")}.pdf`}
          title={t("Progross by module")}
          columns={columns}
          rows={anaModules.data}
          maxWidth="max-w-6xl"
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

    {
      loading ?
        <Skeleton count={5} className="w-full h-12 mt-2" />
        :
        <BTable
          key={`${loading}${showList.length}`}
          columns={columns}
          data={showList}
          total={anaModules.total}
          loading={loading}
        />
    }

    <BGPagination
      handlePageChange={handlePageChange}
      total={anaModules.total}
      initPage={anaModules.page}
      initSize={anaModules.page_size}
    />
  </>;
};

export default TrackDetailModule;