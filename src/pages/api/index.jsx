import { Icon } from "@iconify/react";
import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

import { VButton, VImage } from "../../form";
import VText from "../../form/VText";

const ApiDevelopment = () => {

  const { t } = useTranslation('common');

  const [text, setText] = useState('');

  return <div className="p-8 flex flex-col h-full">
    <div className="flex-1">
      <Grid container spacing={2} alignItems="center" className="h-full">
        <Grid item xs={12} sm={8}>
          <VText className="color-primary text-xl md:text-3xl" color="custom" div>11 days : 16 hrs : 23 mins</VText>
          <VText className="text-4xl md:text-7xl mt-10" div>{t("All Good Things Come to Those who Wait...")}</VText>
          <VText className="mt-6 md:mt-24 text-xl" div>{t('Get notified when we launch API Development')}</VText>
          <div className="flex mt-4">
            <TextField
              placeholder="Email"
              value={text}
              onChange={e => setText(e.target.value)}
              InputProps={{ className: "rounded-l-xl rounded-r-none" }}
            />
            <VButton variant="contained" disableElevation className="rounded-l-none rounded-r-xl">{t("Subscribe")}</VButton>
          </div>
        </Grid>
        <Grid item xs={12} sm={4} className="flex justify-center">
          <VImage src={`${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-assets/api-dev.svg`} className="w-4/5 " />
        </Grid>
      </Grid>
    </div>
    <div className="flex flex-col items-center">
      <div>
        <VButton iconOnly size="small" color="body" className="h-8">
          <Icon icon="akar-icons:facebook-fill" className="text-base" />
        </VButton>
        <VButton iconOnly size="small" color="body" className="h-8">
          <Icon icon="akar-icons:instagram-fill" className="text-base" />
        </VButton>
        <VButton iconOnly size="small" color="body" className="h-8">
          <Icon icon="akar-icons:dribbble-fill" className="text-base" />
        </VButton>
        <VButton iconOnly size="small" color="body" className="h-8">
          <Icon icon="akar-icons:linkedin-box-fill" className="text-base" />
        </VButton>
        <VButton iconOnly size="small" color="body" className="h-8">
          <Icon icon="fa-brands:behance-square" className="text-base" />
        </VButton>
      </div>
      <VText color="secondary" className="my-8" div>© {t('Copyrights')} Univo | {t("All Rights Reserved")}</VText>
    </div>
  </div>;
};

export default ApiDevelopment;