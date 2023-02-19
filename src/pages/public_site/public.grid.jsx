import { Grid } from '@mui/material';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import { VButton, VImage, VText } from '../../form';

const PublicGrid = () => {

  const { t } = useTranslation('common');

  return <div className="p-4 md:p-8">
    <Grid container spacing={3}>
      {
        [...Array(6).keys()].map(v =>
          <Grid key={v} item xs={12} sm={6} lg={4} xl={3}>
            <div className="border border-solid border-gray-300 rounded-md">
              <VImage src={`${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-assets/course1.png`} alt='' className="w-full aspect-[9/5]" />
              <div className="p-4">
                <VText className="text-limit-1">Master Digital Product Design: UX Research</VText>
                <VText color="secondary" className="flex items-center text-sm">
                  <Icon icon="lucide:clock-9" />&nbsp;
                  Last updated 1 day ago
                </VText>
              </div>
              <div className="p-4">
                <VButton variant="contained" color="primary" className="w-full normal-case">
                  {t("Start Course")}
                </VButton>
              </div>
            </div>
          </Grid>
        )
      }
    </Grid>
  </div>;

};

export default PublicGrid;