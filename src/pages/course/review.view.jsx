import { Grid } from "@mui/material";
import React, { useMemo } from "react";
import { useTranslation } from 'react-i18next';

import { useAsterController } from "../../context";
import { VAvatar, VButton, VText } from "../../form";
import { getFormatDate } from "../../utils/string";

const ReviewView = (props) => {

  const { t, i18n } = useTranslation('common');

  const { reviewIdx, setModalOpen } = props;

  const [controller] = useAsterController();
  const { reviews } = controller;

  const currReview = useMemo(() => reviewIdx < reviews.data.length ? reviews.data[reviewIdx] : {}, [reviews, reviewIdx]);

  return <>
    <div className="p-4 md:p-8 min-w-xs">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className="flex items-center">
            <VAvatar src={currReview.avatar} className="w-16 h-16" />
            <VText className="ml-4 text-lg">{currReview.author_fullname}</VText>
          </div>
        </Grid>
        <Grid item xs={8}>
          <VText div>{currReview.content}</VText>
          <div className="flex mt-4">
            <VText color="secondary" className="ml-auto text-sm italic">{getFormatDate(currReview.created, i18n.language)}</VText>
          </div>
        </Grid>
        <Grid item xs={4}>
          <VText color="primary" className="font-bold mb-2" div>{t('Course')}</VText>
          <VText color="secondary" className="ml-2" div>{currReview.course_title}</VText>

          <VText color="primary" className="font-bold mb-2 mt-4" div>{t('Section')}</VText>
          <VText color="secondary" className="ml-2" div>{currReview.section_title}</VText>
          
          <VText color="primary" className="font-bold mb-2 mt-4" div>{t('Sequence')}</VText>
          <VText color="secondary" className="ml-2" div>{currReview.sequence_title}</VText>

          <VText color="primary" className="font-bold mb-2 mt-4" div>{t('Vertical')}</VText>
          <VText color="secondary" className="ml-2" div>{currReview.vertical_title}</VText>
        </Grid>
        <Grid item xs={12} className="flex justify-center">
          <VButton variant="outlined" onClick={() => setModalOpen(false)}>{t('Close')}</VButton>
        </Grid>
      </Grid>
    </div>
  </>;
};

export default ReviewView;