import { Grid } from "@mui/material";
import React, { useMemo } from "react";
import { useTranslation } from 'react-i18next';

import { useAsterController } from "../../context";
import { VAvatar, VButton, VText } from "../../form";
import { getShortDate, getShortTime } from "../../utils/string";

const VirtualPastView = (props) => {

  const { t } = useTranslation('common');

  const { sessionIdx, setModalOpen } = props;

  const [controller] = useAsterController();
  const { zoomHistory } = controller;

  const currHist = useMemo(() => sessionIdx < zoomHistory.data.length ? zoomHistory.data[sessionIdx] : {}, [zoomHistory, sessionIdx]);

  return <>
    <div className="p-4 md:p-8 min-w-xs">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className="text-center">
            <VText color="primary" className="font-bold mb-2 text-2xl">{currHist.topic}</VText>
          </div>
        </Grid>
        <Grid item xs={6}>
          <VText color="primary" className="font-bold mb-2" div>{t('Description')}</VText>
          <VText color="secondary" div>{currHist.description}</VText>
        </Grid>
        <Grid item xs={6}>
          <VText color="primary" className="font-bold mb-2" div>{t('Tutor')}</VText>
          <div className="flex flex-col items-center">
            <VAvatar src={currHist.avatar} className="w-32 h-32" />
            <VText color="secondary" className="mt-2" div>{currHist.first_name} {currHist.last_name}</VText>
            <VText color="secondary" div>{currHist.bio}</VText>
          </div>
        </Grid>
        <Grid item xs={4}>
          <VText color="primary" className="font-bold mb-2" div>{t('Start Time')}</VText>
          <VText color="secondary" div>{getShortDate(currHist.start_time)} {getShortTime(currHist.start_time)}</VText>
        </Grid>
        <Grid item xs={4}>
          <VText color="primary" className="font-bold mb-2" div>{t('Duration')}</VText>
          <VText color="secondary" div>{currHist.duration} {t('min')}</VText>
        </Grid>
        <Grid item xs={4}>
          <VText color="primary" className="font-bold mb-2" div>{t('Recurrency Type')}</VText>
          <VText color="secondary" div>{currHist.recur_type}</VText>
        </Grid>
        <Grid item xs={4}>
          <VText color="primary" className="font-bold mb-2" div>{t('Recurrency Day')}</VText>
          <VText color="secondary" div>{currHist.recur_day}</VText>
        </Grid>
        <Grid item xs={4}>
          <VText color="primary" className="font-bold mb-2" div>{t('Repeat Times')}</VText>
          <VText color="secondary" div>{currHist.end_times}</VText>
        </Grid>
        <Grid item xs={4}>
          <VText color="primary" className="font-bold mb-2" div>{t('Created')}</VText>
          <VText color="secondary" div>{getShortDate(currHist.created)}</VText>
        </Grid>
        <Grid item xs={12} className="flex justify-center">
          <VButton variant="contained" onClick={() => setModalOpen(false)}>{t('Close')}</VButton>
        </Grid>
      </Grid>
    </div>
  </>;
};

export default VirtualPastView;