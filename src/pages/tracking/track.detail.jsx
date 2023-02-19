import React, { useEffect, useMemo } from "react";

import { useParams } from 'react-router-dom';

import { VAvatar, VText } from "../../form";
import TrackDetailTime from "./track.detail.time";
import TrackDetailResource from "./track.detail.resource";
import TrackDetailLog from "./track.detail.log";
import { numberInputs } from "../../utils/tool";
import { useAsterController } from "../../context";
import PaginationFetcher from "../PaginationFetcher";
import { actionAdminUserInspectGet, actionUserList } from "../../context/action";
import { getUserName } from "../../utils/string";
import TrackDetailModule from "./track.detail.module";
import TrackDetailReport from "./track.detail.report";
import { useTranslation } from "react-i18next";

const TrackDetail = () => {

  const { page, pageSize, userId } = numberInputs(useParams());
  const { t } = useTranslation('common');

  const [controller, dispatch] = useAsterController();
  const { users } = controller;

  const currUser = useMemo(() => users.page === page && users.page_size === pageSize ? users.data.find(v => v.id === userId) || {} : {}, [page, pageSize, users, userId]);

  useEffect(() => actionAdminUserInspectGet(dispatch, userId), [userId, dispatch]);

  return <>

    <PaginationFetcher page={page} pageSize={pageSize} list={users} action={actionUserList} />

    <div className="p-4 md:p-8">
      {
        currUser.cover ?
          <div className="w-full h-64 rounded-lg bg-center bg-cover bg-gray-100 dark:bg-gray-700" style={{ backgroundImage: `url(${currUser.cover})` }} />
          :
          <div className="w-full h-64 rounded-lg bg-center bg-cover bg-gray-100 dark:bg-gray-700" style={{ backgroundImage: `url(${process.env.REACT_APP_S3_ASSET_ENDPOINT + '/v2-assets/default-cover-' + (currUser.username?.charCodeAt(0) % 3 + 1) + '.png'})` }} />
      }

      <div className="relative flex w-full items-end -mt-24 pl-4 mb-10 flex-wrap justify-center md:justify-start">
        <VAvatar src={currUser.avatar} className="w-40 h-40" />
        <VText className="text-4xl">{getUserName(currUser)}</VText>

        <TrackDetailReport currUser={currUser} text={t("Download report")} />
      </div>

      <TrackDetailTime />

      <TrackDetailModule />

      <TrackDetailResource />

      <TrackDetailLog />

    </div>

  </>;
};

export default TrackDetail;