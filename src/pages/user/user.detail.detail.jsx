import { Grid } from "@mui/material";
import { useMemo } from "react";
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAsterController } from "../../context";
import { VText } from "../../form";
import { getUserName } from "../../utils/string";
import { numberInputs } from "../../utils/tool";

const UserDetailDetail = () => {

  const { t } = useTranslation('common');

  const { page, pageSize, userId } = numberInputs(useParams());

  const [controller] = useAsterController();
  const { users } = controller;

  const currUser = useMemo(() => users.page === page && users.page_size === pageSize ? users.data.find(v => v.id === userId) || {} : {}, [page, pageSize, users, userId]);

  return <div>
    <div>
      <VText className="text-lg font-bold">{t('Personal Information')}</VText>
      <Grid container spacing={2} className="mt-0">
        <Grid item xs={12} md={4}>
          <VText color="secondary" div>{t('Full Name')}</VText>
          <VText>{getUserName(currUser)}</VText>
        </Grid>
        <Grid item xs={12} md={4}>
          <VText color="secondary" div>{t('SSN Number')}</VText>
          <VText>{currUser.ssn_number || '-'}</VText>
        </Grid>
        <Grid item xs={12} md={4}>
          <VText color="secondary" div>{t('Gender')}</VText>
          <VText>{currUser.gender === 'f' ? t('Female') : t('Male')}</VText>
        </Grid>
      </Grid>
    </div>

    <div className="mt-8">
      <VText className="text-lg font-bold">{t('Contact Information')}</VText>
      <Grid container spacing={2} className="mt-0">
        <Grid item xs={12} md={4}>
          <VText color="secondary" div>{t('Phone Number')}</VText>
          <VText>{currUser.phone_number || '-'}</VText>
        </Grid>
        <Grid item xs={12} md={4}>
          <VText color="secondary" div>{t("Email")}</VText>
          <VText>{currUser.email || '-'}</VText>
        </Grid>
        <Grid item xs={12} md={4}>
          <VText color="secondary" div>{t('Website')}</VText>
          <VText>{currUser.website || '-'}</VText>
        </Grid>
        <Grid item md={12}>
          <VText color="secondary" div>{t("Address")}</VText>
          <VText>{currUser.location || '-'}</VText>
        </Grid>
      </Grid>
    </div>

    <div className="mt-8">
      <VText className="text-lg font-bold">{t('Educational Information')}</VText>
      <Grid container spacing={2} className="mt-0">
        <Grid item xs={12} md={4}>
          <VText color="secondary" div>{t('University')}</VText>
          <VText>{currUser.university || '-'}</VText>
        </Grid>
        <Grid item xs={12} md={4}>
          <VText color="secondary" div>{t('Degree')}</VText>
          <VText>{currUser.degree || '-'}</VText>
        </Grid>
      </Grid>
    </div>

    <div className="mt-8">
      <VText className="text-lg font-bold">{t('Professional Information')}</VText>
      <Grid container spacing={2} className="mt-0">
        <Grid item xs={12} md={4}>
          <VText color="secondary" div>{t('Role')}</VText>
          <VText>{currUser.role}</VText>
        </Grid>
        <Grid item xs={12} md={8}>
          <VText color="secondary" div>{t('Skills')}</VText>
          <div className="flex flex-wrap gap-2 mt-2">
            {
              (currUser.skills || []).map(skill => <VText className="px-2 py-1 bg-gray-200 dark:bg-gray-500 rounded-full" key={skill} div>{t(skill)}</VText>)
            }
          </div>
        </Grid>
      </Grid>
    </div>

  </div>;
};

export default UserDetailDetail;