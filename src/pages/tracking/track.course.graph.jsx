import React, { useMemo, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highcharts3d from "highcharts/highcharts-3d";

import { formatTimeSpent, FREQ_OPTIONS, getShortDate } from "../../utils/string";
import { useAsterController } from "../../context";
import { BAnaCard } from "../../components";
import { VSelect } from "../../form";
import { actionTrackChartList } from "../../context/action";
highcharts3d(Highcharts);

const TrackCourseGraph = () => {

  const { t } = useTranslation('common');

  const [controller, dispatch] = useAsterController();
  const { darkMode, miniSidenav, mobile, dashboardInfo, trackChartList } = controller;

  const [show, setShow] = useState(true);
  const [option, setOption] = useState('weekly');

  const onOptionChange = (opt) => {
    setOption(opt);

    const opset = opt === 'weekly' ? 7 : opt === 'monthly' ? 30 : 365;

    const currTime = new Date().getTime();
    const day = 1000 * 60 * 60 * 24;
    actionTrackChartList(dispatch, {start: (currTime - opset * day).toString(), end: currTime.toString() });
  };

  useEffect(() => {
    if (!mobile) {
      setShow(false);
      setTimeout(() => setShow(true), 300);
    }
  }, [miniSidenav, mobile]);

  const chartOption = useMemo(() => {

    const categories = trackChartList.data.map(v => getShortDate(Number(v[0])));
    const chartData1 = trackChartList.data.map(v => Number(v[1]));
    const chartData2 = trackChartList.data.map(v => Math.round(Number(v[2] * 100) / 3600) / 100);

    return {
      chart: {
        backgroundColor: "rgba(0, 0, 0, 0)",
        height: 400,
      },
      title: {
        text: "",
      },
      tooltip: {
        crosshairs: {
          color: 'green',
          dashStyle: 'dash',
          zIndex: 5,
          width: 1,
        },
        shared: true
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
        max: chartData1.length - 1.5
      },
      yAxis: {
        gridLineDashStyle: 'dash',
        labels: {
          enabled: true
        },
        title: {
          text: "# / hr",
          enabled: true
        }
      },
      series: [
        {
          type: "areaspline",
          name: t("Learner Active"),
          data: chartData1,
          fillColor: darkMode ? '#293237' : '#F8FCFC',
          color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, '#4EBCB6'], // start
              [1, '#3EACA6'] // end
            ]
          },
          opacity: 0.8,
          marker: {
            enabled: false
          }
        }, {
          type: "areaspline",
          name: t("Learning Time"),
          data: chartData2,
          fillColor: darkMode ? '#313438' : '#F5FAF2',
          color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, '#01B578'], // start
              [1, '#FFC13F'] // end
            ]
          },
          opacity: 0.8,
          marker: {
            enabled: false
          }
        }
      ],
      credits: {
        enabled: false
      },
      accessibility: {
        enabled: false
      }
    };
  }, [darkMode, t, trackChartList]);

  return <div className="mt-4">
    <div className="px-4 md:px-8">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <BAnaCard label={t("Total User")} value={`${dashboardInfo.numbers?.total_user || 0} ${t("Learners")}`}>
            <Icon className="text-2xl color-primary" icon="ri:user-star-fill" />
          </BAnaCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <BAnaCard label={t("Avg. Learning Time")} value={formatTimeSpent(dashboardInfo.numbers?.total_spent_avg)}>
            <Icon className="text-2xl color-primary" icon="fluent:timer-12-filled" />
          </BAnaCard>
        </Grid>
        <Grid item xs={12} md={4} className="flex items-center">
          <VSelect
            className="w-32 ml-auto"
            option={option}
            setOption={opt => onOptionChange(opt)}
            items={FREQ_OPTIONS}
            label={t("Occurrency")}
            size="small"
          />
        </Grid>
      </Grid>
    </div>

    <div className="mt-6">
      {
        show && <HighchartsReact
          highcharts={Highcharts}
          options={chartOption}
        />
      }
    </div>
  </div>;
};

export default TrackCourseGraph;