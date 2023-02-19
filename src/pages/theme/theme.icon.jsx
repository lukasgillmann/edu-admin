import { Icon } from "@iconify/react";
import { Grid } from "@mui/material";
import React, { useState, useMemo } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useTranslation } from 'react-i18next';

import { VDropZone } from "../../form";
import VText from "../../form/VText";
import BBadge from "../../components/BBadge";

const responsive = {
  desktop: {
    breakpoint: { max: 2048, min: 1024 },
    items: 4,
    slidesToSlide: 2 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const BADGE_KEYS = ['badge1_url', 'badge2_url', 'badge3_url', 'badge4_url', 'badge5_url', 'badge6_url', 'badge7_url', 'badge8_url', 'badge9_url', 'badge10_url'];

const ThemeIcon = (props) => {

  const { t } = useTranslation('common');

  const { fields, setFields } = props;

  const currTime = useMemo(() => new Date().getTime(), []);
  const [logo, setLogo] = useState(`${process.env.REACT_APP_S3_ENDPOINT}/${process.env.REACT_APP_SITE_NAME}/logo/logo.png?${currTime}`);
  const [favicon, setFavicon] = useState(`${process.env.REACT_APP_S3_ENDPOINT}/${process.env.REACT_APP_SITE_NAME}/favicon/logo.png?${currTime}`);

  // const onBadgeType = (e) => {
  //   if (e.target.value === 'preset0') {
  //     setFields({
  //       ...fields,
  //       badge1_url: `${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-badge/module1.svg`,
  //       badge2_url: `${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-badge/module2.svg`,
  //       badge3_url: `${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-badge/module3.svg`,
  //       badge4_url: `${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-badge/module4.svg`,
  //       badge5_url: `${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-badge/module5.svg`,
  //       badge6_url: `${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-badge/module6.svg`,
  //       badge7_url: `${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-badge/module7.svg`,
  //       badge8_url: `${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-badge/module8.svg`,
  //       badge9_url: `${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-badge/module9.svg`,
  //       badge10_url: `${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-badge/module10.svg`,
  //     });
  //   }

  // };

  return <div className="px-4 md:p-12">
    <VText className="text-xl">{t("Logo, Icons & Branding")}</VText>
    <VText color="secondary" div className="text-sm">
      {t("Add a custom logo and/or favicon, and adjust your school thumbnail.")}
    </VText>

    <div className="px-4 md:px-28 pt-8">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <VText div>{t("Your Logo")}</VText>
          <VDropZone
            key={logo}
            url={logo}
            setUrl={url => setLogo(`${url}?${new Date().getTime()}`)}
            filename="logo.png"
            directory="logo"
            accept="image/*"
            isDelete={false}
            className="w-full max-w-xs aspect-[6/5] mt-5 overflow-hidden bg-gray-100 dark:bg-gray-600"
            imgClassName="w-full v-h-fit-content"
          >
            <div className="flex flex-col justify-center items-center p-4">
              <Icon icon="fa6-regular:image" className="text-5xl text-gray-300" />
              <div className="text-center mt-3 text-limit-2">
                <VText>{t("Add logo by drag & drop image or")}</VText>&nbsp;
                <VText className="color-primary" color="custom">{t("browse file")}</VText>
              </div>
            </div>
          </VDropZone>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VText div>{t("Your Favicon")}</VText>
          <VDropZone
            key={favicon}
            url={favicon}
            setUrl={url => setFavicon(`${url}?${new Date().getTime()}`)}
            filename="logo.png"
            directory="favicon"
            accept="image/*"
            isDelete={false}
            className="w-full max-w-xs aspect-[6/5] mt-5 overflow-hidden bg-gray-100 dark:bg-gray-600"
          >
            <div className="flex flex-col justify-center items-center p-4">
              <Icon icon="fa6-regular:image" className="text-5xl text-gray-300" />
              <div className="text-center mt-3 text-limit-2">
                <VText>{t("Add logo by drag & drop image or")}</VText>&nbsp;
                <VText className="color-primary" color="custom">{t("browse file")}</VText>
              </div>
            </div>
          </VDropZone>
        </Grid>
      </Grid>
    </div>

    {/********************************** Indicator *****************************/}
    <VText className="text-xl mt-10" div>{t("Module indicator")}</VText>
    <VText color="secondary" div className="text-sm">
      {t("Add a custom Module indicator, and adjust your Module indicator thumbnail.")}
    </VText>

    <div className="px-28 mt-8">
      <Grid container spacing={2}>

        <Grid item xs={12}>

          <div className="w-full v-carousel">
            <Carousel
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
                [...Array(10).keys()].map((key) =>
                  <div className="mx-2" key={key}>
                    <VText div>Module {key + 1}</VText>
                    <div className="w-full max-w-xs flex items-center justify-center aspect-[6/5] bg-gray-100 dark:bg-gray-600 rounded-md border border-dashed border-gray-300 mt-5 p-2">
                      <BBadge index={key + 1} className="h-full max-w-full" />
                    </div>
                  </div>
                )
              }
            </Carousel>
          </div>
        </Grid>
      </Grid>
    </div >

    {/********************************** Badge *****************************/}
    < VText className="text-xl mt-10" div >{t("Badges")}</VText >
    <VText color="secondary" div className="text-sm">
      {t("Add your own badges by drag and drop or upload")}
    </VText>

    <div className="px-28 mt-8">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="w-full v-carousel">
            <Carousel
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
                BADGE_KEYS.map((key, idx) =>
                  <div className="mx-2" key={key}>
                    <VText div>Module {idx + 1}</VText>
                    <VDropZone
                      key={fields[key]}
                      url={fields[key]}
                      setUrl={url => setFields({ ...fields, [key]: url })}
                      directory="badge"
                      accept="image/*"
                      className="w-full max-w-xs aspect-[6/5] mt-5 overflow-hidden bg-gray-100 dark:bg-gray-600"
                    >
                      <div className="flex flex-col justify-center items-center p-4">
                        <Icon icon="fa6-regular:image" className="text-5xl text-gray-300" />
                        <div className="text-center mt-3 text-limit-2">
                          <VText>{t("Add logo by drag & drop image or")}</VText>&nbsp;
                          <VText className="color-primary" color="custom">{t("browse file")}</VText>
                        </div>
                      </div>
                    </VDropZone>
                  </div>
                )
              }
            </Carousel>
          </div>
        </Grid>
      </Grid>
    </div>

  </div >;
};

export default ThemeIcon;