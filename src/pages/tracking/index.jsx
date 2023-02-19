import React from "react";
import { Grid } from "@mui/material";
import { useTranslation } from 'react-i18next';

import VText from "../../form/VText";
import TrackCourseTable from "./track.course.table";
import TrackCourseGraph from "./track.course.graph";

const TrackCourse = () => {

  const { t } = useTranslation('common');

  return <>
    <div className="px-8 mt-8">
      <Grid container spacing={2}>
        <Grid item sm={12} md={5} className="flex">
          <VText className="text-2xl">{t("Course Result Statistic")}</VText>
        </Grid>
        <Grid item sm={12} md={7} className="flex justify-center md:justify-end flex-wrap items-center">
        </Grid>

      </Grid>
    </div>

    <TrackCourseGraph />

    <div className="mt-6">
      <TrackCourseTable />
    </div>
  </>;
};

export default TrackCourse;