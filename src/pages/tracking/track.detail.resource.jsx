import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { useState, useMemo } from 'react';
import { circularProgressClasses } from '@mui/material/CircularProgress';

import VText from "../../form/VText";
import BTable from '../../components/BTable';
import VButton from '../../form/VButton';
import { VImage } from '../../form';
import BProgressBar from '../../components/BProgressBar';
import { useAsterController } from '../../context';
import { actionAnaCourseGradeList } from '../../context/action';
import { BGPagination, BPopOver } from '../../components';
import { formatTimeSpent, getCourseImageUrl, getFormatDate } from '../../utils/string';
import TrackDetailResourceExpand from './track.detail.resource.expand';
import { numberInputs } from '../../utils/tool';
import TrackDetailReport from './track.detail.report';

const TrackDetailResource = () => {

  const { t, i18n } = useTranslation('common');

  const { userId, page, pageSize } = numberInputs(useParams());

  const [controller, dispatch] = useAsterController();
  const { anaCourseGrades, users, loadedAdminUserInspectGet, loadedAnaCourseGradeList } = controller;
  const loading = !loadedAdminUserInspectGet || !loadedAnaCourseGradeList;

  const [term, setTerm] = useState('');

  const currUser = useMemo(() => users.page === page && users.page_size === pageSize ? users.data.find(v => v.id === userId) || {} : {}, [page, pageSize, users, userId]);
  const showList = useMemo(() => {
    const tmp = term.toLowerCase();
    return (anaCourseGrades.data || []).filter(v => v.course_title?.toLowerCase()?.includes(tmp));
  }, [anaCourseGrades.data, term]);

  const handlePageChange = (page, pageSize) => actionAnaCourseGradeList(dispatch, { user_id: userId, page, page_size: pageSize });

  const columns = [
    {
      name: <VText>{t('Course')}</VText>,
      selector: row => row.course_title,
      cell: rw => <div className="flex items-center">
        <VImage src={getCourseImageUrl(rw.course_image_url)} className="w-14 h-8 rounded" />
        <VText className="text-limit-1 ml-4">{rw.course_title}</VText>
      </div>,
      minWidth: '250px',
      grow: 3,
      sortable: true
    },
    {
      name: <VText>{t('Grade')}</VText>,
      selector: row => row.grade,
      cell: rw => <BProgressBar className="w-32 text-xs" label={t("Grade")} value={Math.round(rw.grade * 100)} success={rw.grade > rw.cutoff} />,
      minWidth: '150px',
      sortable: true
    },
    {
      name: <VText>{t('Progress')}</VText>,
      selector: row => row.progress,
      cell: rw => <div className="flex items-center justify-center relative">
        <div className="relative flex items-center" style={{ transform: 'scale(-1, 1)' }}>
          <CircularProgress variant="determinate" className="text-gray-200 w-12 h-12" size={40} thickness={4} value={100} />
          <CircularProgress
            variant="determinate"
            className="color-primary absolute left-0 w-12 h-12"
            sx={{ [`& .${circularProgressClasses.circle}`]: { strokeLinecap: 'round' } }}
            size={40}
            thickness={4}
            value={rw.progress}
          />
        </div>
        <div className="flex absolute w-full h-full top-0 left-0 items-center justify-center">
          <VText className="text-xs">{rw.progress}%</VText>
        </div>
      </div>,
      minWidth: '120px',
      sortable: true
    },
    {
      name: <VText>{t('Total Spent')}</VText>,
      selector: row => row.total_spent,
      cell: rw => <VText>{formatTimeSpent(rw.total_spent)}</VText>,
      sortable: true
    },
    {
      name: <VText>{t("Quiz Spent")}</VText>,
      selector: row => row.quiz_spent,
      cell: rw => <VText>{formatTimeSpent(rw.quiz_spent)}</VText>,
      minWidth: '150px',
      sortable: true
    },
    {
      name: <VText>{t('Date Assigned')}</VText>,
      cell: rw => <VText>{getFormatDate(rw.enroll_start, i18n.language)}</VText>,
      minWidth: '120px'
    },
    {
      name: "",
      cell: rw => <TrackDetailReport currUser={currUser} text={t("Download")} courseId={rw.course_id} />,
      minWidth: '180px'
    },
  ];

  return <>

    <Grid container spacing={6} className="mt-6">
      <Grid item sm={12} md={4} className="flex">
        <VText className="text-2xl">{t("Resources")}</VText>
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
          total={anaCourseGrades.total}
          loading={loading}
          expandableRows
          className="w-full"
          expandableRowsComponent={TrackDetailResourceExpand}
        />
    }
    <BGPagination
      handlePageChange={handlePageChange}
      total={anaCourseGrades.total}
      initPage={anaCourseGrades.page}
      initSize={anaCourseGrades.page_size}
    />
  </>;
};

export default TrackDetailResource;