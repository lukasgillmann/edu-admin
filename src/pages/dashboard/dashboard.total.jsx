import React, { useMemo, useState, useEffect, useCallback } from "react";

import { useTranslation } from 'react-i18next';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highcharts3d from "highcharts/highcharts-3d";
import Skeleton from 'react-loading-skeleton';

import { useAsterController } from "../../context";
import { VText } from "../../form";
highcharts3d(Highcharts);

const DashboardTotal = () => {

  const { t } = useTranslation('common');

  const [controller] = useAsterController();
  const { miniSidenav, darkMode, mobile, zoomMeetings, physicalSessions, dashboardInfo, loadedAdminDashboardGet, themes } = controller;

  const [coord, setCoord] = useState({ width: 0, height: 0 });
  const [show, setShow] = useState(true);

  const colorMain1 = useMemo(() => themes.find(v => v.name === 'color_main1')?.value || '#F76060', [themes]);
  const data = useMemo(() => {
    const totalCourse = dashboardInfo.numbers?.total_course || 0;
    const activeCourse = dashboardInfo.numbers?.total_course_active || 0;

    return [
      {
        name: `${totalCourse} ${t('Courses')}`,
        y: totalCourse,
        color: colorMain1 || '#FF6D57',
        className: "rounded",
      }, {
        name: `${activeCourse} ${t('Active Courses')}`,
        y: activeCourse,
        color: '#F0BC04',
        className: "rounded",
      }, {
        name: `${zoomMeetings.total} ${t('E-classes')}`,
        y: zoomMeetings.total,
        color: '#00C4AC',
        className: "rounded",
      }, {
        name: `${physicalSessions.total} ${t('Physical Classes')}`,
        y: physicalSessions.total,
        color: '#E25640',
        className: "rounded",
      }
    ];
  }, [dashboardInfo.numbers, zoomMeetings.total, t, physicalSessions.total, colorMain1]);

  useEffect(() => {
    if (!mobile) {
      setShow(false);
      setTimeout(() => setShow(true), 300);
    }
  }, [miniSidenav, mobile]);

  const chartRef = useCallback((node) => {
    if (node) {
      setCoord({
        width: node.chart?.plotWidth + node.chart?.plotLeft,
        height: node.chart?.plotHeight + node.chart?.plotTop * 2,
      });
    }
  }, []);

  const chartOption = useMemo(() => {

    return {
      chart: {
        type: "pie",
        backgroundColor: "rgba(0, 0, 0, 0)",
        height: 280
      },
      title: {
        text: "",
        floating: true
      },
      plotOptions: {
        pie: {
          showInLegend: true,
          innerSize: "75%",
          dataLabels: { enabled: false },
          borderWidth: 0
        }
      },
      legend: {
        enabled: true,
        itemDistance: 15,
        symbolRadius: 4,
        symbolHeight: 15,
        symbolWidth: 15,
        itemMarginTop: 5,
        itemStyle: { fontSize: 14, fontWeight: 'normal', color: '#B3B6B6' },
        itemHoverStyle: { color: darkMode ? '#FFFFFF' : '#000000' }
      },
      series: [
        {
          type: "pie",
          name: "",
          data: data
        }
      ],
      credits: {
        enabled: false
      },
      accessibility: {
        enabled: false
      }
    };
  }, [darkMode, data]);

  return <div className="border border-solid border-gray-300 h-full rounded-md pt-6">
    <VText className="text-xl px-6">{t('Total Content')}</VText>
    <div className="flex justify-center max-h-72 overflow-y-auto h-full">
      {
        loadedAdminDashboardGet ?
          <div className="w-full h-full">
            {
              chartOption &&
              <div className="relative h-full">
                <div className="w-full absolute left-0 top-0 flex flex-col justify-center items-center" style={{ width: coord.width, height: coord.height }}>
                  <VText className="text-4xl">{dashboardInfo.numbers?.total_course || 0}</VText>
                  <VText color="secondary" className="text-sm">{t('Contents')}</VText>
                </div>
                {
                  show &&
                  <HighchartsReact
                    ref={chartRef}
                    containerProps={{ style: { display: 'flex', justifyContent: 'center' } }}
                    highcharts={Highcharts}
                    options={chartOption}
                  />
                }
              </div>
            }
          </div>
          :
          <Skeleton circle className="w-32 h-32 mt-8" />
      }

    </div>
  </div>;
};

export default DashboardTotal;