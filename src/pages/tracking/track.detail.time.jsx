import { Icon } from "@iconify/react";
import { Grid } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from 'react-i18next';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highcharts3d from "highcharts/highcharts-3d";
import { useParams } from 'react-router-dom';

import { useAsterController } from "../../context";
import { VSelect, VText } from "../../form";
import { formatTimeSpent, FREQ_OPTIONS, getShortDate } from "../../utils/string";
import { actionUserChartList } from "../../context/action";
import { numberInputs } from "../../utils/tool";
import Skeleton from "react-loading-skeleton";
highcharts3d(Highcharts);

const COLORS = [
  { color: '#AE96F6', bgColor: '#EFEAFE', darkBgColor: '#2D333C' },
  { color: '#F0BC04', bgColor: '#FEF3C8', darkBgColor: '#303432' },
  { color: '#00C4AC', bgColor: '#D1FFFE', darkBgColor: '#3D3D38' },
  { color: '#E25640', bgColor: '#FFF8F7', darkBgColor: '#282F34' },
];

const TrackDetailTime = () => {

  const { t } = useTranslation('common');

  const { userId } = numberInputs(useParams());

  const [controller, dispatch] = useAsterController();
  const { darkMode, miniSidenav, mobile, userChart, loadedAdminUserInspectGet } = controller;
  const loading = !loadedAdminUserInspectGet;

  const [option, setOption] = useState('weekly');
  const [show, setShow] = useState(true);

  const onOptionChange = (opt) => {
    setOption(opt);

    const opset = opt === 'weekly' ? 7 : opt === 'monthly' ? 30 : 365;

    const currTime = new Date().getTime();
    const day = 1000 * 60 * 60 * 24;
    actionUserChartList(dispatch, { user_id: userId, start: (currTime - opset * day).toString(), end: currTime.toString() });
  };

  useEffect(() => {
    if (!mobile) {
      setShow(false);
      setTimeout(() => setShow(true), 300);
    }
  }, [miniSidenav, mobile]);

  const chartOption = useMemo(() => {

    const categories = userChart.data.map(v => getShortDate(Number(v[0])));
    const chartData1 = userChart.data.map(v => Math.round(Number(v[1]) / 60));
    const chartData2 = userChart.data.map(v => Math.round(Number(v[2]) / 60));
    const chartData3 = userChart.data.map(v => Math.round(Number(v[4]) / 60));
    const chartData4 = userChart.data.map(v => Math.round(Number(v[3]) / 60));

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
          text: "min",
          enabled: true
        }
      },
      legend: {
        enabled: true,
        itemDistance: 30,
        symbolRadius: 4,
        symbolHeight: 20,
        symbolWidth: 20,
        itemMarginTop: 10,
        itemStyle: { fontSize: 18, fontWeight: 'normal', color: '#B3B6B6' },
        itemHoverStyle: { color: darkMode ? '#FFFFFF' : '#000000' }
      },
      series: [
        {
          type: "areaspline",
          name: t("Total time spent"),
          data: chartData1,
          fillColor: darkMode ?
            {
              linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
              stops: [
                [0, COLORS[0].darkBgColor], // start
                [1, COLORS[0].darkBgColor] // end
              ]
            } : {
              linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
              stops: [
                [0, COLORS[0].bgColor], // start
                [1, COLORS[0].bgColor] // end
              ]
            },
          color: COLORS[0].color,
          opacity: 0.8,
          marker: {
            enabled: false
          }
        }, {
          type: "areaspline",
          name: t("Time spent on quizzes"),
          data: chartData2,
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
                [0, COLORS[1].bgColor], // start
                [1, '#FFFCD1'] // end
              ]
            },
          color: COLORS[1].color,
          opacity: 0.8,
          marker: {
            enabled: false
          }
        }, {
          type: "areaspline",
          name: t("Time spent on virtual class"),
          data: chartData3,
          fillColor: darkMode ?
            {
              linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
              stops: [
                [0, COLORS[2].darkBgColor], // start
                [1, COLORS[2].darkBgColor] // end
              ]
            } : {
              linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
              stops: [
                [0, COLORS[2].bgColor], // start
                [1, COLORS[2].bgColor] // end
              ]
            },
          color: COLORS[2].color,
          opacity: 0.8,
          marker: {
            enabled: false
          }
        }, {
          type: "areaspline",
          name: t("Time spent on replay"),
          data: chartData4,
          fillColor: darkMode ?
            {
              linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
              stops: [
                [0, COLORS[3].darkBgColor], // start
                [1, COLORS[3].darkBgColor] // end
              ]
            } : {
              linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
              stops: [
                [0, COLORS[3].bgColor], // start
                [1, COLORS[3].bgColor] // end
              ]
            },
          color: COLORS[3].color,
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
  }, [darkMode, userChart, t]);

  return <>
    <div id="v-report-1">
      <Grid container spacing={3} className="pb-8">
        <Grid item sm={12} md={4} className="flex">
          <VText className="text-2xl">{t("Overall tracking statistics")}</VText>
        </Grid>
        <Grid item sm={12} md={8} className="flex justify-center md:justify-end flex-wrap items-center" data-html2canvas-ignore="true">
          <VSelect
            className="w-32 ml-2"
            inputClassName="py-2"
            option={option}
            setOption={opt => onOptionChange(opt)}
            items={FREQ_OPTIONS}
            label={t("Occurrency")}
            size="small"
          />
        </Grid>
        <Grid item xs={12} className="p-0" />

        <Grid item xs={12} sm={6} lg={3}>
          <div className="border border-solid border-gray-300 rounded-md px-4 py-5 flex items-center">
            <div className="rounded-full w-14 h-14 flex justify-center items-center" style={{ backgroundColor: COLORS[0].bgColor, minWidth: '56px' }}>
              <Icon className="text-2xl" icon="ic:outline-timer" style={{ color: COLORS[0].color }} />
            </div>
            <div className="ml-5">
              <VText color="secondary" className="text-sm text-limit-1" div>{t("Total time spent")}</VText>
              {loading ? <Skeleton className="h-6 w-20" /> : <VText className="text-xl">{formatTimeSpent(userChart.total_module_spent)}</VText>}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <div className="border border-solid border-gray-300 rounded-md px-4 py-5 flex items-center">
            <div className="rounded-full w-14 h-14 flex justify-center items-center" style={{ backgroundColor: COLORS[1].bgColor, minWidth: '56px' }}>
              <Icon className="text-2xl" icon="majesticons:clock-plus-line" style={{ color: COLORS[1].color }} />
            </div>
            <div className="ml-5">
              <VText color="secondary" className="text-sm text-limit-1" div>{t("Time spent on quizzes")}</VText>
              {loading ? <Skeleton className="h-6 w-20" /> : <VText className="text-xl">{formatTimeSpent(userChart.total_quiz_spent)}</VText>}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <div className="border border-solid border-gray-300 rounded-md px-4 py-5 flex items-center">
            <div className="rounded-full w-14 h-14 flex justify-center items-center" style={{ backgroundColor: COLORS[2].bgColor, minWidth: '56px' }}>
              <Icon className="text-2xl" icon="ic:baseline-timelapse" style={{ color: COLORS[2].color }} />
            </div>
            <div className="ml-5">
              <VText color="secondary" className="text-sm text-limit-1" div>{t("Time spent on virtual class")}</VText>
              {loading ? <Skeleton className="h-6 w-20" /> : <VText className="text-xl">{formatTimeSpent(userChart.total_virtual_spent)}</VText>}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <div className="border border-solid border-gray-300 rounded-md px-4 py-5 flex items-center">
            <div className="rounded-full w-14 h-14 flex justify-center items-center" style={{ backgroundColor: COLORS[3].bgColor, minWidth: '56px' }}>
              <Icon className="text-2xl" icon="ic:baseline-av-timer" style={{ color: COLORS[3].color }} />
            </div>
            <div className="ml-5">
              <VText color="secondary" className="text-sm text-limit-1" div>{t("Time spent on replay")}</VText>
              {loading ? <Skeleton className="h-6 w-20" /> : <VText className="text-xl">{formatTimeSpent(userChart.total_replay_spent)}</VText>}
            </div>
          </div>
        </Grid>

        <Grid item xs={12}>
          {
            show && <HighchartsReact
              highcharts={Highcharts}
              options={chartOption}
            />
          }
        </Grid>

      </Grid>
    </div>
  </>;
};

export default TrackDetailTime;

