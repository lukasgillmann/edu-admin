import React, { useMemo, useRef } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highcharts3d from "highcharts/highcharts-3d";
import { Box } from "@mui/material";
import { useCallback } from "react";
import { useState } from "react";
import VText from "../form/VText";
highcharts3d(Highcharts);

const data = [
  { name: "A1", y: 10 },
  { name: "B1", y: 15 },
  { name: "C1", y: 20 },
  { name: "D1", y: 3 },
];

const height = 250;

const SideNavbar = (props) => {

  // const { data } = props;

  const [coord, setCoord] = useState({ width: 0, height: 0 });

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
        height: height
      },
      title: {
        text: "",
        floating: true
      },
      plotOptions: {
        pie: {
          showInLegend: true,
          innerSize: "75%",
          dataLabels: {
            enabled: true,
            distance: -10,
            color: "white",
            style: {
              fontweight: "bold",
              fontsize: 50
            }
          }
        }
      },
      legend: {
        enabled: true,
        itemDistance: 30
      },
      series: [
        {
          type: "pie",
          name: "Percent",
          data: data
        }
      ],
      credits: {
        enabled: false
      }
    };
  }, [height]);



  return chartOption &&
    <Box className="relative">
      <Box className="w-full absolute left-0 top-0 flex flex-col justify-center items-center" sx={{ width: coord.width, height: coord.height }}>
        <VText className="text-4xl">80</VText>
        <VText color="primary" className="text-sm">Contents</VText>
      </Box>
      <HighchartsReact
        ref={chartRef}
        containerProps={{ style: { display: 'flex', justifyContent: 'center' } }}
        highcharts={Highcharts}
        options={chartOption}
      />
    </Box>;
};

export default SideNavbar;