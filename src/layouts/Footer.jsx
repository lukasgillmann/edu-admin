import { Grid } from "@mui/material";
import React from "react";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import { VButton, VImage, VText } from "../form";

const Footer = () => {

  const { t } = useTranslation('common');

  return <div className="p-11 bg-gray-50 dark:bg-transparent border border-solid border-gray-200 dark:border-gray-700 rounded-br-xl rounded-bl-xl">

    <Grid container spacing={2}>
      <Grid item xs={12} sm={4} className="flex items-center justify-center md:justify-start">
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
      </Grid>
      <Grid item xs={12} sm={4} className="flex items-center justify-center">
        <VText color="secondary" className="text-sm leading-3" div><Icon icon="fa6-regular:copyright" /></VText>&nbsp;
        <VText className="text-sm" div>2022 Univo {t("Studio")}</VText>
      </Grid>
      <Grid item xs={12} sm={4} className="flex flex-col items-center md:items-end">
        <div>
          <VText div color="secondary" className="pl-1">{t("Powered by")}</VText>
          <VImage src="https://edu-file-uploads.s3.amazonaws.com/dev/logo/logo.png" className="w-32" />
        </div>
      </Grid>
    </Grid>
  </div>;
};

export default Footer;