import { Grid } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useTranslation } from 'react-i18next';

import BProgressBar from "../../components/BProgressBar";
import { useAsterController } from "../../context";
import { VText } from "../../form";
import { useRef } from "react";

const COLORS = ['#C35962', '#7E2410', '#EC4A0A', '#FEB173', '#FD853A'];

const TrackDetailReportResource = (props) => {

  const { t } = useTranslation('common');

  const { data } = props;

  const ref = useRef(null);

  const [controller] = useAsterController();
  const { miniSidenav } = controller;

  const [sections, setSections] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [coord, setCoord] = useState({ width: 0, height: 0 });
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(false);
    setTimeout(() => setShow(true), 300);
  }, [miniSidenav]);


  const chartRef = useCallback((node) => {
    if (node) {
      setCoord({
        width: node.chart?.plotWidth + node.chart?.plotLeft,
        height: node.chart?.plotHeight + node.chart?.plotTop * 2,
      });
    }
  }, []);

  useEffect(() => {
    if (data) {
      setSections(data.sections || []);

      setChartData([...data.sections?.map((sec, idx) => ({
        name: sec.sectionTitle,
        y: Math.round(sec.raw_earned * sec.weight * 100 / sec.raw_possible),
        color: COLORS[idx % 5]
      })), {
        name: t("Remains"),
        y: Math.round((100 - (data.grade * 100)) * 100) / 100,
        color: COLORS[0]
      }]);
    }
  }, [data, t]);

  const chartOption = useMemo(() => ({
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
        innerSize: "80%",
        dataLabels: { enabled: false },
        borderWidth: 0
      }
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: "pie",
        name: "Percent",
        data: chartData
      }
    ],
    credits: {
      enabled: false
    },
    accessibility: {
      enabled: false
    }
  }), [chartData]);

  return <div className="mb-8">

    <Grid container spacing={3} className="mt-2" ref={ref}>
      <Grid item xs={12} sm={5}>
        <div className="border border-solid border-gray-300 h-full rounded-md px-6 pt-6">
          <VText className="text-xl">{t("Total Content")}</VText>
          <div className="flex justify-center max-h-72 overflow-y-auto h-full">
            <div className="w-full h-full">
              {
                chartOption &&
                <div className="relative h-full">
                  <div className="w-full absolute left-0 top-0 flex flex-col justify-center items-center" style={{ width: coord.width, height: coord.height }}>
                    <VText className="text-4xl">{(data?.grade * 100)?.toFixed(2) || 0}%</VText>
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
          </div>
        </div>
      </Grid>

      <Grid item xs={12} sm={7}>
        {
          sections.map((section, idx) =>
            <div className="flex mt-4 mb-4" key={section.sectionTitle}>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded mr-2" style={{ backgroundColor: COLORS[idx % 5] }} />
                <VText>{section.raw_earned}/{section.raw_possible} {section.sectionTitle}</VText>
              </div>
              <BProgressBar
                className="w-32 text-xs ml-auto"
                label={section.weight ? section.sectionTitle : '-'}
                value={Math.round(section.raw_earned * 100 / section.raw_possible) || 0}
                success={section.raw_earned / section.raw_possible > data.cutoff}
              />
            </div>
          )
        }
      </Grid>
    </Grid>
  </div>;
};

export default TrackDetailReportResource;