import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { VButton, VText } from '../../form';
import { BTable } from '../../components';
import { useAsterController } from '../../context';
import { formatTimeSpent, getFormatDate, getShortTime, getUserName } from '../../utils/string';
import TrackDetailReportResource from './track.detail.report.resource';
import { Grid } from '@mui/material';
import asterAxios from '../../utils/api';
import { Q_ADMIN_USER_REPORT_GET } from '../../context/query';

const TABLE_ROWS = 25;
const MX = 30, MY = 40;

const TrackDetailReport = (props) => {

  const { currUser, text, courseId } = props;

  const { t, i18n } = useTranslation('common');

  const [controller, dispatch] = useAsterController();
  const { anaCourseGrades } = controller;

  const [visible, setVisible] = useState(false);

  const [totalRenderItem, setTotalRenderItem] = useState(0);
  const [currRenderItem, setCurrRenderItem] = useState(0);
  const [gradeCount, setGradeCount] = useState(0);
  const [moduleCount, setModuleCount] = useState(0);

  const [moduleArr, setModuleArr] = useState([]);
  const [logArr, setLogArr] = useState([]);

  useEffect(() => setGradeCount(anaCourseGrades.data.length), [anaCourseGrades.data.length]);

  const getImageFromHtml = async (pdf, html, width) => {
    const data = await html2canvas(html);
    const img = data.toDataURL('image/png');
    const imgProperties = pdf.getImageProperties(img);
    const imgHeight = (imgProperties.height * width) / imgProperties.width;

    return { img: img, offsetY: imgHeight };
  };

  const generatePDF = async () => {
    setVisible(true);

    asterAxios(dispatch, Q_ADMIN_USER_REPORT_GET, { user_id: currUser.id })
      .then(res => {

        res = JSON.parse(res || '{}');

        let totalCount = anaCourseGrades.data.length + 2;
        if (res.modules?.data?.length) {
          let pointer = 0, arr = [];
          while (pointer < res.modules.data.length) {
            let tmp = pointer;
            arr.push({
              key: pointer,
              data: res.modules.data.slice(tmp, tmp + TABLE_ROWS).map((item, idx) => ({ ...item, index: tmp + idx + 1 }))
            });
            pointer += TABLE_ROWS;
          }
          setModuleArr(arr);
          totalCount += arr.length;
          setModuleCount(arr.length);
        }

        if (res.logs?.data?.length) {
          let pointer = 0, arr = [];
          while (pointer < res.logs.data.length) {
            let tmp = pointer;
            arr.push({
              key: pointer,
              data: res.logs.data.slice(tmp, tmp + TABLE_ROWS).map((item, idx) => ({ ...item, index: tmp + idx + 1 }))
            });
            pointer += TABLE_ROWS;
          }
          setLogArr(arr);
          totalCount += arr.length;
        }

        setTotalRenderItem(totalCount);

        setTimeout(async () => {
          const pdf = new jsPDF({ orientation: "portrait", unit: 'px', format: 'a4', putOnlyUsedFonts: true });
          const width = pdf.internal.pageSize.getWidth() - MX * 2;
          const height = pdf.internal.pageSize.getHeight() - MY * 2;

          let x = MX, y = MY;

          for (let i = 0; i < totalCount; i++) {
            const html = document.querySelector(`#v-report-${i}`);
            if (!html) continue;

            const imgData = await getImageFromHtml(pdf, html, width);
            if (!imgData || !imgData.img) continue;

            if (currRenderItem === totalCount) break;
            setCurrRenderItem(page => page + 1);
            if (y !== MY && (y + imgData.offsetY > height + MY)) {
              y = MY;
              pdf.addPage('a4', 'portrait');
            }

            pdf.addImage(imgData.img, 'PNG', x, y, width, imgData.offsetY);
            y += imgData.offsetY + 5;
          }
          pdf.save('report.pdf');

          setCurrRenderItem(0);
          setVisible(false);
        }, 200);
      }).catch(() => setVisible(false));
  };

  const moduleColumns = [
    {
      name: <VText>No</VText>,
      cell: rw => <VText>{rw.index}</VText>,
      width: '70px',
    },
    {
      name: <VText>{t('Date')}</VText>,
      cell: rw => <VText>{getFormatDate(rw.date, i18n.language)}</VText>,
      minWidth: '130px',
    },
    {
      name: <VText>{t('Course Title')}</VText>,
      cell: rw => <VText>{rw.course_title}</VText>,
      minWidth: '250px',
    },
    {
      name: <VText>{t('Module Title')}</VText>,
      cell: rw => <VText>{rw.details.module_title}</VText>,
      minWidth: '250px',
    },
    {
      name: <VText>{t('Grade')}</VText>,
      cell: rw => <VText>{rw.details.total_count ? Math.round(rw.details.correct_count * 100 / rw.details.total_count) : 0} %</VText>,
      minWidth: '70px',
    },
    {
      name: <VText>{t('Quiz Spent')}</VText>,
      cell: rw => <VText>{Math.round(rw.details.quiz_spent / 60)} min</VText>,
      minWidth: '90px',
    },
    {
      name: <VText>{t('Total Spent')}</VText>,
      cell: rw => <VText>{Math.round(rw.details.total_spent / 60)} min</VText>,
      minWidth: '90px',
    },
  ];

  const logColumns = [
    {
      name: <VText>No</VText>,
      cell: rw => <VText>{rw.index}</VText>,
      width: '70px',
    },
    {
      name: <VText>{t('Date')}</VText>,
      selector: row => row.date,
      cell: rw => <VText>{getFormatDate(rw.date)} - {getShortTime(rw.date)}</VText>,
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

    <div className="ml-auto flex flex-col items-center" style={{minWidth: '150px'}}>
      <VButton variant="contained" color="primary" className="h-min text-sm" onClick={generatePDF} loading={visible}>
        <Icon className="text-xl" icon="humbleicons:download-alt m-2" />&nbsp;{text}
      </VButton>
      {visible && <VText className="mt-1 text-xs" div>{t("Processing...")} {currRenderItem + 1} / {totalRenderItem || 1}</VText>}
    </div>

    {
      visible && <div className="w-full">
        <div className='v-report-table'>

          <div id="v-report-0" className="v-report-item">
            <div className="w-full text-center">
              <VText className="text-5xl" div>{getUserName(currUser)}</VText>&nbsp;
              <VText className="text-lg">({currUser.email})</VText>
            </div>
          </div>

          {
            anaCourseGrades.data.filter(v => courseId ? v.course_id === courseId : true).map((grade, idx) => <div key={grade.course_id} id={`v-report-${idx + 2}`} className="v-report-item">
              <Grid container spacing={2}>
                {idx === 0 && <Grid item xs={12}><VText className="text-2xl" div>{t("Resources")}</VText></Grid>}
                <Grid item xs={12}>
                  <VText className="text-xl">{idx + 1}. {grade.course_title}</VText>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className="border border-solid border-gray-300 rounded-md px-4 py-5 flex items-center">
                    <div className="rounded-full w-14 h-14 flex justify-center items-center flex-shrink-0 bg-blue-200">
                      <Icon className="text-2xl text-red-500" icon="ic:outline-timer" />
                    </div>
                    <div className="ml-5">
                      <VText color="secondary" className="text-sm text-limit-1" div>{t("Total time spent")}</VText>
                      <VText className="text-xl">{formatTimeSpent(grade.total_spent)}</VText>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className="border border-solid border-gray-300 rounded-md px-4 py-5 flex items-center">
                    <div className="rounded-full w-14 h-14 flex justify-center items-center flex-shrink-0 bg-yellow-200">
                      <Icon className="text-2xl text-red-500" icon="majesticons:clock-plus-line" />
                    </div>
                    <div className="ml-5">
                      <VText color="secondary" className="text-sm text-limit-1" div>{t("Time spent on quizzes")}</VText>
                      <VText className="text-xl">{formatTimeSpent(grade.quiz_spent)}</VText>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className="border border-solid border-gray-300 rounded-md px-4 py-5 flex items-center">
                    <div className="rounded-full w-14 h-14 flex justify-center items-center flex-shrink-0 bg-green-200">
                      <Icon className="text-2xl text-red-500" icon="humbleicons:user-add" />
                    </div>
                    <div className="ml-5">
                      <VText color="secondary" className="text-sm text-limit-1" div>{t("Date Assigned")}</VText>
                      <VText className="text-xl">{getFormatDate(grade.enroll_start, i18n.language)}</VText>
                    </div>
                  </div>
                </Grid>
              </Grid>

              <TrackDetailReportResource data={grade} />
            </div>)
          }

          {
            moduleArr.map((item, idx) => <div key={item.key} id={`v-report-${idx + gradeCount + 2}`} className="v-report-item">
              {idx === 0 && <VText className="text-2xl mb-4" div>{t("Progross by module")}</VText>}
              <BTable
                className="w-full v-report-table"
                columns={moduleColumns}
                data={item.data}
              />
            </div>)
          }

          {
            logArr.map((item, idx) => <div key={item.key} id={`v-report-${idx + gradeCount + moduleCount + 2}`} className="v-report-item">
              {idx === 0 && <VText className="text-2xl mb-4" div>{t("Logs history")}</VText>}
              <BTable
                className="w-full v-report-table"
                columns={logColumns}
                data={item.data}
              />
            </div>)
          }

        </div>
      </div>
    }
  </>;
};

export default TrackDetailReport;;