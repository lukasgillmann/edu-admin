import { Grid } from "@mui/material";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { VText } from "../../form";
import { numberInputs } from "../../utils/tool";
import { useAsterController } from "../../context";
import { getFormatDate } from "../../utils/string";

const GroupDetailDetail = () => {

  const { t, i18n } = useTranslation('common');

  const { page, pageSize, groupId } = numberInputs(useParams());

  const [controller] = useAsterController();
  const { groups } = controller;
  const currGroup = useMemo(() => groups.page === page && groups.page_size === pageSize ? groups.data.find(v => v.id === groupId) || { users: [], courses: [] } : {}, [page, pageSize, groups, groupId]);

  return <div className="p-4 md:p-8">
    <Grid container spacing={2}>
      <Grid item md={8}>
        <VText className="text-2xl" div>{t('Description')}</VText>
        <VText className="mt-4" div>
          {currGroup.description}
        </VText>
      </Grid>
      <Grid item md={4}>
        <div className="border border-solid border-gray-300 rounded p-6">
          <VText className="text-2xl">{t('Details')}</VText>
          <VText color="secondary" div className="flex items-center mt-4">
            <Icon icon="bx:calendar" />&nbsp;
            {t('Created')}: {getFormatDate(currGroup.created, i18n.language)}
          </VText>
          {/* <VText color="secondary" div className="flex items-center">
            <Icon icon="bx:user" />&nbsp;
            Created by&nbsp;
            <VAvatar src="https://reqres.in/img/faces/3-image.jpg" className="w-6 h-6" />&nbsp;
            Theresha
          </VText> */}
          <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5 w-max flex items-center mt-4" div>
            <Icon icon="bx:user-circle" />&nbsp;{t('Public')}
          </VText>
        </div>
      </Grid>
    </Grid>
  </div>;
};

export default GroupDetailDetail;