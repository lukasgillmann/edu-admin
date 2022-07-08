import React, { useMemo, useState, useEffect } from "react";
import { Box, Grid, Icon } from "@mui/material";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highcharts3d from "highcharts/highcharts-3d";
import VText from "../form/VText";
import VSelect from "../form/VSelect";
import { useAsterController } from "../context";
highcharts3d(Highcharts);

const options = [
  { value: 10, label: 'Apple' },
  { value: 20, label: 'Banana' },
  { value: 30, label: 'Grape' },
];

const chartData1 = [123, 152, 100, 98, 120, 132, 144, 122, 123, 152, 100, 98, 120, 132, 144, 122, 123, 152, 100, 98, 120, 132, 144, 122, 123, 152, 100, 98, 120, 132, 144, 122];
const chartData2 = [52, 62, 42, 45, 23, 55, 15, 16, 20, 36, 31, 45, 36, 30, 16, 18, 52, 62, 42, 45, 23, 55, 15, 16, 20, 36, 31, 45, 36, 30, 16, 18];

const GDashboard = (props) => {

  const { data, ...rest } = props;

  const [controller] = useAsterController();
  const { darkMode, miniSidenav } = controller;

  const [option, setOption] = useState('');
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(false);
    setTimeout(() => setShow(true), 300);
  }, [miniSidenav]);

  const chartOption = useMemo(() => {

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
        },
        shared: true
      },
      // legend: {
      //   enabled: true,
      //   itemDistance: 30
      // },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.5
        }
      },
      xAxis: {
        startOnTick: false,
        endOnTick: false,
        min: 0.5,
        max: chartData1.length - 1.5
      },
      series: [
        {
          type: "area",
          name: "Area Chart",
          data: chartData1,
          fillColor: darkMode ? '#312E81' : '#F5FAF2',
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
        }, {
          type: "column",
          inverted: true,
          name: "Bar Chart",
          data: chartData2,
          color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, '#FFD781'], // start
              [1, '#FFBE40'] // end
            ]
          }
        }
      ],
      credits: {
        enabled: false
      }
    };
  }, [darkMode]);

  return <Box {...rest}>
    <Grid container spacing={3}>
      <Grid item md={8} xs={12} className="flex items-center">
        <VText className="text-2xl">Learner Insight</VText>
        <VText className="flex items-center ml-8 text-lg"><Icon>auto_graph</Icon>&nbsp;Active Learner</VText>
        <VText className="flex items-center ml-8 text-lg"><Icon>bar_chart</Icon>&nbsp;Completion Rate</VText>
      </Grid>
      <Grid item md={2} xs={6}>
        <VSelect
          className="w-full"
          option={option}
          setOption={setOption}
          items={options}
          label="Courses"
          size="small"
        />
      </Grid>
      <Grid item md={2} xs={6}>
        <VSelect
          className="w-full"
          option={option}
          setOption={setOption}
          items={options}
          label="Occurancy"
          size="small"
        />
      </Grid>
      <Grid item md={12}>
        {
          show && <HighchartsReact
            highcharts={Highcharts}
            options={chartOption}
          />
        }
      </Grid>
    </Grid>
  </Box>;
};

export default GDashboard;