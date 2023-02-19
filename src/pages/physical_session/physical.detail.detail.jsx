import { Grid } from "@mui/material";
import { useMemo } from "react";
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAsterController } from "../../context";
import { VText } from "../../form";
import { getShortDate, getShortTime } from "../../utils/string";
import { numberInputs } from "../../utils/tool";

const PhysicalDetailDetail = () => {

  const { t } = useTranslation('common');

  const { page, pageSize, sessionId } = numberInputs(useParams());

  const [controller] = useAsterController();
  const { physicalSessions } = controller;

  const currSession = useMemo(() => physicalSessions.page === page && physicalSessions.page_size === pageSize ? physicalSessions.data.find(v => v.id === sessionId) || {} : {}, [page, pageSize, physicalSessions, sessionId]);

  return <div>
    <div>
      <VText className="text-lg font-bold">{t('Session Information')}</VText>
      <Grid container spacing={2} className="mt-0">
        <Grid item xs={12} md={4}>
          <VText color="secondary" div>{t('Coach Name')}</VText>
          <VText>{currSession.coach_name || '-'}</VText>
        </Grid>
        <Grid item xs={12} md={4}>
          <VText color="secondary" div>{t("Program")}</VText>
          <VText>{currSession.program || '-'}</VText>
        </Grid>
        <Grid item xs={12} md={4}>
          <VText color="secondary" div>{t('Location')}</VText>
          <VText>{currSession.location}</VText>
        </Grid>
        <Grid item xs={12} md={4}>
          <VText color="secondary" div>{t('Start')}</VText>
          <VText>{getShortDate(currSession.start)} - {getShortTime(currSession.start)}</VText>
        </Grid>
        <Grid item xs={12} md={4}>
          <VText color="secondary" div>{t('Duration')}</VText>
          <VText>{currSession.duration || '-'}</VText>
        </Grid>
      </Grid>
    </div>
  </div>;
};

export default PhysicalDetailDetail;