import { Tab, Tabs, Divider, Grid } from '@mui/material';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { VButton, VSelect, VText } from '../../form';
import { BPopOver } from '../../components';
import Footer from '../../layouts/Footer';
import PublicGrid from './public.grid';
import PublicTable from './public.table';

const data = [
  { value: 10, label: 'Apple' },
  { value: 20, label: 'Banana' },
  { value: 30, label: 'Grape' },
];

const PublicSite = () => {

  const { t } = useTranslation('common');

  const [option, setOption] = useState('');
  const [tab, setTab] = useState(0);
  const handleSetTabValue = (_, newValue) => setTab(newValue);

  return <div>
    <div className="p-8 flex flex-wrap justify-center md:justify-start">
      <VButton color="primary" variant="contained" className="m-2">{t("Edit Site")}</VButton>
      <VButton color="primary" variant="outlined" className="m-2">{t("Live Preview")}</VButton>
      <div className="flex md:ml-auto m-2">
        <VButton color="secondary" iconOnly>
          <Icon icon="foundation:monitor" />
        </VButton>
        <VButton color="secondary" iconOnly>
          <Icon icon="bx:mobile" />
        </VButton>
      </div>
      <VSelect
        className="w-32 v-select-xs m-2"
        option={option}
        setOption={setOption}
        items={data}
        size="small"
      />
      <BPopOver className="m-2" trigger={
        <VButton variant="outlined" color="secondary" className="normal-case">
          <Icon icon="ep:setting" />&nbsp;{t("Menu")}&nbsp;
          <Icon icon="akar-icons:chevron-down" />
        </VButton>
      }>
        <div className="flex flex-col">
          <VButton variant="text" color="secondary" className="w-full">{t("Edit")}</VButton>
          <VButton variant="text" color="secondary">{t("Delete")}</VButton>
        </div>
      </BPopOver>
    </div>
    <div style={{ backgroundImage: `url(${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-assets/public-site.png)` }} className="w-full aspect-[4/1] bg-center bg-cover flex items-center bg-gray-100 dark:bg-gray-700">
      <VText color="custom" className="text-6xl p-14 text-white w-2/3">{t("Univo Studio Skill Up Program")}</VText>
    </div>
    <div className="p-4 md:p-8">
      <div>
        <Grid container spacing={2}>
          <Grid item sm={12} md={6} className="flex flex-wrap justify-center md:justify-start">
            <VButton color="info" variant="contained" className="rounded-full m-1" disableElevation>
              {t("All Content")}
            </VButton>
            <VButton color="secondary" variant="outlined" className="rounded-full m-1">
              {t("Courses")}
            </VButton>
            <VButton color="secondary" variant="outlined" className="rounded-full m-1">
              {t("Quiz")}
            </VButton>
            <VButton color="secondary" variant="outlined" className="rounded-full m-1">
              {t("Manual")}
            </VButton>
            <VButton color="secondary" variant="outlined" className="rounded-full m-1">
              {t("Learning Path")}
            </VButton>
          </Grid>
          <Grid item sm={12} md={6} className="flex justify-center md:justify-end items-center flex-wrap">
            <VButton variant="text" color="secondary" className="text-sm normal-case">
              <Icon icon="akar-icons:circle-check" />&nbsp;{t('All status')}
            </VButton>
            <VButton variant="text" color="secondary" className="text-sm ml-2 normal-case">
              <Icon icon="ant-design:filter-filled" />&nbsp;{t('Filter')}
            </VButton>
            <VButton variant="text" color="secondary" className="text-sm ml-2 normal-case">
              <Icon icon="bx:sort" />&nbsp;{t('Sort')}
            </VButton>
            <div className="h-8 ml-2 v-tab-switch">
              <Tabs orientation="horizontal" value={tab} onChange={handleSetTabValue}>
                <Tab icon={<Icon className="mr-0" icon="akar-icons:grid" />} />
                <Tab icon={<Icon className="mr-0" icon="ci:list-checklist" />} />
              </Tabs>
            </div>
          </Grid>
        </Grid>

        <Divider className="bg-gray-200 dark:bg-gray-500 mt-6" />

      </div>
    </div>

    {tab === 0 && <PublicGrid />}
    {tab === 1 && <PublicTable />}

    <Footer />
  </div>;

};

export default PublicSite;