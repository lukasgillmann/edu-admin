import { Grid } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Carousel from 'react-multi-carousel';
import { Icon } from "@iconify/react";
import { useTranslation } from 'react-i18next';
// import ReactToPdf from "react-to-pdf";

import BProgressBar from "../../components/BProgressBar";
import { useAsterController } from "../../context";
import { VText } from "../../form";
import { useRef } from "react";
import BBadge from "../../components/BBadge";

const COLORS = ['#C35962', '#7E2410', '#EC4A0A', '#FEB173', '#FD853A'];
const responsive = {
  desktop: {
    breakpoint: { max: 2048, min: 1024 },
    items: 3,
    slidesToSlide: 2 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const TrackDetailResourceExpand = (props) => {

  const { t } = useTranslation('common');

  const { data } = props;

  const ref = useRef(null);

  const [controller] = useAsterController();
  const { miniSidenav } = controller;

  const [sections, setSections] = useState([]);
  const [modules, setModules] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [coord, setCoord] = useState({ width: 0, height: 0 });
  const [show, setShow] = useState(true);
  const [contentWidth, setContentWidth] = useState(500);

  useEffect(() => {
    setShow(false);
    setTimeout(() => setShow(true), 300);

    const sidenavWidth = miniSidenav ? 156 : 272;
    const totalWidth = document.body.offsetWidth;
    setContentWidth(totalWidth - sidenavWidth - 150);
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
      setModules(data.sections ? data.sections.filter(v => v.weight && v.gradeFormat !== 'Évaluation Finale') : []);

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

  return <div className="mb-8 px-4">

    {/* <ReactToPdf targetRef={ref} filename="certificate-ex.pdf" options={{ orientation: 'portrait', unit: 'px' }}>
      {({ toPdf }) =>
        <div className="w-full flex justify-end mt-2">
          <VButton onClick={() => toPdf()} color="primary" variant="contained" className="ml-auto">
            <Icon icon="eva:download-fill" />&nbsp;{t("Download")}
          </VButton>
        </div>
      }
    </ReactToPdf> */}

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
            <div className="flex mt-4 mb-10" key={section.sectionTitle}>
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

      <Grid item xs={12}>
        <div className="flex justify-center mt-8">
          <div className="w-full v-carousel" style={{ maxWidth: contentWidth }}>
            {
              show && <Carousel
                swipeable={true}
                draggable={true}
                showDots={true}
                arrows={false}
                responsive={responsive}
                ssr={true}
                infinite={false}
                autoPlay={false}
                autoPlaySpeed={1000}
                renderButtonGroupOutside={true}
                keyBoardControl={true}
                customTransition="all .5s"
                transitionDuration={500}
                containerClass="w-full"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                renderDotsOutside
              >
                {
                  modules.map((v, idx) => <div key={v} className=" flex justify-center relative">
                    <div className={`w-full h-0.5 bg-red-500 z-0 ${idx === 0 ? 'invisible' : 'visible'}`} style={{ marginTop: '65px' }} />
                    <div className="flex-full relative">
                      <div className={v.raw_earned / v.raw_possible > data.cutoff ? '' : 'v-filter-gray'}>
                        <BBadge index={idx + 1} className="w-32" />
                      </div>
                    </div>
                    <div className={`w-full h-0.5 bg-red-500 ${idx === modules.length - 1 ? 'invisible' : 'visible'}`} style={{ marginTop: '65px' }} />
                    <div className={`w-9 h-9 absolute ${idx === modules.length - 1 ? 'invisible' : 'visible'}`} style={{ right: '-18px', top: '47px' }}>
                      <div className="w-9 h-9 flex justify-center items-center border-2 border-solid border-red-500 dark:border-white rounded-full relative bg-white dark:bg-gray-800">
                        {
                          v.raw_earned / v.raw_possible > data.cutoff ?
                            <>
                              <Icon className="text-gray-500 dark:text-white text-2xl" icon="bi:check-lg" />
                              <VText className="absolute" style={{ top: '40px' }}>{t('Done')}</VText>
                            </>
                            :
                            <>
                              <Icon className="text-gray-500 dark:text-white text-2xl" icon="ic:outline-timer" />
                              <VText className="absolute" style={{ top: '40px' }}>{t('Progress')}</VText>
                            </>
                        }
                      </div>
                    </div>
                  </div>)
                }
              </Carousel>
            }
          </div>
        </div>
      </Grid>

    </Grid>
  </div>;
};

export default TrackDetailResourceExpand;