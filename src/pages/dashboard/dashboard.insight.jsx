import React, { useMemo, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { Icon } from '@iconify/react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highcharts3d from "highcharts/highcharts-3d";

import { useAsterController } from "../../context";
import { VText, VSelect } from "../../form";
import DashboardSelectCourse from "./dashboard.select.course";
import { FREQ_OPTIONS, getFormatDate } from "../../utils/string";
import { actionDashboardChartList } from "../../context/action";
import { useCallback } from "react";
highcharts3d(Highcharts);

const DashboardInsight = (props) => {

  const { t, i18n } = useTranslation('common');

  const { data, ...rest } = props;

  const [controller, dispatch] = useAsterController();
  const { darkMode, miniSidenav, mobile, dashboardChartList, loadedDashboardChartList } = controller;

  const [option, setOption] = useState('weekly');
  const [show, setShow] = useState(true);
  const [courseId, setCourseId] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [avgProgress, setAvgProgress] = useState(0);

  const onFetchData = useCallback((courseId, start, end) => {
    actionDashboardChartList(dispatch, { course_id: courseId, start, end });
  }, [dispatch]);

  useEffect(() => {
    const currTime = new Date().getTime();
    const day = 1000 * 60 * 60 * 24;
    onFetchData(null, (currTime - 6 * day).toString(), currTime.toString());
  }, [onFetchData]);

  useEffect(() => {
    if (!mobile) {
      setShow(false);
      setTimeout(() => setShow(true), 300);
    }
  }, [miniSidenav, mobile]);

  useEffect(() => {
    if (loadedDashboardChartList) {
      // setUserCount(dashboardChartList.data.length ? Math.max(...dashboardChartList.data.map(v => Number(v[1]))) || 0 : 0);
      const sumProgress = dashboardChartList.data.map(v => Number(v[2])).reduce((a, b) => a + b, 0);
      const activeDayCount = dashboardChartList.data.filter(v => Number(v[1]))?.length || 0;
      setAvgProgress(activeDayCount ? Math.round(sumProgress * 100 / activeDayCount) / 100 : 0);
    }

  }, [dashboardChartList.data, courseId, loadedDashboardChartList]);

  const onOptionChange = (opt) => {
    setOption(opt);

    const opset = opt === 'weekly' ? 6 : opt === 'monthly' ? 30 : 365;
    const currTime = new Date().getTime();
    const day = 1000 * 60 * 60 * 24;
    onFetchData(courseId, (currTime - opset * day).toString(), currTime.toString());
  };

  const onCourseChange = (courseId) => {
    setCourseId(courseId);

    const opset = option === 'weekly' ? 6 : option === 'monthly' ? 30 : 365;
    const currTime = new Date().getTime();
    const day = 1000 * 60 * 60 * 24;
    onFetchData(courseId, (currTime - opset * day).toString(), currTime.toString());
  };

  const chartOption = useMemo(() => {

    const categories = dashboardChartList.data.map(v => getFormatDate(Number(v[0]), i18n.language));
    const chart1 = dashboardChartList.data.map(v => Number(v[1]));
    const factor = Math.max(...chart1);
    const chart2 = dashboardChartList.data.map(v => Number(v[2]) * factor / 100);

    return {
      chart: {
        backgroundColor: "rgba(0, 0, 0, 0)",
        height: 400,
      },
      title: {
        text: "",
      },

      legend: {
        enabled: false,
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.5
        }
      },
      xAxis: {
        categories: categories,
        startOnTick: false,
        endOnTick: false,
        min: 0.5,
        max: chart1.length - 1.5
      },
      yAxis: {
        gridLineDashStyle: 'dash',
        labels: {
          enabled: true
        },
        title: {
          text: t("# / Avg. Progress"),
          enabled: true
        }
      },
      series: [
        {
          type: "areaspline",
          name: courseId,
          data: chart1,
          fillColor: darkMode ?
            {
              linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
              stops: [
                [0, '#38312D'], // start
                [1, '#2B393D'] // end
              ]
            } : {
              linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
              stops: [
                [0, '#FFF4EB'], // start
                [1, '#F2FDFC'] // end
              ]
            },
          color: '#FF7157',
          opacity: 0.8,
          marker: {
            enabled: false
          }
        }, {
          type: "column",
          inverted: true,
          name: "Bar Chart",
          data: chart2,
          color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, '#FFA193'], // start
              [1, '#E94F33'] // end
            ]
          },
          borderRadius: 2,
          borderWidth: 0,
          states: {
            hover: {
              color: {
                linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
                stops: [
                  [0, '#02AAB0'], // start
                  [1, '#00CDAC'] // end
                ]
              }
            }
          }
        }
      ],
      tooltip: {
        enabled: true,
        crosshairs: {
          color: darkMode ? 'white' : '#9CA0A0',
          dashStyle: 'dash',
          zIndex: 5,
          width: 1
        },
        shared: true,
        backgroundColor: darkMode ? '#272B30' : '#FFFFFF',
        borderColor: darkMode ? '#FFFFFF' : '#E8E6E6',
        borderRadius: 12,
        padding: 17,
        style: {
          color: darkMode ? '#FFFFFF' : '#A2A6A6',
          fontSize: 16,
        },
        useHTML: true,
        formatter: function () {
          const container = document.createElement("div");
          ReactDOM.render(
            <div>
              <VText color="secondary" className="flex items-center"><Icon height="25px" icon="ic:baseline-calendar-today" />&nbsp;{this.x}</VText>
              <VText color="secondary" className="flex items-center text-sm" div>
                <Icon height="25px" icon="bx:line-chart" className="color-primary" />&nbsp;
                <VText className="font-bold">{this.points[0].y}</VText>&nbsp;
                {t('Active Learner')}
              </VText>
              <VText color="secondary" className="flex items-center text-sm" div>
                <Icon height="25px" icon="bx:bar-chart-alt-2" className="color-warning" />&nbsp;
                <VText className="font-bold">{Math.round(this.points[1].y * 10000 / factor) / 100}%</VText>&nbsp;
                {t('Completion Rate')}
              </VText>
            </div>,
            container
          );
          return container.innerHTML;
        }
      },
      credits: {
        enabled: false
      },
      accessibility: {
        enabled: false
      }
    };
  }, [darkMode, t, i18n.language, dashboardChartList, courseId]);

  return <div {...rest}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4} md={6} lg={3} className="flex items-center">
        <VText className="text-2xl">{t('Learner Insight')}</VText>
      </Grid>
      <Grid item xs={12} sm={8} md={6} lg={5}>
        <Grid container spacing={1} className="mt-0">
          <Grid item xs={12} sm={6}>
            <div className="flex items-center text-lg pr-4">
              <Icon icon="bx:line-chart" className="color-primary text-2xl" />&nbsp;
              <VText>{dashboardChartList.actives || 0}</VText>&nbsp;
              <VText color="secondary">{t('Active Learner')}</VText>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="flex items-center text-lg" color="primary">
              <Icon icon="bx:bar-chart-alt-2" className="color-warning text-2xl" />&nbsp;
              <VText>{avgProgress}%</VText>&nbsp;
              <VText color="secondary">{t('Completion Rate')}</VText>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={2} >
        <DashboardSelectCourse onCourseChange={onCourseChange} />
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={2}>
        <VSelect
          className="w-full"
          option={option}
          setOption={opt => onOptionChange(opt)}
          items={FREQ_OPTIONS}
          label={t("Occurrency")}
          size="small"
        />
      </Grid>
      <Grid item lg={12} sx={{ width: '100%' }}>
        {
          show && <HighchartsReact
            highcharts={Highcharts}
            options={chartOption}
          />
        }
      </Grid>
    </Grid>
  </div>;
};

export default DashboardInsight;